import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/nl';
import 'dayjs/locale/ko';
import 'dayjs/locale/fr';

dayjs.extend(customParseFormat);

const supportedLocales = ['de', 'en', 'fr', 'ko', 'nl'];

function supportedLocale(code: string): string {
    const i = code.indexOf('-');
    const language = i >= 0 ? code.substr(0, i) : code;
    return supportedLocales.includes(language) ? language : 'en';
}

export { supportedLocale };
export default dayjs;
