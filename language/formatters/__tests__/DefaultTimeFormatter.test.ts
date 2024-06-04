import DefaultTimeFormatter from '../DefaultTimeFormatter';
import enUs from '../../locale/en-US';
import nl from '../../locale/nl';
import dayjs from '../dayjs';

describe('DefaultTimeFormatter', () => {
    let timeFormatter: DefaultTimeFormatter;

    describe('when created for US english (with time format ampm)', () => {
        beforeEach(() => {
            timeFormatter = new DefaultTimeFormatter('en-US', enUs);
        });

        test('it can return now in HH:MM format if you pass in useSeconds = false', () => {
            const now = dayjs();
            expect(timeFormatter.now(false)).toBe(now.format('HH:mm'));
        });

        test('it can return now in HH:MM:SS format if you pass in useSeconds = true', () => {
            const now = dayjs();
            expect(timeFormatter.now(true)).toBe(now.format('HH:mm:ss'));
        });

        test.each(['00:00', '00:00:00', '13:30', '13:30:30', '23:59', '23:59:59'])(
            `it can check that %s is a valid time`,
            (time) => {
                expect(timeFormatter.isValid(time)).toBe(true);
            }
        );

        test.each([
            '0:0',
            '24:00',
            '24:00:00',
            '23:60',
            '23:59:60',
            '23:1',
            '13:00 AM',
            '1:30',
            '11.12'
        ])(`it can check that %s is an invalid time`, (time) => {
            expect(timeFormatter.isValid(time)).toBe(false);
        });

        test.each([
            ['01:10', '01:10:00 AM'],
            ['01:10:01', '01:10:01 AM'],
            ['13:30:59', '01:30:59 PM'],
            ['23:59', '11:59:00 PM']
        ])(
            `it can format the ISO time %s into the display string %s when you pass useSeconds = true`,
            (time, expected) => {
                expect(timeFormatter.format(time, true)).toBe(expected);
            }
        );

        test.each([
            ['01:10', '01:10 AM'],
            ['01:10:01', '01:10 AM'],
            ['13:30:59', '01:30 PM'],
            ['23:59', '11:59 PM']
        ])(
            `it can format the ISO time %s into the display string %s when you pass useSeconds = false`,
            (time, expected) => {
                expect(timeFormatter.format(time, false)).toBe(expected);
            }
        );

        test.each([
            '09:08:07',
            '9:08:07',
            '09:08:07',
            '09:8:07',
            '09:08:7',
            '9:8:7',
            '9 8 7',
            '09:08:07 AM',
            '09:08 7 aM',
            '9,8,7,xxx'
        ])(
            'it can parse the string %s into the ISO time 09:08:07 (or 09:08 when useSeconds = false)',
            (time: string) => {
                expect(timeFormatter.parse(time, true)).toBe('09:08:07');
                expect(timeFormatter.parse(time, false)).toBe('09:08');
            }
        );

        test.each([
            '21:08:07',
            '21:8:07',
            '21:08:7',
            '09:08:07 PM',
            '9:08:07 PM',
            '09:08:07 PM',
            '09:8:07 PM',
            '09:08:7 PM',
            '9:8:7 pm',
            '21 8 7',
            '09:08:07 PM',
            '09:08 7 pM',
            '9,8,7 pm'
        ])(
            'it can parse the string %s into the ISO time 21:08:07 (or 21:08 when useSeconds = false)',
            (time: string) => {
                expect(timeFormatter.parse(time, true)).toBe('21:08:07');
                expect(timeFormatter.parse(time, false)).toBe('21:08');
            }
        );

        test.each(['13', '1 PM'])(
            "it can parse the string %s even though it doesn't specify minutes",
            (time: string) => {
                expect(timeFormatter.parse(time, true)).toBe(`13:00:00`);
            }
        );
    });

    describe('when created for NL dutch with time format 24hr', () => {
        beforeEach(() => {
            timeFormatter = new DefaultTimeFormatter('nl', nl);
        });

        test('it can return now in HH:MM format if you pass in useSeconds = false', () => {
            const now = dayjs();
            expect(timeFormatter.now(false)).toBe(now.format('HH:mm'));
        });

        test('it can return now in HH:MM:SS format if you pass in useSeconds = true', () => {
            const now = dayjs();
            expect(timeFormatter.now(true)).toBe(now.format('HH:mm:ss'));
        });

        test.each(['00:00', '00:00:00', '13:30', '13:30:30', '23:59', '23:59:59'])(
            `it can check that %s is a valid time`,
            (time) => {
                expect(timeFormatter.isValid(time)).toBe(true);
            }
        );

        test.each([
            '0:0',
            '24:00',
            '24:00:00',
            '23:60',
            '23:59:60',
            '23:1',
            '13:00 AM',
            '1:30',
            '11.12'
        ])(`it can check that %s is an invalid time`, (time) => {
            expect(timeFormatter.isValid(time)).toBe(false);
        });

        test.each([
            ['01:10', '01:10:00'],
            ['01:10:01', '01:10:01'],
            ['13:30:59', '13:30:59'],
            ['23:59', '23:59:00']
        ])(
            `it can format the ISO time %s into the display string %s when you pass useSeconds = true`,
            (time, expected) => {
                expect(timeFormatter.format(time, true)).toBe(expected);
            }
        );

        test.each([
            ['01:10', '01:10'],
            ['01:10:01', '01:10'],
            ['13:30:59', '13:30'],
            ['23:59', '23:59']
        ])(
            `it can format the ISO time %s into the display string %s when you pass useSeconds = false`,
            (time, expected) => {
                expect(timeFormatter.format(time, false)).toBe(expected);
            }
        );

        test.each([
            '09:08:07',
            '9:08:07',
            '09:08:07',
            '09:8:07',
            '09:08:7',
            '9:8:7',
            '9 8 7',
            '09:08:07 AM',
            '09:08 7 aM',
            '9,8,7,xxx'
        ])(
            'it can parse the string %s into the ISO time 09:08:07 (or 09:08 when useSeconds = false)',
            (time: string) => {
                expect(timeFormatter.parse(time, true)).toBe('09:08:07');
                expect(timeFormatter.parse(time, false)).toBe('09:08');
            }
        );

        test.each([
            '21:08:07',
            '21:8:07',
            '21:08:7',
            '09:08:07 PM',
            '9:08:07 PM',
            '09:08:07 PM',
            '09:8:07 PM',
            '09:08:7 PM',
            '9:8:7 pm',
            '21 8 7',
            '09:08:07 PM',
            '09:08 7 pM',
            '9,8,7 pm'
        ])(
            'it can parse the string %s into the ISO time 21:08:07 (or 21:08 when useSeconds = false)',
            (time: string) => {
                expect(timeFormatter.parse(time, true)).toBe('21:08:07');
                expect(timeFormatter.parse(time, false)).toBe('21:08');
            }
        );

        test.each(['13', '1 PM'])(
            "it can parse the string %s even though it doesn't specify minutes",
            (time: string) => {
                expect(timeFormatter.parse(time, true)).toBe(`13:00:00`);
            }
        );
    });
});
