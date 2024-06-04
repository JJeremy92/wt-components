import { OpUnitType } from 'dayjs';

export interface DateFormatter {
    parse(displayDate: string): string;
    format(isoDate: string): string;
    today(): string;
    isValid(isoDate: string): boolean;
    isValidMonthYear(isoMonthDate: string): boolean;
}

export interface DateRangeFormatter {
    parse(displayDateRange: string): string;
    format(isoDateRange: string): string;
    isValid(isoDateRange: string): boolean;
}

export interface DateTimeFormatter {
    parse(displayDate: string): string;
    format(isoDateTime: string, useSeconds: boolean): string;
}

export interface DurationFormatter {
    parse(displayDuration: string): string;
    format(duration: string, preferredFormat: string): string;
}

export interface TimeFormatter {
    parse(displayTime: string, useSeconds: boolean): string;
    format(time: string, useSeconds: boolean): string;
    now(useSeconds: boolean): string;
    isValid(time: string): boolean;
}

export interface DateTimeMethods {
    add(isoDate: string, amount: number, unitOfTime: OpUnitType): string;
    subtract(isoDate: string, amount: number, unitOfTime: OpUnitType): string;
    startOf(isoDate: string, unitOfTime: OpUnitType): string;
    endOf(isoDate: string, unitOfTime: OpUnitType): string;
    isSame(isoDate: string, isoDateCompare: string, unitOfTime: OpUnitType): boolean;
    isValidList(isoDateArray: Array<string>): boolean;
    isValidRange(isoDateArray: Array<string>): boolean;
    isWithinRange(isoDate: string, minDate: string, maxDate: string): boolean;
}

export enum DurationDisplayFormat {
    HoursAndMinutes = 'HHH:MM',
    DaysAndHoursAndMinutes = 'DD:HH:MM',
}
