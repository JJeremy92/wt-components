import dayjs from './dayjs';
import { Locale } from '../locale/types';
import { DateRangeFormatter } from './types';
import DefaultDateFormatter from './DefaultDateFormatter';

const isoFormat = 'YYYY-MM-DD';

class DefaultDateRangeFormatter implements DateRangeFormatter {
    private readonly dateFormatter: DefaultDateFormatter;
    private readonly separator: string;

    constructor(languageCode: string, locale: Locale) {
        this.dateFormatter = new DefaultDateFormatter(languageCode, locale);
        this.separator = ' - ';
    }

    public parse(displayDateRange: string): string {
        const range = displayDateRange.split(this.separator);
        let result = displayDateRange;
        switch (range.length) {
            case 2:
                result = `${this.dateFormatter.parse(range[0])}${
                    this.separator
                }${this.dateFormatter.parse(range[1])}`;
                break;
            case 1:
                if (this.dateFormatter.isValid(this.dateFormatter.parse(range[0]))) {
                    result = `${this.dateFormatter.parse(range[0])}${
                        this.separator
                    }${this.dateFormatter.parse(range[0])}`;
                }
                break;
        }
        return result;
    }

    public format(isoDateRange: string): string {
        const range = isoDateRange.split(this.separator);
        let result = isoDateRange;
        switch (range.length) {
            case 2:
                result = `${this.dateFormatter.format(range[0])}${
                    this.separator
                }${this.dateFormatter.format(range[1])}`;
                break;
            case 1: {
                const date = dayjs(range[0], isoFormat, true);
                if (date.isValid()) {
                    result = `${this.dateFormatter.format(range[0])}${
                        this.separator
                    }${this.dateFormatter.format(range[0])}`;
                }
                break;
            }
        }
        return result;
    }

    public isValid(isoDateRange: string): boolean {
        const range = isoDateRange.split(this.separator);
        let result = false;
        if (range.length === 2) {
            if (this.dateFormatter.isValid(range[0]) && this.dateFormatter.isValid(range[1])) {
                const firstDate = new Date(range[0]);
                const lastDate = new Date(range[1]);
                result = firstDate <= lastDate;
            }
        } else {
            result = this.dateFormatter.isValid(range[0]);
        }
        return result;
    }
}

export default DefaultDateRangeFormatter;
