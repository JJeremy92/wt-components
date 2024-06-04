import { useLocale } from '../locale';
import { useWtgUi } from '../../global';

const $wtgUi = useWtgUi();

describe('useLocale', () => {
    beforeEach(() => {
        $wtgUi.language.current = 'en-AU';
    });

    describe('formatCaption', () => {
        test('when given an unknown key, it returns an empty string', () => {
            const { formatCaption } = useLocale();
            expect(formatCaption('some.unknown.key')).toBe('');
        });

        test('when given a known key, it returns the corresponding caption in the current language', () => {
            const { formatCaption } = useLocale();
            expect(formatCaption('searchDataTable.search')).toBe('Search');

            $wtgUi.language.current = 'nl';
            expect(formatCaption('searchDataTable.search')).toBe('Zoek');
        });
    });

    describe('languageCode', () => {
        test('it provides access to the current language code', () => {
            const { languageCode } = useLocale();
            $wtgUi.language.current = 'nl';
            expect(languageCode.value).toBe('nl');
        });
    });

    describe('locale', () => {
        test('it provides access to the current locale info', () => {
            const { locale } = useLocale();
            expect(locale.value.name).toBe('English (Australia)');
        });

        test('when switching language, it provides access to the new locale info', () => {
            const { locale } = useLocale();
            expect(locale.value.name).toBe('English (Australia)');

            $wtgUi.language.current = 'nl';
            expect(locale.value.name).toBe('Dutch');
        });
    });

    describe('dateFormatter', () => {
        test('it provides access to the dateFormatter', () => {
            const { dateFormatter } = useLocale();
            expect(dateFormatter.value.today()).toBeTruthy();
        });

        test('when switching language, it creates a date-formatter using the current locale', () => {
            const { dateFormatter } = useLocale();
            expect(dateFormatter.value.format('1974-02-07')).toBe('07-Feb-74');

            $wtgUi.language.current = 'en-US';
            expect(dateFormatter.value.format('1974-02-07')).toBe('Feb-07-74');
        });
    });

    describe('dateRangeFormatter', () => {
        test('it provides access to the dateRangeFormatter', () => {
            const { dateRangeFormatter } = useLocale();
            expect(dateRangeFormatter).toBeTruthy();
        });

        test('when switching language, it creates a date-range formatter using the current locale', () => {
            const { dateRangeFormatter } = useLocale();
            expect(dateRangeFormatter.value.format('1974-02-07 - 1974-04-07')).toBe('07-Feb-74 - 07-Apr-74');

            $wtgUi.language.current = 'en-US';
            expect(dateRangeFormatter.value.format('1974-02-07 - 1974-04-07')).toBe('Feb-07-74 - Apr-07-74');
        });
    });

    describe('dateTimeMethods', () => {
        test('it provides access to the dateTimeMethods', () => {
            const { dateTimeMethods } = useLocale();
            expect(dateTimeMethods).toBeTruthy();
        });

        test('when switching language, it creates a date time method using the current locale', () => {
            const { dateTimeMethods } = useLocale();
            const dateTime = '1974-07-02';
            expect(dateTimeMethods.value.add(dateTime, 1, 'month')).toBe('1974-08-02');
        });
    });

    describe('dateTimeFormatter', () => {
        test('it provides access to the dateTimeFormatter', () => {
            const { dateTimeFormatter } = useLocale();
            expect(dateTimeFormatter).toBeTruthy();
        });

        test('when switching language, it creates a date time formatter using the current locale', () => {
            const { dateTimeFormatter } = useLocale();
            const dateTime = new Date('1974-02-07 13:10:59').toISOString();
            expect(dateTimeFormatter.value.format(dateTime, true)).toBe('07-Feb-74 13:10:59');

            $wtgUi.language.current = 'en-US';
            expect(dateTimeFormatter.value.format(dateTime, true)).toBe('Feb-07-74 01:10:59 PM');
        });
    });

    describe('timeFormatter', () => {
        test('it provides access to the timeFormatter', () => {
            const { timeFormatter } = useLocale();
            expect(timeFormatter).toBeTruthy();
        });

        test('when switching language, it creates a time formatter using the current locale', () => {
            const { timeFormatter } = useLocale();
            expect(timeFormatter.value.format('13:10:59', true)).toBe('13:10:59');

            $wtgUi.language.current = 'en-US';
            expect(timeFormatter.value.format('13:10:59', true)).toBe('01:10:59 PM');
        });
    });

    describe('durationFormatter', () => {
        test('it provides access to the durationFormatter', () => {
            const { durationFormatter } = useLocale();
            expect(durationFormatter).toBeTruthy();
        });

        test('when switching language, it creates a duration formatter using the current locale', () => {
            const { durationFormatter } = useLocale();
            const duration = ' 12 :  34 ';
            expect(durationFormatter.value.format(duration)).toBe('12:34');
        });
    });

    describe('abbreviateNumber composable', () => {
        test.each([
            [100, '100'],
            [1000, '1K'],
            [1234, '1.2K'],
            [12345, '12.3K'],
            [123456, '123K'],
            [1234567, '1.2M'],
            [12345678, '12.3M'],
            [123456789, '123M'],
            [1234567890, '1.2B'],
            [12345678901, '12.3B'],
            [123456789012, '123B'],
            [1234567890123, '1.2T'],
            [12345678901234, '12.3T'],
            [123456789012345, '123T'],
            [1234567890123456, '>1Q'],
            [-100, '-100'],
            [-1000, '-1K'],
            [-1234, '-1.2K'],
            [-12345, '-12.3K'],
            [-123456, '-123K'],
            [-1234567, '-1.2M'],
            [-12345678, '-12.3M'],
            [-123456789, '-123M'],
            [-1234567890, '-1.2B'],
            [-12345678901, '-12.3B'],
            [-123456789012, '-123B'],
            [-1234567890123, '-1.2T'],
            [-12345678901234, '-12.3T'],
            [-123456789012345, '-123T'],
            [-1234567890123456, '<-1Q'],
            [0, '0'],
            [0.1, '0.1'],
            [0.01, '0.01'],
            [0.001, '0.001'],
            [0.0001, '0.0001'],
            [0.00001, '0.00001'],
            [0.000001, '0.000001'],
            [0.0000001, '1e-7'],
            [0.1234567, '0.1234567'],
            [0.12345678, '0.12345678'],
            [10.1234567, '10.1234567'],
            [100.1234567, '100.1234567'],
            [1000.1234567, '1K'],
            [10000.1234567, '10K'],
        ])('abbreviates %d to `%s`', (recordCount, expectedCount) => {
            const { abbreviateNumber } = useLocale();

            const result = abbreviateNumber(recordCount);

            expect(result).toEqual(expectedCount);
        });
    });
});
