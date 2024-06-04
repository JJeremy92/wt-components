import { AppBarColorOptions } from './types';

class AppBarColors {
    readonly background?: string;
    readonly dark?: boolean;

    constructor(options: AppBarColorOptions = {}, base?: AppBarColors) {
        this.background = options.background ?? base?.background;
        this.dark = options.dark ?? base?.dark;
    }
}

export default AppBarColors;
