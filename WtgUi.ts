import { App, reactive, Ref } from 'vue';
import {
    createVuetify,
    DefaultsInstance,
    DisplayInstance,
    LocaleInstance,
    LocaleMessages,
    LocaleOptions,
    ThemeInstance,
} from 'vuetify';
import Theme from './theme';
import standardTheme from './theme/standardTheme';
import { ColorVariant } from './theme/colors';
import { ThemeOptions } from './theme/types';
import Language from './language';
import { LanguageOptions } from './language/types';

export let $wtgUi: WtgUi | undefined;

interface InstallOptions {
    components?: Record<string, any>;
}

export interface ConfigurationOptions {
    dark?: boolean;
    density?: DensityType;
    language?: LanguageOptions;
    theme?: ThemeOptions;
    themeConfiguration?: ThemeOptions;
}

export enum DensityType {
    Default = 'default',
    Spacious = 'spacious',
    Comfortable = 'comfortable',
    Compact = 'compact',
}

export enum DarkModeType {
    Light = 'light',
    Dark = 'dark',
}

export enum CurrentNotificationType {
    Click = 'click',
    MouseOver = 'mouseover',
    MouseOut = 'mouseout',
}

export type CurrentNotification = {
    propertyName?: string;
    type?: CurrentNotificationType;
};

export type Vuetify = {
    install: (app: App) => void;
    defaults: Ref<DefaultsInstance>;
    display: DisplayInstance;
    theme: ThemeInstance & {
        install: (app: App<any>) => void;
    };
    locale: {
        isRtl: Ref<boolean>;
        rtl: Ref<Record<string, boolean>>;
        rtlClasses: Ref<string>;
        name: string;
        messages: Ref<LocaleMessages>;
        current: Ref<string>;
        fallback: Ref<string>;
        t: (key: string, ...params: unknown[]) => string;
        n: (value: number) => string;
        provide: (props: LocaleOptions) => LocaleInstance;
    };
};

class WtgUi {
    private readonly _vuetify: Vuetify;
    private _baseTheme: Theme;
    private _theme: Theme;
    private _currentNotification: CurrentNotification = {};
    readonly language: Language;
    readonly options: ConfigurationOptions;
    density: DensityType;

    constructor(options: ConfigurationOptions = {}) {
        this.options = options;
        this._baseTheme = new Theme(options.theme, standardTheme);
        this._theme = new Theme(options.themeConfiguration, this._baseTheme);
        this._vuetify = createVuetify({
            locale: Language.toVuetifyLocaleOptions(options.language),
            theme: this._theme.toVuetifyOptions(),
        });
        this.dark = !!options.dark;
        this.density = options.density ?? DensityType.Spacious;
        this.language = new Language(this._vuetify, options.language);
        $wtgUi = this;
    }

    get currentNotification(): CurrentNotification {
        return this._currentNotification;
    }

    set currentNotification(value: CurrentNotification) {
        this._currentNotification = value;
    }

    get theme(): Theme {
        return this._theme;
    }

    get baseTheme(): Theme {
        return this._baseTheme;
    }

    get dark(): boolean {
        return this._vuetify.theme.current.value.dark;
    }

    set dark(value) {
        this._vuetify.theme.global.name.value = value ? 'dark' : 'light';
    }

    get breakpoint(): DisplayInstance {
        return this._vuetify.display;
    }

    get colors(): ColorVariant {
        return this.dark ? this.theme.colors.dark : this.theme.colors.light;
    }

    get supplyFramework(): boolean {
        return this._theme.supplyVersion > 0;
    }

    get supplyMandatoryErrorColor(): boolean {
        return this._theme.supplyVersion > 0;
    }

    public resetOptions(): void {
        this.dark = !!this.options.dark;
        this.density = this.options.density ?? DensityType.Spacious;
    }

    public installTheme(options: ThemeOptions, baseTheme?: Theme): void {
        this._theme = new Theme(options, baseTheme ?? standardTheme);
        const colors = this._theme.colors.toVuetifyOptions();
        for (const color in colors.light.colors) {
            this._vuetify.theme.themes.value.light.colors[color] = colors.light.colors[color];
        }
        for (const color in colors.dark.colors) {
            this._vuetify.theme.themes.value.dark.colors[color] = colors.dark.colors[color];
        }
    }

    install(app: App, args: InstallOptions = {}): void {
        app.mixin({
            beforeCreate() {
                const options = this.$options;

                if (options.wtgUi) {
                    options.vuetify = options.wtgUi._vuetify;
                    this.$wtgUi = reactive(options.wtgUi);
                } else {
                    this.$wtgUi = (options.parent && options.parent.$wtgUi) || $wtgUi || ($wtgUi = new WtgUi());
                }
            },
        });
        app.use(this._vuetify);

        (function registerComponents(components: any): void {
            for (const key in components) {
                if (key.startsWith('Wtg')) {
                    const component = components[key];
                    app.component(key, component as typeof app);
                }
            }
        })(args.components || {});
    }
}

declare module 'vue' {
    export interface ComponentCustomOptions {
        wtgUi?: WtgUi;
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $wtgUi: WtgUi;
    }
}

export default WtgUi;
