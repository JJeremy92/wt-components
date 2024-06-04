import { PanelColorOptions } from './types';

class PanelColors {
    readonly caption?: string;

    constructor(options: PanelColorOptions = {}, base?: PanelColors) {
        this.caption = options.caption ?? base?.caption;
    }
}

export default PanelColors;
