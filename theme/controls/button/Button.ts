import { ButtonOptions } from './types';
import ButtonType from './ButtonType';

class Button {
    readonly contained: ButtonType;
    readonly icon: ButtonType;
    readonly outlined: ButtonType;
    readonly text: ButtonType;

    constructor(options: ButtonOptions = {}, base?: Button) {
        this.contained = new ButtonType(options.contained, base?.contained);
        this.icon = new ButtonType(options.icon, base?.icon);
        this.outlined = new ButtonType(options.outlined, base?.outlined);
        this.text = new ButtonType(options.text, base?.text);
    }
}

export default Button;
