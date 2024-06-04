import { Vuetify } from '../WtgUi';
import { Locale } from './locale/types';
import { Ref, ref } from 'vue';
import locales from './locale';
import enAU from './locale/en-AU';
import vuetifyLanguages from './VuetifyLanguages';
import { LocaleOptions } from 'vuetify';
import { LanguageOptions } from './types';
import Captions from './captions';
import DefaultDateFormatter from './formatters/DefaultDateFormatter';
import DefaultDateRangeFormatter from './formatters/DefaultDateRangeFormatter';
import DefaultDateTimeFormatter from './formatters/DefaultDateTimeFormatter';
import DefaultDurationFormatter from './formatters/DefaultDurationFormatter';
import DefaultDateTimeMethods from './formatters/DefaultDateTimeMethods';
import DefaultTimeFormatter from './formatters/DefaultTimeFormatter';
import {
    DateFormatter,
    DateRangeFormatter,
    DateTimeFormatter,
    DateTimeMethods,
    DurationFormatter,
    TimeFormatter,
} from './formatters/types';

class Language {
    private _current: Ref<string>;
    private readonly _options: LanguageOptions | undefined;
    private readonly _vuetify: Vuetify;
    public readonly captions: Captions;

    constructor(vuetify: Vuetify, options?: LanguageOptions) {
        this._vuetify = vuetify;
        this._options = options;
        this._current = ref(options?.current ?? 'en-AU');
        this.captions = new Captions(options?.captionProvider);
    }

    get current(): Ref<string> {
        return this._current;
    }

    set current(value: string) {
        this._current.value = value;
        this._vuetify.locale.current.value = vuetifyLanguageFromCode(value);
    }

    get locale(): Locale {
        return locales[this.current.value.toLowerCase()] ?? enAU;
    }

    get supportedLocales(): Record<string, Locale> {
        return locales;
    }

    get dateFormatter(): DateFormatter {
        return this._options?.dateFormatter ?? new DefaultDateFormatter(this.current.value, this.locale);
    }

    get dateRangeFormatter(): DateRangeFormatter {
        return this._options?.dateRangeFormatter ?? new DefaultDateRangeFormatter(this.current.value, this.locale);
    }

    get dateTimeFormatter(): DateTimeFormatter {
        return this._options?.dateTimeFormatter ?? new DefaultDateTimeFormatter(this.current.value, this.locale);
    }

    get dateTimeMethods(): DateTimeMethods {
        return this._options?.dateTimeMethods ?? new DefaultDateTimeMethods(this.current.value);
    }

    get durationFormatter(): DurationFormatter {
        return this._options?.durationFormatter ?? new DefaultDurationFormatter();
    }

    get timeFormatter(): TimeFormatter {
        return this._options?.timeFormatter ?? new DefaultTimeFormatter(this.current.value, this.locale);
    }

    static toVuetifyLocaleOptions(options?: LanguageOptions): LocaleOptions {
        return {
            locale: vuetifyLanguageFromCode(options?.current),
            messages: vuetifyLanguages,
        };
    }
}

function vuetifyLanguageFromCode(code?: string): string {
    if (code) {
        const i = code.indexOf('-');
        const language = (i >= 0 ? code.substr(0, i) : code).toLowerCase();
        if (vuetifyLanguages[language]) {
            return language;
        }
    }
    return 'en';
}

export default Language;
