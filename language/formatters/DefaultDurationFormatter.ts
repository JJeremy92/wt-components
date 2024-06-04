import { DurationDisplayFormat, DurationFormatter } from './types';

class DefaultDateTimeFormatter implements DurationFormatter {
    public parse(displayDuration: string): string {
        return displayDuration;
    }

    public format(duration: string, preferredFormat: string): string {
        duration = duration.trim();
        if (!duration) {
            return '';
        }

        switch (preferredFormat) {
            case DurationDisplayFormat.DaysAndHoursAndMinutes:
                return this.formatWithDaysAndHoursAndMinutes(duration);
            case DurationDisplayFormat.HoursAndMinutes:
            default:
                return this.formatWithHoursAndMinutes(duration);
        }
    }

    formatWithHoursAndMinutes(duration: string) {
        const matches = /^\s*((\d*)\s*[-/:\\]\s*(\d{0,2})|0+)\s*$/.exec(duration);

        if (matches) {
            const hours = matches[2] ? parseInt(matches[2], 10) : 0;
            const minutes = matches[3] ? parseInt(matches[3], 10) : 0;
            if (minutes > 59) {
                return duration;
            }
            return `${hours}:${minutes.toString().padStart(2, '0')}`;
        }

        const isInvalidDigit = /\D/.exec(duration);

        if (!isInvalidDigit) {
            return `${parseInt(duration, 10)}:00`;
        }

        return duration;
    }

    formatWithDaysAndHoursAndMinutes(duration: string) {
        const [days, hours, minutes] = duration
            .slice()
            .replace(/\s+/g, '')
            .split(/[-/:\\]/);

        let validDays = 0;
        let validHours = 0;
        let validMinutes = 0;

        if (days) {
            const hasNonDigits = /\D/.exec(days);
            if (!hasNonDigits) {
                validDays = Number(days);
            } else {
                return duration;
            }
        }

        if (hours) {
            const hasNonDigits = /\D/.exec(hours);
            if (!hasNonDigits) {
                validHours = Number(hours);
            } else {
                return duration;
            }
        }

        if (minutes) {
            const hasNonDigits = /\D/.exec(minutes);
            if (!hasNonDigits) {
                validMinutes = Number(minutes);
            } else {
                return duration;
            }
        }

        if (Number(validDays) > 99 || Number(validHours) > 23 || Number(validMinutes) > 59) {
            return duration;
        }

        return `${validDays.toString().padStart(1, '0')}:${validHours
            .toString()
            .padStart(2, '0')}:${validMinutes.toString().padStart(2, '0')}`;
    }
}

export default DefaultDateTimeFormatter;
