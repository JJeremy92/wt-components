import { ButtonTypeOptions } from './types';

class ButtonType {
    readonly color?: string;
    readonly dark: boolean;
    readonly depressed: boolean;
    readonly light: boolean;
    readonly rounded: boolean;
    readonly tile: boolean;

    constructor(options: ButtonTypeOptions = {}, base?: ButtonType) {
        this.color = options.color ?? base?.color;
        this.dark = options.dark ?? base?.dark ?? false;
        this.depressed = options.depressed ?? base?.depressed ?? false;
        this.light = options.light ?? base?.light ?? false;
        this.rounded = options.rounded ?? base?.rounded ?? false;
        this.tile = options.tile ?? base?.tile ?? false;
    }
}

export default ButtonType;
