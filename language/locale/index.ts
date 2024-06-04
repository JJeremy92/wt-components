import enAU from './en-AU';
import enGB from './en-GB';
import enUS from './en-US';
import fr from './fr';
import ko from './ko';
import nl from './nl';
import { Locale } from './types';

export default { 'en-au': enAU, 'en-us': enUS, 'en-gb': enGB, ko, fr, nl } as Record<
    string,
    Locale
>;
