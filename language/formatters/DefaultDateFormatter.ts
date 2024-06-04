import dayjs, { supportedLocale } from './dayjs';
import { Locale } from '../locale/types';
import { DateFormatter } from './types';

const isoFormat = 'YYYY-MM-DD';
const isoMonthYearFormat = 'YYYY-MM';

export function dateInputFormats(dsmsy: string): string[] {
    const inputFormats = [];

    // All versions of D-M-YY (with seperators)
    const dsm = dsmsy.replace(/y+[^MD]|[^MD]y+/i, '');
    for (const d of ['D', 'DD']) {
        for (const m of ['MMM', 'M', 'MM']) {
            for (const y of ['YYYY', 'YY']) {
                inputFormats.push(dsmsy.replace(/d+/i, d).replace(/m+/i, m).replace(/y+/i, y));
            }

            // All versions of D-M (or M-D in the US)
            inputFormats.push(dsm.replace(/d+/i, d).replace(/m+/i, m));
        }
    }

    // All versions of DDMMYY/DDMMYYYY (without seperators)
    const dmy = dsmsy.replaceAll(/[^DMY]/gi, '');
    for (const y of ['YYYY', 'YY']) {
        inputFormats.push(dmy.replace(/d+/i, 'DD').replace(/m+/i, 'MM').replace(/y+/i, y));
    }

    // DDMM (or MMDD in the US)
    const dm = dmy.replaceAll(/[Y]/g, '');
    inputFormats.push(dm.replace(/D+/, 'DD').replace(/M+/, 'MM'));

    // Just days or years
    inputFormats.push('D');
    inputFormats.push('DD');
    inputFormats.push('YY');
    inputFormats.push('YYYY');
    inputFormats.push('MM-YYYY');

    return inputFormats;
}

class DefaultDateFormatter implements DateFormatter {
    private readonly locale: string;
    private readonly displayFormat: string;
    private readonly inputFormats: string[];

    constructor(languageCode: string, locale: Locale) {
        this.locale = supportedLocale(languageCode);
        this.displayFormat = locale.dateFormat;
        this.inputFormats = dateInputFormats(this.displayFormat);
    }

    public parse(displayDate: string): string {
        let date = dayjs(displayDate, this.inputFormats, this.locale, true);
        if (!date.isValid()) {
            date = dayjs(displayDate, this.inputFormats, this.locale, false);
        }
        return date.isValid() ? date.format(isoFormat) : displayDate;
    }

    public format(isoDate: string): string {
        const date = dayjs(isoDate, isoFormat, true);
        return date.isValid() ? date.locale(this.locale).format(this.displayFormat) : isoDate;
    }

    public today(): string {
        const now = dayjs();
        return now.format(isoFormat);
    }

    public isValid(isoDate: string): boolean {
        const date = dayjs(isoDate, isoFormat, true);
        return date.isValid();
    }

    public isValidMonthYear(isoMonthYearDate: string): boolean {
        const date = dayjs(isoMonthYearDate, isoMonthYearFormat, true);
        return date.isValid();
    }
}

export default DefaultDateFormatter;
