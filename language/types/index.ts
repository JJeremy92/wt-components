import { CaptionProvider } from '../captions/types';
import {
    DateFormatter,
    DateRangeFormatter,
    DateTimeFormatter,
    DateTimeMethods,
    DurationFormatter,
    TimeFormatter,
} from '../formatters/types';

export interface LanguageOptions {
    current?: string;
    captionProvider?: CaptionProvider;
    dateFormatter?: DateFormatter;
    dateRangeFormatter?: DateRangeFormatter;
    dateTimeFormatter?: DateTimeFormatter;
    dateTimeMethods?: DateTimeMethods;
    durationFormatter?: DurationFormatter;
    timeFormatter?: TimeFormatter;
}
