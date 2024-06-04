import { IconColorOptions } from './types';

class IconColors {
    readonly color?: string;

    constructor(options: IconColorOptions = {}, base?: IconColors) {
        this.color = options.color ?? base?.color;
    }
}

export default IconColors;
