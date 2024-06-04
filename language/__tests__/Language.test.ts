import Language from '../Language';
import locales from '../locale';
import vuetifyLocales from '../VuetifyLanguages';
import { defaultCaptionProvider } from '../captions';
import DefaultDateFormatter from '../formatters/DefaultDateFormatter';
import DefaultDateRangeFormatter from '../formatters/DefaultDateRangeFormatter';
import DefaultDateTimeFormatter from '../formatters/DefaultDateTimeFormatter';
import DefaultDurationFormatter from '../formatters/DefaultDurationFormatter';
import DefaultTimeFormatter from '../formatters/DefaultTimeFormatter';
import { LanguageOptions } from '../types';
import DefaultDateTimeMethods from '../formatters/DefaultDateTimeMethods';
import { createVuetify } from 'vuetify/lib/framework.mjs';
import { Vuetify } from '../../WtgUi';
import { ref } from 'vue';

describe('Language', () => {
    describe('when using the static helper method called toVuetifyLocaleOptions', () => {
        let options: LanguageOptions;

        beforeEach(() => {
            options = {
                current: 'nl-NL',
            };
        });

        test('it creates the vuetify options with the corresponding language', () => {
            expect(Language.toVuetifyLocaleOptions(options).locale).toBe('nl');
        });

        test("it creates the vuetify options with the default language of english if you don't specify a current language", () => {
            expect(Language.toVuetifyLocaleOptions().locale).toBe('en');
        });

        test('it initializes vuetify with the locales required to get the language support for our list of supported languages', () => {
            expect(Language.toVuetifyLocaleOptions().messages).toBe(vuetifyLocales);
        });
    });

    describe('when created as a singleton instance', () => {
        let language: Language;
        let vuetify: Vuetify;

        beforeEach(() => {
            vuetify = createVuetify({
                locale: Language.toVuetifyLocaleOptions(),
            });
            language = new Language(vuetify);
        });

        test('it provides access to the current locale', () => {
            expect(language.current.value).toBe('en-AU');
        });

        test('it allows you to change the current locale and it keeps the vuetify language in sync', () => {
            language.current = 'nl-NL';
            expect(language.current.value).toBe('nl-NL');
            expect(vuetify.locale.current.value).toBe('nl');
        });

        test('it provides access to the locale information for the current locale', () => {
            language.current.value = 'en-US';
            expect(language.locale.name).toBe('English (United States)');
            expect(language.locale.decimalCharacter).toBe('.');

            language.current.value = 'fr';
            expect(language.locale.name).toBe('French');
            expect(language.locale.decimalCharacter).toBe(',');
        });

        test('it does a case-insensitive lookup to retrieve the locale information', () => {
            language.current.value = 'EN-US';
            expect(language.locale.name).toBe('English (United States)');

            language.current.value = 'FR';
            expect(language.locale.name).toBe('French');

            language.current.value = 'En-uS';
            expect(language.locale.name).toBe('English (United States)');

            language.current.value = 'Fr';
            expect(language.locale.name).toBe('French');
        });

        test('it provides access to the list of supported locales', () => {
            expect(language.supportedLocales).toBe(locales);
        });

        test('it provides access to the captions provider through a captions object', () => {
            expect(language.captions.provider).toBe(defaultCaptionProvider);
        });

        test('it provides access to the date formatter through a dateFormatter object', () => {
            expect(language.dateFormatter).toBeInstanceOf(DefaultDateFormatter);
        });

        test('it uses the current locale for the date formatter', () => {
            expect(language.dateFormatter.format('1974-02-07')).toBe('07-Feb-74');

            language.current.value = 'en-US';
            expect(language.dateFormatter.format('1974-02-07')).toBe('Feb-07-74');
        });

        test('it provides access to the date range formatter through a dateRangeFormatter object', () => {
            expect(language.dateRangeFormatter).toBeInstanceOf(DefaultDateRangeFormatter);
        });

        test('it uses the current locale for the date range formatter', () => {
            expect(language.dateRangeFormatter.format('1974-02-07 - 1974-04-07')).toBe('07-Feb-74 - 07-Apr-74');

            language.current.value = 'en-US';
            expect(language.dateRangeFormatter.format('1974-02-07 - 1974-04-07')).toBe('Feb-07-74 - Apr-07-74');
        });

        test('it provides access to the date/time formatter through a dateTimeFormatter object', () => {
            expect(language.dateTimeFormatter).toBeInstanceOf(DefaultDateTimeFormatter);
        });

        test('it uses the current locale for the date/time formatter', () => {
            const dateTime = new Date('1974-02-07 13:10:59').toISOString();
            expect(language.dateTimeFormatter.format(dateTime, true)).toBe('07-Feb-74 13:10:59');

            language.current.value = 'en-US';
            expect(language.dateTimeFormatter.format(dateTime, true)).toBe('Feb-07-74 01:10:59 PM');
        });

        test('it provides access to the duration formatter through a durationFormatter object', () => {
            expect(language.durationFormatter).toBeInstanceOf(DefaultDurationFormatter);
        });

        test('it uses the current locale for the duration formatter', () => {
            const duration = ' 12 :  34 ';
            expect(language.durationFormatter.format(duration)).toBe('12:34');
        });

        test('it provides access to date/time manipulation through a dateTimeMethods object', () => {
            expect(language.dateTimeMethods).toBeInstanceOf(DefaultDateTimeMethods);
        });

        test('it uses the current locale for the date/time methods', () => {
            const dateTime = '1974-07-02';
            expect(language.dateTimeMethods.startOf(dateTime, 'week')).toBe('1974-06-30');

            language.current.value = 'nl-NL';
            expect(language.dateTimeMethods.startOf(dateTime, 'week')).toBe('1974-07-01');
        });

        test('it provides access to the time formatter through a timeFormatter object', () => {
            expect(language.timeFormatter).toBeInstanceOf(DefaultTimeFormatter);
        });

        test('it uses the current locale for the time formatter', () => {
            expect(language.timeFormatter.format('13:10:59', true)).toBe('13:10:59');

            language.current.value = 'en-US';
            expect(language.timeFormatter.format('13:10:59', true)).toBe('01:10:59 PM');
        });
    });

    describe('when created with language options', () => {
        let language: Language;
        let vuetify: Vuetify;

        beforeEach(() => {
            const options: LanguageOptions = {
                current: 'nl-NL',
                captionProvider: () => 'some caption',
                dateFormatter: { format: () => 'some date' } as any,
                dateRangeFormatter: { format: () => 'some date range' } as any,
                dateTimeFormatter: { format: () => 'some date/time' } as any,
                durationFormatter: { format: () => 'some duration' } as any,
                timeFormatter: { format: () => 'some time' } as any,
            };
            vuetify = createVuetify({
                locale: Language.toVuetifyLocaleOptions(options),
            });
            language = new Language(vuetify, options);
        });

        test('it applies the given language code', () => {
            expect(language.current.value).toBe('nl-NL');
        });

        test('it applies the given caption provider it was given', () => {
            expect(language.captions.provider(ref('nl-NL'), 'some key')).toBe('some caption');
        });

        test('it applies the given date formatter', () => {
            expect(language.dateFormatter.format('')).toBe('some date');
        });

        test('it applies the given date range formatter', () => {
            expect(language.dateRangeFormatter.format('')).toBe('some date range');
        });

        test('it applies the given date/time formatter', () => {
            expect(language.dateTimeFormatter.format('', false)).toBe('some date/time');
        });

        test('it applies the given duration formatter', () => {
            expect(language.durationFormatter.format('')).toBe('some duration');
        });

        test('it applies the given time formatter', () => {
            expect(language.timeFormatter.format('', false)).toBe('some time');
        });
    });
});
