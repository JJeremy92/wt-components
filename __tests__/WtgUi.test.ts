import { defineComponent, h, VNode, createApp } from 'vue';
import { DateFormatter } from '../language/formatters/types';
import WtgUi, { $wtgUi, ConfigurationOptions, DensityType } from '../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';
import { useWtgUi } from '../composables/global/global';

enableAutoUnmount(afterEach);

const WtgIconComponent = defineComponent({
    render(): VNode {
        return h('i', { class: ['v-icon', 'theme--light'] });
    },
});

const WtgSpanComponent = defineComponent({
    render(): VNode {
        return h('span', { class: 'wtg-typography-h1' }, 'Some Text');
    },
});

const baseThemeOptions = {
    supplyVersion: 0.5,
    colors: {
        light: {
            primary: '#F00001',
            controls: {
                icon: {
                    color: 'rgba(0, 0, 0, 0.9)',
                },
            },
        },
        dark: {
            primary: '#FFFFFE',
        },
    },
};

const themeConfigurationOptions = {
    colors: {
        light: {
            primary: '#000001',
        },
    },
};

describe('WtgUi', () => {
    let wtgUi: WtgUi;
    let options: ConfigurationOptions;

    beforeEach(() => {
        options = {
            language: {
                current: 'en-AU',
                captionProvider: () => 'some caption',
                dateFormatter: { today: () => '2day' } as DateFormatter,
            },
            dark: true,
            density: DensityType.Spacious,
            theme: baseThemeOptions,
            themeConfiguration: themeConfigurationOptions,
        };
        wtgUi = new WtgUi(options);
    });

    test('when initializing, it registers the component list it was given for global use', () => {
        const app = createApp({});
        wtgUi.install(app, { components: { WtgIconComponent, WtgSpanComponent } });
        expect(app._context.components).toStrictEqual({ WtgIconComponent, WtgSpanComponent });
    });

    test('it exports the WtgUi singleton for use by all library consumers', () => {
        expect($wtgUi).toStrictEqual(wtgUi);
    });

    test('it has an options object that contains the original passed in options', () => {
        expect(wtgUi.options).toStrictEqual(options);
    });

    test('it has supply flags to aid with the migration and prototyping of SUPPLY 0.5', () => {
        expect(wtgUi.supplyFramework).toBe(true);
        expect(wtgUi.supplyMandatoryErrorColor).toBe(true);
    });

    test('it has an resetOptions method that restores the options that were passed in on creation', () => {
        expect(wtgUi.dark).toBe(true);
        expect(wtgUi.density).toBe(DensityType.Spacious);
        wtgUi.dark = false;
        wtgUi.density = DensityType.Comfortable;
        wtgUi.resetOptions();
        expect(wtgUi.dark).toBe(true);
        expect(wtgUi.density).toBe(DensityType.Spacious);
    });

    test('it saves the baseTheme for use later when ThemeConfiguration requires a reset', () => {
        expect(wtgUi.baseTheme.options).toEqual(baseThemeOptions);
    });

    test('it merges the themeConfiguration with the theme on startup to be used as the activeTheme for the application', () => {
        expect(wtgUi.theme.options).toEqual(themeConfigurationOptions);
    });

    describe('it initializes Vuetify', () => {
        test('it initializes the Vuetify colors', () => {
            const wrapper = mountComponent();
            expect(wtgUi._vuetify.theme.computedThemes.value.light.colors.primary).toBe('#000001');
            expect(wtgUi._vuetify.theme.computedThemes.value.dark.colors.primary).toBe('#FFFFFE');
        });

        test('it initializes the Vuetify language options', () => {
            const wrapper = mountComponent();
            expect(wtgUi._vuetify.locale.current.value).toBe('en');
            expect(wtgUi._vuetify.locale.messages.value.ko).toBeDefined();
        });
    });

    describe('it adds a $wtgUi access through the global composable', () => {
        test('it adds it to the root instance', () => {
            const wrapper = mountComponent();
            expect(wrapper.vm.$wtgUi).toBe(wtgUi);
        });

        test('it provides access to global information through the $wtgUi variable', () => {
            const wrapper = mountComponent();
            expect(wrapper.vm.$wtgUi!.dark).toBe(true);
            expect(wrapper.vm.$wtgUi!.density).toBe(DensityType.Spacious);
            expect(wrapper.vm.$wtgUi!.theme.colors.light.primary).toBe('#000001');
            expect(wrapper.vm.$wtgUi!.theme.colors.dark.primary).toBe('#FFFFFE');
        });

        test('it allows you to change the global dark state through the $wtgUi variable', () => {
            const wrapper = mountComponent();
            expect(wrapper.vm.$wtgUi!.dark).toBe(true);
            expect(wtgUi._vuetify.theme.current.value.dark).toBe(true);

            wrapper.vm.$wtgUi!.dark = false;
            expect(wrapper.vm.$wtgUi!.dark).toBe(false);
            expect(wtgUi._vuetify.theme.current.value.dark).toBe(false);
        });

        test('it allows you to change the global density state through the $wtgUi variable', () => {
            const wrapper = mountComponent();
            expect(wrapper.vm.$wtgUi!.density).toBe(DensityType.Spacious);

            wrapper.vm.$wtgUi!.density = DensityType.Default;
            expect(wrapper.vm.$wtgUi!.density).toBe(DensityType.Default);
        });

        test("it provides access to Vuetify's breakpoint service through the $wtgUi variable, to ensure consumers don't have to reference Vuetify directly and we could potentially replace it with our own implementation", () => {
            const wrapper = mountComponent();
            expect(wrapper.vm.$wtgUi!.breakpoint).toBe(wtgUi._vuetify.display);
        });

        test('it provides access to the active color variant through the $wtgUi variable', () => {
            const wrapper = mountComponent();
            expect(wrapper.vm.$wtgUi!.dark).toBe(true);
            expect(wrapper.vm.$wtgUi!.colors.primary).toBe('#FFFFFE');

            wrapper.vm.$wtgUi!.dark = false;
            expect(wrapper.vm.$wtgUi!.dark).toBe(false);
            expect(wrapper.vm.$wtgUi!.colors.primary).toBe('#000001');
        });

        test('it provides access to the current locale information through the language property of the $wtgUi variable', () => {
            const wrapper = mountComponent();
            expect(wrapper.vm.$wtgUi!.language.current.value).toBe('en-AU');
            expect(wrapper.vm.$wtgUi!.language.locale.name).toBe('English (Australia)');
            expect(wrapper.vm.$wtgUi!.language.locale.decimalCharacter).toBe('.');

            wrapper.vm.$wtgUi!.language.current = 'fr';
            expect(wrapper.vm.$wtgUi!.language.locale.name).toBe('French');
            expect(wrapper.vm.$wtgUi!.language.locale.decimalCharacter).toBe(',');
        });

        test('it provides access to the caption provider through the language.captions property of the $wtgUi variable', () => {
            const wrapper = mountComponent();
            expect(wrapper.vm.$wtgUi!.language.captions.provider('en-AU', 'some key')).toBe('some caption');
        });

        test('it provides access to the date formatter through the language.dateFormatter property of the $wtgUi variable', () => {
            const wrapper = mountComponent();
            expect(wrapper.vm.$wtgUi!.language.dateFormatter.today()).toBe('2day');
        });
    });

    describe('when the theme is changed at runtime through the installTheme method', () => {
        beforeEach(() => {
            wtgUi.installTheme({
                colors: {
                    light: {
                        primary: '#000002',
                        controls: {
                            icon: {
                                color: 'rgba(0, 0, 0, 0.8)',
                            },
                        },
                    },
                    dark: {
                        primary: '#FFFFFD',
                    },
                },
            });
        });

        test('it replaces the Vuetify colors with the colors from the new theme', () => {
            expect(wtgUi._vuetify.theme.computedThemes.value.light.colors.primary).toBe('#000002');
            expect(wtgUi._vuetify.theme.computedThemes.value.dark.colors.primary).toBe('#FFFFFD');
        });
    });

    function mountComponent() {
        const component = defineComponent({
            template: '<div class="wtg-colors"><wtg-span-component /><wtg-icon-component /></div>',
            setup() {
                const $wtgUi = useWtgUi();
                return { $wtgUi };
            },
        });

        return mount(component, {
            wtgUi,
        });
    }
});
