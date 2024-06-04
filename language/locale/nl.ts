import { Locale } from './types';

const locale: Locale = Object.freeze({
    name: 'Dutch',
    dateFormat: 'DD-MMM-YYYY',
    digitGroupSeparator: '.',
    decimalCharacter: ',',
    digitalGroupSpacing: '3',
    firstDayOfWeek: 1,
    timeFormat: '24hr'
});

export default locale;
