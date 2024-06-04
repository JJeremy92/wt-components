import DefaultDateTimeFormatter from '../DefaultDateTimeFormatter';
import enUs from '../../locale/en-US';
import nl from '../../locale/nl';

describe('DefaultDateTimeFormatter', () => {
    let dateTimeFormatter: DefaultDateTimeFormatter;

    describe('when created for US english with date format MMM-DD-YY and time format ampm', () => {
        beforeEach(() => {
            dateTimeFormatter = new DefaultDateTimeFormatter('en-US', enUs);
        });

        test.each([['1974-02-07T10:05:03.000Z', 'Feb-07-74 09:05:03 PM']])(
            `it can format the ISO dateTime %s into the (localized) display string %s when you pass useSeconds = true`,
            (dateTime, expected) => {
                expect(dateTimeFormatter.format(dateTime, true)).toBe(expected);
            }
        );

        test.each([['1974-02-07T10:05:00.000Z', 'Feb-07-74 09:05 PM']])(
            `it can format the ISO dateTime %s into the (localized) display string %s when you pass useSeconds = false`,
            (dateTime, expected) => {
                expect(dateTimeFormatter.format(dateTime, false)).toBe(expected);
            }
        );

        test.each([
            'Feb-07-74 09:05:00 PM',
            'Feb-07-74 09:05 PM',
            'Feb-07-1974 09:05:00 PM',
            'Feb-07-1974 21:05',
            'Feb-7-1974 21:05',
            'Feb-7-74 21:5',
            '02-07-74 09:05:00 PM',
            '02-07-1974 09:05:00 PM',
            '2-7-1974 09:05:00 PM',
            '2-7-1974 09:05 pm',
            '2-7-1974 21:05',
            '2-7-74 21:5'
        ])(
            'it can parse the string %s into the ISO string 1974-02-07T10:05:00.000Z',
            (dateTime: string) => {
                expect(dateTimeFormatter.parse(dateTime)).toBe('1974-02-07T10:05:00.000Z');
            }
        );

        test.each(['Feb-07-74', '02-07-74', '2-7-74'])(
            'it can parse the string %s into the ISO string for midnight 1974-02-07 (local time)',
            (dateTime: string) => {
                expect(dateTimeFormatter.parse(dateTime)).toBe('1974-02-06T13:00:00.000Z');
            }
        );

        test.each(['02071974 21:05', '02071974 9:5 pm'])(
            "it can parse the string %s into the ISO string 1974-02-07T10:05:00.000Z even though it's missing the date seperators",
            (dateTime: string) => {
                expect(dateTimeFormatter.parse(dateTime)).toBe('1974-02-07T10:05:00.000Z');
            }
        );
    });

    describe('when created for NL dutch with date format DD-MMM-YYYY and time format 24hr', () => {
        beforeEach(() => {
            dateTimeFormatter = new DefaultDateTimeFormatter('nl', nl);
        });

        test.each([['1974-02-07T10:05:03.000Z', '07-feb-1974 21:05:03']])(
            `it can format the ISO dateTime %s into the (localized) display string %s when you pass useSeconds = true`,
            (dateTime, expected) => {
                expect(dateTimeFormatter.format(dateTime, true)).toBe(expected);
            }
        );

        test.each([['1974-02-07T10:05:00.000Z', '07-feb-1974 21:05']])(
            `it can format the ISO dateTime %s into the (localized) display string %s when you pass useSeconds = false`,
            (dateTime, expected) => {
                expect(dateTimeFormatter.format(dateTime, false)).toBe(expected);
            }
        );

        test.each([
            '07-feb-1974 09:05:00 PM',
            '07-feb-74 09:05 PM',
            '07-feb-1974 09:05:00 PM',
            '07-feb-1974 21:05',
            '7-feb-1974 21:05',
            '7-feb-74 21:5',
            '07-02-74 09:05:00 PM',
            '07-02-1974 09:05:00 PM',
            '7-2-1974 09:05:00 PM',
            '7-2-1974 09:05 pm',
            '7-2-1974 21:05',
            '7-2-74 21:5'
        ])(
            'it can parse the string %s into the ISO string 1974-02-07T10:05:00.000Z',
            (dateTime: string) => {
                expect(dateTimeFormatter.parse(dateTime)).toBe('1974-02-07T10:05:00.000Z');
            }
        );

        test.each(['07-feb-74', '07-02-74', '7-2-74'])(
            'it can parse the string %s into the ISO string for midnight 1974-02-07 (local time)',
            (dateTime: string) => {
                expect(dateTimeFormatter.parse(dateTime)).toBe('1974-02-06T13:00:00.000Z');
            }
        );

        test.each(['07021974 21:05', '07021974 9:5 pm'])(
            "it can parse the string %s into the ISO string 1974-02-07T10:05:00.000Z even though it's missing the date seperators",
            (dateTime: string) => {
                expect(dateTimeFormatter.parse(dateTime)).toBe('1974-02-07T10:05:00.000Z');
            }
        );
    });
});
