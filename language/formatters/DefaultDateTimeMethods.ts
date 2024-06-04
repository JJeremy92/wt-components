import dayjs, { supportedLocale } from './dayjs';
import { ManipulateType, OpUnitType } from 'dayjs';
import { DateTimeMethods } from './types';

const isoFormat = 'YYYY-MM-DD';

class DefaultDateTimeMethods implements DateTimeMethods {
    private readonly locale: string;

    constructor(languageCode: string) {
        this.locale = supportedLocale(languageCode);
    }

    public add(isoDate: string, amount: number, unitOfTime: ManipulateType): string {
        const date = dayjs(isoDate, isoFormat, true);
        return date.isValid() ? dayjs(date).add(amount, unitOfTime).format(isoFormat) : isoDate;
    }

    public subtract(isoDate: string, amount: number, unitOfTime: ManipulateType): string {
        const date = dayjs(isoDate, isoFormat, true);
        return date.isValid()
            ? dayjs(date).subtract(amount, unitOfTime).format(isoFormat)
            : isoDate;
    }

    public startOf(isoDate: string, unitOfTime: OpUnitType): string {
        const date = dayjs(isoDate, isoFormat, this.locale, true);
        return date.isValid() ? dayjs(date).startOf(unitOfTime).format(isoFormat) : isoDate;
    }

    public endOf(isoDate: string, unitOfTime: OpUnitType): string {
        const date = dayjs(isoDate, isoFormat, this.locale, true);
        return date.isValid() ? dayjs(date).endOf(unitOfTime).format(isoFormat) : isoDate;
    }

    public isSame(isoDate: string, isoDateCompare: string, unitOfTime: OpUnitType): boolean {
        const date = dayjs(isoDate, isoFormat, this.locale, true);
        return date.isSame(isoDateCompare, unitOfTime);
    }

    public isValidList(isoDateArray: Array<string>): boolean {
        let date, isoDate;
        let i = 0;
        const len = isoDateArray.length || 0;
        for (i; i < len; i++) {
            isoDate = isoDateArray[i];
            date = dayjs(isoDate, isoFormat, true);
            if (!date.isValid()) {
                return false;
            }
        }
        return true;
    }

    public isValidRange(isoDateArray: Array<string>): boolean {
        if (isoDateArray.length > 2) {
            return false;
        }
        return this.isValidList(isoDateArray);
    }

    public isWithinRange(isoDate: string, minDate?: string, maxDate?: string): boolean {
        if (minDate && dayjs(isoDate).isBefore(minDate)) {
            return false;
        }
        if (maxDate && dayjs(isoDate).isAfter(maxDate)) {
            return false;
        }
        return true;
    }
}

export default DefaultDateTimeMethods;
