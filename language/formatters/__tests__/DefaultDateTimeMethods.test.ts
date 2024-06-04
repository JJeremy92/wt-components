import DefaultDateTimeMethods from '../DefaultDateTimeMethods';
import enUs from '../../locale/en-US';

let dateTimeMethods: DefaultDateTimeMethods;

describe('DefaultDateTimeMethods', () => {

    describe('when a date in iso format requires manipulation, it returns a new string in iso format', () => {
        beforeEach(() => {
            dateTimeMethods = new DefaultDateTimeMethods('en-US', enUs);
        });

        it('it can add to a provided date depending on time unit provided', () => {
            const date = '1970-01-01';
            const threeDaysAdded = dateTimeMethods.add(date, 3, 'days');
            const threeWeeksAdded = dateTimeMethods.add(date, 3, 'weeks');
            const threeMonthsAdded = dateTimeMethods.add(date, 3, 'months');
            const threeYearsAdded = dateTimeMethods.add(date, 3, 'years');

            expect(threeDaysAdded).toBe('1970-01-04');
            expect(threeWeeksAdded).toBe('1970-01-22');
            expect(threeMonthsAdded).toBe('1970-04-01');
            expect(threeYearsAdded).toBe('1973-01-01');
        });

        it('it can subtract from a provided date depending on time unit provided', () => {
            const date = '1970-12-30';
            const threeDaysSubtracted = dateTimeMethods.subtract(date, 3, 'days');
            const threeWeeksSubtracted = dateTimeMethods.subtract(date, 3, 'weeks');
            const threeMonthsSubtracted = dateTimeMethods.subtract(date, 3, 'months');
            const threeYearsSubtracted = dateTimeMethods.subtract(date, 3, 'years');

            expect(threeDaysSubtracted).toBe('1970-12-27');
            expect(threeWeeksSubtracted).toBe('1970-12-09');
            expect(threeMonthsSubtracted).toBe('1970-09-30');
            expect(threeYearsSubtracted).toBe('1967-12-30');
        });
    });

    describe('when a provided iso date needs to calculate start/end of a unit of time', () => {
        it('it can calculate the start of a unit of time based on date given and return the date in iso format', () => {
            dateTimeMethods = new DefaultDateTimeMethods('en-US');

            const date = '2021-11-25';
            const startOfWeek = dateTimeMethods.startOf(date, 'week');
            const startOfMonth = dateTimeMethods.startOf(date, 'month');
            const startOfYear = dateTimeMethods.startOf(date, 'year');

            expect(startOfWeek).toBe('2021-11-21');
            expect(startOfMonth).toBe('2021-11-01');
            expect(startOfYear).toBe('2021-01-01');
        });

        it('it can calculate the end of a unit of time based on date given and return the date in iso format', () => {
            dateTimeMethods = new DefaultDateTimeMethods('en-US');

            const date = '2021-11-25';
            const endOfWeek = dateTimeMethods.endOf(date, 'week');
            const endOfMonth = dateTimeMethods.endOf(date, 'month');
            const endOfYear = dateTimeMethods.endOf(date, 'year');

            expect(endOfWeek).toBe('2021-11-27');
            expect(endOfMonth).toBe('2021-11-30');
            expect(endOfYear).toBe('2021-12-31');
        });

        it('it respects the provided locale format for determining start/end of unit of time and return the date in iso format', () => {
            dateTimeMethods = new DefaultDateTimeMethods('nl');

            const date = '2021-11-25';
            const startOfWeek = dateTimeMethods.startOf(date, 'week');
            const endOfWeek = dateTimeMethods.endOf(date, 'week');
            expect(startOfWeek).toBe('2021-11-22');
            expect(endOfWeek).toBe('2021-11-28');
        });
    });

    describe('when an iso date must be within a given date range', () => {
        beforeEach(() => {
            dateTimeMethods = new DefaultDateTimeMethods('en-US');
        });

        it('it returns false when a proposed date is before a given min date', () => {
            const date = '1970-01-01';
            const minDate = '2021-01-01';
            expect(dateTimeMethods.isWithinRange(date, minDate)).toBe(false);
        });

        it('it returns false when a proposed date is after a given max date', () => {
            const date = '2100-01-01';
            const maxDate = '2021-01-01';
            expect(dateTimeMethods.isWithinRange(date, undefined, maxDate)).toBe(false);
        });

        it('it returns true when a proposed date is within a given date range', () => {
            const date = '2021-01-02';
            const minDate = '2021-01-01';
            const maxDate = '2021-02-01';
            expect(dateTimeMethods.isWithinRange(date, minDate, maxDate)).toBe(true);
        });
    });

    describe('when two iso dates require comparison', () => {
        beforeEach(() => {
            dateTimeMethods = new DefaultDateTimeMethods('en-US');
        });

        it('it returns true if a date shares an indentical unit of time', () => {
            const date = '2021-01-01';
            const sameMonth = '2021-01-20';
            const sameDay = '2021-01-01';

            expect(dateTimeMethods.isSame(date, sameMonth, 'month')).toBe(true);
            expect(dateTimeMethods.isSame(date, sameDay, 'day')).toBe(true);
        });

        it('it returns false if a date does not share an indentical unit of time', () => {
            const date = '2021-01-01';
            const sameMonthDiffYear = '2020-01-20';
            const sameDayDiffMonth = '2021-11-01';

            expect(dateTimeMethods.isSame(date, sameMonthDiffYear, 'month')).toBe(false);
            expect(dateTimeMethods.isSame(date, sameDayDiffMonth, 'day')).toBe(false);
        });
    });

    describe('when a date range requires validation', () => {
        it('can check that an array of %s is a group of valid dates', () => {
            const dates = ['1999-12-31', '2000-01-01', '2000-02-29'];
            expect(dateTimeMethods.isValidList(dates)).toBe(true);
        });

        it('can check that an array of %s contains at least one invalid date', () => {
            const dates = ['1999-12-31', '2000-01-01', 'xxxx', '2000-02-29', '2000-02-29'];
            expect(dateTimeMethods.isValidList(dates)).toBe(false);
        });

        it('can check that an array of %s is a valid date range', () => {
            const dates = ['1999-12-31', '2000-01-01'];
            expect(dateTimeMethods.isValidRange(dates)).toBe(true);
        });

        it('can check that an array of %s is not a valid date range', () => {
            const dates = ['1999-12-31', '2000-01-01', '2000-02-29', '2000-02-29'];
            expect(dateTimeMethods.isValidRange(dates)).toBe(false);
        });
    });
});