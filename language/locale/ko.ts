import { Locale } from './types';

const locale: Locale = Object.freeze({
    name: 'Korean',
    dateFormat: 'DD-MMM-YYYY',
    digitGroupSeparator: ',',
    decimalCharacter: '.',
    digitalGroupSpacing: '3',
    firstDayOfWeek: 0,
    timeFormat: 'ampm'
});

export default locale;
