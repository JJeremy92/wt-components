import { computed, ref } from 'vue';
import { useWtgUi } from '../global';
import { CaptionProvider } from '../../language/captions/types';
import { Locale } from '../../language/locale/types';
import {
    DateFormatter,
    DateRangeFormatter,
    DateTimeFormatter,
    DateTimeMethods,
    DurationFormatter,
    TimeFormatter,
} from '../../language/formatters/types';

export const useLocale = () => {
    const $wtgUi = useWtgUi();

    const abbrevationRanges = [
        { upperLimit: 1e3 },
        { upperLimit: 1e6, scale: (value: number) => value / 1e3, suffix: 'K' },
        { upperLimit: 1e9, scale: (value: number) => value / 1e6, suffix: 'M' },
        { upperLimit: 1e12, scale: (value: number) => value / 1e9, suffix: 'B' },
        { upperLimit: 1e15, scale: (value: number) => value / 1e12, suffix: 'T' },
    ];

    const roundDownToNearestTenth = (value: number): number => Math.floor(10 * value) / 10;

    const captionProvider = computed<CaptionProvider>(() => {
        return $wtgUi.language.captions.provider;
    });

    const languageCode = computed<string>(() => {
        return $wtgUi.language.current.value;
    });

    const locale = computed<Locale>(() => {
        return $wtgUi.language.locale;
    });

    const dateFormatter = computed<DateFormatter>(() => {
        return $wtgUi.language.dateFormatter;
    });

    const dateRangeFormatter = computed<DateRangeFormatter>(() => {
        return $wtgUi.language.dateRangeFormatter;
    });
    const dateTimeFormatter = computed<DateTimeFormatter>(() => {
        return $wtgUi.language.dateTimeFormatter;
    });
    const dateTimeMethods = computed<DateTimeMethods>(() => {
        return $wtgUi.language.dateTimeMethods;
    });
    const durationFormatter = computed<DurationFormatter>(() => {
        return $wtgUi.language.durationFormatter;
    });

    const timeFormatter = computed<TimeFormatter>(() => {
        return $wtgUi.language.timeFormatter;
    });

    const formatCaption = (key: string, ...params: Array<string | number>): string => {
        return (
            captionProvider.value(languageCode, key, params) ?? captionProvider.value(ref('en-AU'), key, params) ?? ''
        );
    };

    const abbreviateNumber = (value: number): string => {
        if (isNaN(value)) {
            return '';
        }

        const multiplier = value < 0 ? -1 : 1;
        const absValue = Math.abs(value);

        for (let i = 0; i < abbrevationRanges.length; i++) {
            const range = abbrevationRanges[i];
            if (absValue < range.upperLimit) {
                if (!range.scale) {
                    return value.toString();
                }

                const scaled = range.scale(absValue);

                return (
                    multiplier * (scaled >= 100 ? Math.floor(scaled) : roundDownToNearestTenth(scaled)) + range.suffix
                );
            }
        }

        return value < 0 ? '<-1Q' : '>1Q';
    };

    return {
        abbreviateNumber,
        formatCaption,
        languageCode,
        locale,
        dateFormatter,
        dateTimeMethods,
        dateRangeFormatter,
        dateTimeFormatter,
        timeFormatter,
        durationFormatter,
    };
};
