import dayjs, { supportedLocale } from './dayjs';
import { Locale } from '../locale/types';
import { dateInputFormats } from './DefaultDateFormatter';
import { timeInputFormats, timeDisplayFormat } from './DefaultTimeFormatter';
import { DateTimeFormatter } from './types';

function getDateTimeInputFormats(dsmsy: string): string[] {
    const dateFormats = dateInputFormats(dsmsy);
    const timeFormats = timeInputFormats();
    const dateTimeFormats = [];

    for (const dateFormat of dateFormats) {
        for (const timeFormat of timeFormats) {
            dateTimeFormats.push(dateFormat + ' ' + timeFormat);
        }
        dateTimeFormats.push(dateFormat);
    }
    return dateTimeFormats.concat(timeFormats);
}

class DefaultDateTimeFormatter implements DateTimeFormatter {
    private readonly locale: string;
    private readonly dateFormat: string;
    private readonly timeFormat: string;
    private readonly inputFormats: string[];

    constructor(languageCode: string, locale: Locale) {
        this.locale = supportedLocale(languageCode);
        this.dateFormat = locale.dateFormat;
        this.timeFormat = locale.timeFormat;
        this.inputFormats = getDateTimeInputFormats(this.dateFormat);
    }

    public parse(displayDate: string): string {
        let date = dayjs(displayDate, this.inputFormats, this.locale, true);
        if (!date.isValid()) {
            date = dayjs(displayDate, this.inputFormats, this.locale, false);
        }
        return date.isValid() ? date.toISOString() : displayDate;
    }

    public format(isoDateTime: string, useSeconds: boolean): string {
        const date = dayjs(isoDateTime);
        return date.isValid()
            ? date.locale(this.locale).format(this.displayFormat(useSeconds))
            : isoDateTime;
    }

    private displayFormat(useSeconds: boolean): string {
        return this.dateFormat + ' ' + timeDisplayFormat(useSeconds, this.timeFormat);
    }
}

export default DefaultDateTimeFormatter;
