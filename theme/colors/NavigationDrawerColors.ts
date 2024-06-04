import { NavigationDrawerColorOptions } from './types';

class NavigationDrawerColors {
    readonly background?: string;
    readonly dark?: boolean;

    constructor(options: NavigationDrawerColorOptions = {}, base?: NavigationDrawerColors) {
        this.background = options.background ?? base?.background;
        this.dark = options.dark ?? base?.dark;
    }
}

export default NavigationDrawerColors;
