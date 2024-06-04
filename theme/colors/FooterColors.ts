import { FooterColorOptions } from './types';

class FooterColors {
    readonly background?: string;
    readonly dark?: boolean;

    constructor(options: FooterColorOptions = {}, base?: FooterColors) {
        this.background = options.background ?? base?.background;
        this.dark = options.dark ?? base?.dark;
    }
}

export default FooterColors;
