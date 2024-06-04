import DefaultDateRangeFormatter from '../DefaultDateRangeFormatter';
import enUs from '../../locale/en-US';
import enAU from '../../locale/en-AU';
import nl from '../../locale/nl';
import dayjs from '../dayjs';

const now = dayjs();
const thisYear = now.format('YYYY');
const thisMonth = now.format('MM');

describe('DefaultDateRangeFormatter', () => {
    let dateRangeFormatter: DefaultDateRangeFormatter;

    describe('when created for US english with date format MMM-DD-YY', () => {
        beforeEach(() => {
            dateRangeFormatter = new DefaultDateRangeFormatter('en-US', enUs);
        });

        test.each([
            '1999-12-30 - 1999-12-31',
            '2000-01-01 - 2000-03-01',
            '2000-02-28 - 2000-02-29',
        ])(`it can check that %s is a valid date range`, (date) => {
            expect(dateRangeFormatter.isValid(date)).toBe(true);
        });

        test.each([
            '1999-12-32 - 1999-12-32',
            'Dec-31-99 - Dec-31-99',
            'xxxx',
            '2001-02-28 - 2001-02-29',
        ])(`it can check that %s is an invalid date`, (date) => {
            expect(dateRangeFormatter.isValid(date)).toBe(false);
        });

        test.each([
            ['1974-02-07 - 1974-04-07', 'Feb-07-74 - Apr-07-74'],
            ['1999-12-30 - 1999-12-31', 'Dec-30-99 - Dec-31-99'],
            ['2000-01-01 - 2000-02-01', 'Jan-01-00 - Feb-01-00'],
        ])(`it can format the ISO date %s into the display string %s`, (date, expected) => {
            expect(dateRangeFormatter.format(date)).toBe(expected);
        });

        test.each([
            'Feb-07-1974 - Feb-07-1974',
            'Feb-07-74 - Feb-07-74',
            'Feb-7-1974 - Feb-7-1974',
            'Feb-7-74 - Feb-7-74',
            '02-07-1974 - 02-07-1974',
            '02-07-74 - 02-07-74',
            '02-7-1974 - 02-7-1974',
            '02-7-74 - 02-7-74',
            '2-07-1974 - 2-07-1974',
            '2-07-74 - 2-07-74',
            '2-7-1974 - 2-7-1974',
            '2-7-74 - 2-7-74',
        ])(
            'it can parse the string %s into the ISO string range 1974-02-07 - 1974-02-07',
            (date: string) => {
                expect(dateRangeFormatter.parse(date)).toBe('1974-02-07 - 1974-02-07');
            }
        );

        test.each(['02071974 - 02071974', '020774 - 020774'])(
            "it can parse the string %s into the ISO string 1974-02-07 even though it's missing the seperators",
            (date: string) => {
                expect(dateRangeFormatter.parse(date)).toBe('1974-02-07 - 1974-02-07');
            }
        );

        test.each([
            '02.07.1974 - 02.07.1974',
            '02 07 1974 - 02 07 1974',
            '02.07.74 - 02.07.74',
            '02 07 74 - 02 07 74',
            '02.7.1974 - 02.7.1974',
            '02 7 1974 - 02 7 1974',
            '02.7.74 - 02.7.74',
            '02 7 74 - 02 7 74',
            '2.07.1974 - 2.07.1974',
            '2 07 1974 - 2 07 1974',
            '2.07.74 - 2.07.74',
            '2 07 74 - 2 07 74',
            '2.7.1974 - 2.7.1974',
            '2 7 1974 - 2 7 1974',
            '2.7.74 - 2.7.74',
            '2 7 74 - 2 7 74',
            'Feb 7 1974 - Feb 7 1974',
            'Feb 07 1974 - Feb 07 1974',
            'Feb 7 74 - Feb 7 74',
            'Feb 07 74 - Feb 07 74',
        ])(
            'it can parse the string %s into the ISO string 1974-02-07 - 1974-02-07 even though the seperators are incorrect',
            (date: string) => {
                expect(dateRangeFormatter.parse(date)).toBe('1974-02-07 - 1974-02-07');
            }
        );

        test.each([
            '0207 - 0207',
            '2-7 - 2-7',
            '2-07 - 2-07',
            '02-7 - 02-7',
            'Feb-7 - Feb-7',
            'Feb-07 - Feb-07',
            '2 7 - 2 7',
            '2 07 - 2 07',
            'Feb 7 - Feb 7',
            'Feb 07 - Feb 07',
        ])(
            "it can parse the string %s even though it doesn't specify a year, it will assume it the current year",
            (date: string) => {
                expect(dateRangeFormatter.parse(date)).toBe(
                    `${thisYear}-02-07 - ${thisYear}-02-07`
                );
            }
        );

        test.each(['7 - 7', '07 - 07'])(
            "it can parse the string %s even though it doesn't specify a year or a month, it will assume it the current year and the current month",
            (date: string) => {
                expect(dateRangeFormatter.parse(date)).toBe(
                    `${thisYear}-${thisMonth}-07 - ${thisYear}-${thisMonth}-07`
                );
            }
        );

        test.each(['74 - 74', '1974 - 1974'])(
            'it can parse the string %s even though it only specifies a year, it will assume it to be the first day of that year',
            (date: string) => {
                expect(dateRangeFormatter.parse(date)).toBe('1974-01-01 - 1974-01-01');
            }
        );
    });

    describe('when created for NL dutch with date format DD-MMM-YYYY', () => {
        beforeEach(() => {
            dateRangeFormatter = new DefaultDateRangeFormatter('nl', nl);
        });

        test.each([
            '1999-12-31 - 1999-12-31',
            '2000-01-01 - 2000-01-01',
            '2000-02-29 - 2000-02-29',
        ])(`it can check that %s is a valid date`, (date) => {
            expect(dateRangeFormatter.isValid(date)).toBe(true);
        });

        test.each([
            '1999-12-32 - 1999-12-32',
            'Dec-31-99 - Dec-31-99',
            'xxxx',
            '2001-02-29 - 2001-02-29',
        ])(`it can check that %s is an invalid date`, (date) => {
            expect(dateRangeFormatter.isValid(date)).toBe(false);
        });

        test.each([
            ['1974-02-07 - 1974-02-07', '07-feb-1974 - 07-feb-1974'],
            ['1999-12-31 - 1999-12-31', '31-dec-1999 - 31-dec-1999'],
            ['2000-01-01 - 2000-01-01', '01-jan-2000 - 01-jan-2000'],
        ])(`it can format the ISO date %s into the display string %s`, (date, expected) => {
            expect(dateRangeFormatter.format(date)).toBe(expected);
        });

        test.each([
            '07-feb-1974 - 07-feb-1974',
            '07-feb-74 - 07-feb-74',
            '7-feb-1974 - 7-feb-1974',
            '7-feb-74 - 7-feb-74',
            '07-02-1974 - 07-02-1974',
            '07-02-74 - 07-02-74',
            '07-2-1974 - 07-2-1974',
            '07-2-74 - 07-2-74',
            '7-02-1974 - 7-02-1974',
            '7-02-74 - 7-02-74',
            '7-2-1974 - 7-2-1974',
            '7-2-74 - 7-2-74',
        ])(
            'it can parse the string %s into the ISO string 1974-02-07 - 1974-02-07',
            (date: string) => {
                expect(dateRangeFormatter.parse(date)).toBe('1974-02-07 - 1974-02-07');
            }
        );

        test.each(['07021974 - 07021974', '070274 - 070274'])(
            "it can parse the string %s into the ISO string 1974-02-07 - 1974-02-07 even though it's missing the seperators",
            (date: string) => {
                expect(dateRangeFormatter.parse(date)).toBe('1974-02-07 - 1974-02-07');
            }
        );

        test.each([
            '07.02.1974 - 07.02.1974',
            '07 02 1974 - 07 02 1974',
            '07.02.74 - 07.02.74',
            '07 02 74 - 07 02 74',
            '07.2.1974 - 07.2.1974',
            '07 2 1974 - 07 2 1974',
            '07.2.74 - 07.2.74',
            '07 2 74 - 07 2 74',
            '7.02.1974 - 7.02.1974',
            '7 02 1974 - 7 02 1974',
            '7.02.74 - 7.02.74',
            '7 02 74 - 7 02 74',
            '7.2.1974 - 7.2.1974',
            '7 2 1974 - 7 2 1974',
            '7.2.74 - 7.2.74',
            '7 2 74 - 7 2 74',
            '7 feb 1974 - 7 feb 1974',
            '07 feb 1974 - 07 feb 1974',
            '7 feb 74 - 7 feb 74',
            '07 feb 74 - 07 feb 74',
        ])(
            'it can parse the string %s into the ISO string 1974-02-07 - 1974-02-07 even though the seperators are incorrect',
            (date: string) => {
                expect(dateRangeFormatter.parse(date)).toBe('1974-02-07 - 1974-02-07');
            }
        );

        test.each([
            '0702 - 0702',
            '7-2 - 7-2',
            '7-02 - 7-02',
            '07-2 - 07-2',
            '7-feb - 7-feb',
            '07-feb - 07-feb',
            '7 feb - 7 feb',
            '7 02 - 7 02',
            '7 feb - 7 feb',
            '07 feb - 07 feb',
        ])(
            "it can parse the string %s even though it doesn't specify a year, it will assume it the current year",
            (date: string) => {
                expect(dateRangeFormatter.parse(date)).toBe(
                    `${thisYear}-02-07 - ${thisYear}-02-07`
                );
            }
        );

        test.each(['7 - 7', '07 - 07'])(
            "it can parse the string %s even though it doesn't specify a year or a month, it will assume it the current year and the current month",
            (date: string) => {
                expect(dateRangeFormatter.parse(date)).toBe(
                    `${thisYear}-${thisMonth}-07 - ${thisYear}-${thisMonth}-07`
                );
            }
        );

        test.each(['74 - 74', '1974 - 1974'])(
            'it can parse the string %s even though it only specifies a year, it will assume it to be the first day of that year',
            (date: string) => {
                expect(dateRangeFormatter.parse(date)).toBe('1974-01-01 - 1974-01-01');
            }
        );
    });

    describe('when testing validity of the date range', () => {
        beforeEach(() => {
            dateRangeFormatter = new DefaultDateRangeFormatter('en-AU', enAU);
        });

        test.each([''])(
            'an empty string is not considered a valid date',
            (date: string) => {
                expect(dateRangeFormatter.isValid(date)).toBe(false);
            }
        );

        test.each(['1995-10-19'])(
            'a single date string will be considered a valid date',
            (date: string) => {
                expect(dateRangeFormatter.isValid(date)).toBe(true);
            }
        );

        test.each(['10-10-1974 - 08-10-1974', '10-10-2000 - 10-10-1999'])(
            'dates where the start date comes after the end date will be considered invalid',
            (date: string) => {
                expect(dateRangeFormatter.isValid(date)).toBe(false);
            }
        );

        test.each(['74 - 74 - 54', '1973 - 1974 - 1975'])(
            'date ranges with more than two dates will be considered invalid',
            (date: string) => {
                expect(dateRangeFormatter.isValid(date)).toBe(false);
            }
        );

        test.each(['lalala - lalala', 'abcdef', '2g3333 - 223djsh3'])(
            'nonsensical dates will be considered invalid',
            (date: string) => {
                expect(dateRangeFormatter.isValid(date)).toBe(false);
            }
        );
    });
});