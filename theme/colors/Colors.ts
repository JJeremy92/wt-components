import ColorVariant from './ColorVariant';
import { ColorOptions } from './types';

class Colors {
    readonly light: ColorVariant;
    readonly dark: ColorVariant;

    constructor(options: ColorOptions = {}, base?: Colors) {
        this.light = new ColorVariant(options.light, base?.light);
        this.dark = new ColorVariant(options.dark, base?.dark);
    }

    toVuetifyOptions(): any {
        return {
            light: this.light.toVuetifyOptions(),
            dark: this.dark.toVuetifyOptions(),
        };
    }
}

export default Colors;
