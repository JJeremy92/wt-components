import { ChartColorOptions } from './types';

class ChartColors {
    readonly background?: string;
    readonly backdrop?: string;
    readonly border?: string;
    readonly grid?: string;
    readonly text?: string;
    readonly ticks?: string;

    constructor(options: ChartColorOptions = {}, base?: ChartColors) {
        this.background = options.background ?? base?.background;
        this.backdrop = options.backdrop ?? base?.backdrop;
        this.border = options.border ?? base?.border;
        this.grid = options.grid ?? base?.grid;
        this.text = options.text ?? base?.text;
        this.ticks = options.ticks ?? base?.ticks;
    }
}

export default ChartColors;
