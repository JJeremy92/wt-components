import { DataTableColorOptions } from './types';

class DataTableColors {
    readonly headerBackground?: string;
    readonly mouseOverBackground?: string;
    readonly selectionBackground?: string;
    readonly zebraStripeBackground?: string;

    constructor(options: DataTableColorOptions = {}, base?: DataTableColors) {
        this.headerBackground = options.headerBackground ?? base?.headerBackground;
        this.mouseOverBackground = options.mouseOverBackground ?? base?.mouseOverBackground;
        this.selectionBackground = options.selectionBackground ?? base?.selectionBackground;
        this.zebraStripeBackground = options.zebraStripeBackground ?? base?.zebraStripeBackground;
    }
}

export default DataTableColors;
