import { Locale } from './types';

const locale: Locale = Object.freeze({
    name: 'English (Australia)',
    dateFormat: 'DD-MMM-YY',
    digitGroupSeparator: ',',
    decimalCharacter: '.',
    digitalGroupSpacing: '3',
    firstDayOfWeek: 1,
    timeFormat: '24hr',
});

export default locale;
