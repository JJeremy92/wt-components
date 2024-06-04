import DefaultDurationFormatter from '../DefaultDurationFormatter';
import { DurationDisplayFormat } from '../types';

describe('DefaultDurationFormatter', () => {
    let formatter: DefaultDurationFormatter;

    beforeEach(() => {
        formatter = new DefaultDurationFormatter();
    });

    test.each([
        ['0', '0:00:00'],
        [' 00 ', '0:00:00'],
        ['9999:59', '9999:59'],
        ['11:40', '11:40'],
        ['9999:', '9999:'],
        ['19:', '19:00:00'],
        [':59', ':59'],
        [':19  ', '0:19:00'],
        [':9', '0:09:00'],
        [':', '0:00:00'],
        [' 12 :  34 ', '12 :  34'],
        [' 12 :  15 ', '12:15:00'],
        [' 12 :  15 :  23  ', '12:15:23'],
        ['0:90', '0:90'],
        ['0:60', '0:60'],
        ['0:59', '0:59'],
        ['0', '0:00:00'],
        ['0009', '9:00:00'],
        ['19', '19:00:00'],
        ['19    ', '19:00:00'],
        ['19.    ', '19.'],
        ['27:10:35', '27:10:35'],
        ['27:30:35', '27:30:35'],
        ['27:10:70', '27:10:70'],
        ['27:10:', '27:10:00'],
        ['27:10', '27:10:00'],
        ['27::', '27:00:00'],
        [':10:', '0:10:00'],
        ['::35', '0:00:35'],
        [':10:35', '0:10:35'],
        ['27:', '27:00:00'],
        [':10', '0:10:00'],
        ['27', '27:00:00'],
        ['27:001:25', '27:01:25'],
        ['27:11:345', '27:11:345'],
    ])('it formats %p in a dd:hh:mm format', (duration, expectedResult) => {
        expect(formatter.format(duration, DurationDisplayFormat.DaysAndHoursAndMinutes)).toBe(
            expectedResult
        );
    });

    test.each([
        ['0', '0:00'],
        [' 00 ', '0:00'],
        ['9999:59', '9999:59'],
        ['11:40', '11:40'],
        ['9999:', '9999:00'],
        ['19:', '19:00'],
        [':59', '0:59'],
        [':19  ', '0:19'],
        [':9', '0:09'],
        [':', '0:00'],
        [' 12 :  34 ', '12:34'],
        ['0:90', '0:90'],
        ['0:60', '0:60'],
        ['0:59', '0:59'],
        ['0', '0:00'],
        ['0009', '9:00'],
        ['19', '19:00'],
        ['19    ', '19:00'],
        ['19.    ', '19.'],
    ])('it formats %p in a hh:mm format', (duration, expectedResult) => {
        expect(formatter.format(duration, DurationDisplayFormat.HoursAndMinutes)).toBe(
            expectedResult
        );
    });

    test.each(['-', '/', '\\'])(
        'it formats %s as semicolon and formats string in a dd:hh:mm format',
        (char) => {
            expect(
                formatter.format(`11${char}20`, DurationDisplayFormat.DaysAndHoursAndMinutes)
            ).toBe('11:20:00');
            expect(
                formatter.format(`1${char}2`, DurationDisplayFormat.DaysAndHoursAndMinutes)
            ).toBe('1:02:00');
        }
    );

    test.each(['-', '/', '\\'])(
        'it formats %s as semicolon and formats string in a dd:hh:mm format',
        (char) => {
            expect(formatter.format(`11${char}20`, DurationDisplayFormat.HoursAndMinutes)).toBe(
                '11:20'
            );
            expect(formatter.format(`1${char}2`, DurationDisplayFormat.HoursAndMinutes)).toBe(
                '1:02'
            );
        }
    );

    test.each(['19A', '11:60', ':60', 'a:b', 'not a time', '27:30:35', '27:10:70'])(
        'it formats invalid value %p as original value when display format is dd:hh:mm',
        (duration) => {
            expect(formatter.format(duration, DurationDisplayFormat.DaysAndHoursAndMinutes)).toBe(
                duration.trim()
            );
        }
    );

    test.each(['19A', '11:60', ':60', 'a:b', 'not a time', '1 2 : ', '27:30:35', '27:10:70'])(
        'it formats invalid value %p as original value when display format is hhh:mm',
        (duration) => {
            expect(formatter.format(duration, DurationDisplayFormat.HoursAndMinutes)).toBe(
                duration.trim()
            );
        }
    );

    test.each(['', '  '])(
        'it formats %p as empty string when display format is dd:hh:mm',
        (duration) => {
            expect(formatter.format(duration, DurationDisplayFormat.DaysAndHoursAndMinutes)).toBe(
                ''
            );
        }
    );

    test.each(['', '  '])(
        'it formats %p as empty string when display format is hhh:mm',
        (duration) => {
            expect(formatter.format(duration, DurationDisplayFormat.HoursAndMinutes)).toBe('');
        }
    );
});
