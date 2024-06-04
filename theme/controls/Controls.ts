import Button from './button';
import { ControlOptions } from './types';

class Controls {
    readonly button: Button;

    constructor(options: ControlOptions = {}, base?: Controls) {
        this.button = new Button(options.button, base?.button);
    }
}

export default Controls;
