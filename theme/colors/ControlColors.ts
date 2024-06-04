import { ControlColorOptions } from './types';
import IconColors from './IconColors';
import ChartColors from './ChartColors';
import DataTableColors from './DataTableColors';
import PanelColors from './PanelColors';

class ControlColors {
    readonly icon: IconColors;
    readonly chart: ChartColors;
    readonly dataTable: DataTableColors;
    readonly panel: PanelColors;

    constructor(options: ControlColorOptions = {}, base?: ControlColors) {
        this.icon = new IconColors(options.icon, base?.icon);
        this.chart = new ChartColors(options.chart, base?.chart);
        this.dataTable = new DataTableColors(options.dataTable, base?.dataTable);
        this.panel = new PanelColors(options.panel, base?.panel);
    }
}

export default ControlColors;
