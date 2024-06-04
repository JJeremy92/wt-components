import { Locale } from '../locale/types';
import dayjs, { supportedLocale } from './dayjs';
import { TimeFormatter } from './types';

const valueFormatHHMM = 'HH:mm';
const valueFormatHHMMSS = 'HH:mm:ss';
const valueFormats = [valueFormatHHMMSS, valueFormatHHMM];

function valueFormat(useSeconds: boolean): string {
    return useSeconds ? valueFormatHHMMSS : valueFormatHHMM;
}

const displayFormatHHMM = 'HH:mm';
const displayFormatHHMMSS = 'HH:mm:ss';
const displayFormatHHMMA = 'hh:mm A';
const displayFormatHHMMSSA = 'hh:mm:ss A';
export function timeDisplayFormat(useSeconds: boolean, timeFormat: string): string {
    if (timeFormat === 'ampm') {
        return useSeconds ? displayFormatHHMMSSA : displayFormatHHMMA;
    }
    return useSeconds ? displayFormatHHMMSS : displayFormatHHMM;
}

export function timeInputFormats(): string[] {
    const inputFormats: string[] = [];
    for (const a of ['a', 'A']) {
        for (const h of ['h', 'hh']) {
            for (const m of ['m', 'mm']) {
                for (const s of ['s', 'ss']) {
                    inputFormats.push(`${h}:${m}:${s} ${a}`);
                }
                inputFormats.push(`${h}:${m} ${a}`);
            }
            inputFormats.push(`${h} ${a}`);
        }
    }
    for (const h of ['H', 'HH']) {
        for (const m of ['m', 'mm']) {
            for (const s of ['s', 'ss']) {
                inputFormats.push(`${h}:${m}:${s}`);
            }
            inputFormats.push(`${h}:${m}`);
        }
        inputFormats.push(`${h}`);
    }

    return inputFormats;
}

class DefaultTimeFormatter implements TimeFormatter {
    private readonly locale: string;
    private readonly timeFormat: string;
    private readonly inputFormats: string[];

    constructor(languageCode: string, locale: Locale) {
        this.locale = supportedLocale(languageCode);
        this.timeFormat = locale.timeFormat;
        this.inputFormats = timeInputFormats();
    }

    public parse(displayTime: string, useSeconds: boolean): string {
        let time = dayjs(displayTime.toLowerCase(), this.inputFormats, this.locale, true);
        if (!time.isValid()) {
            time = dayjs(displayTime.toLowerCase(), this.inputFormats, this.locale, false);
        }
        return time.isValid() ? time.format(valueFormat(useSeconds)) : displayTime;
    }

    public format(time: string, useSeconds: boolean): string {
        const date = dayjs(time, valueFormats, true);
        return date.isValid()
            ? date.locale(this.locale).format(this.displayFormat(useSeconds))
            : time;
    }

    public now(useSeconds: boolean): string {
        const now = dayjs();
        return now.format(valueFormat(useSeconds));
    }

    public isValid(time: string): boolean {
        const date = dayjs(time, valueFormats, true);
        return date.isValid();
    }

    private displayFormat(useSeconds: boolean): string {
        return timeDisplayFormat(useSeconds, this.timeFormat);
    }
}

export default DefaultTimeFormatter;
