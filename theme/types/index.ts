import { ColorOptions } from '../colors/types';
import { ControlOptions } from '../controls/types';

export interface ThemeOptions {
    name?: string;
    supplyVersion?: number;
    logoLightImage?: string;
    logoDarkImage?: string;
    logoLightImageFileType?: string;
    logoDarkImageFileType?: string;
    colors?: ColorOptions;
    controls?: ControlOptions;
}
