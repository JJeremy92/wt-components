import Colors from './colors';
import Controls from './controls';
import { ThemeOptions } from './types';

class Theme {
    readonly options: ThemeOptions;
    readonly colors: Colors;
    readonly controls: Controls;
    readonly supplyVersion: number;
    readonly logoLightImage: string;
    readonly logoDarkImage: string;
    readonly logoLightImageFileType: string;
    readonly logoDarkImageFileType: string;

    constructor(options: ThemeOptions = {}, base?: Theme) {
        this.options = options;
        this.colors = new Colors(options.colors, base?.colors);
        this.controls = new Controls(options.controls, base?.controls);
        this.supplyVersion = options?.supplyVersion ?? base?.supplyVersion ?? 0;
        this.logoLightImage = options?.logoLightImage ?? base?.logoLightImage ?? '';
        this.logoDarkImage = options?.logoDarkImage ?? base?.logoDarkImage ?? '';
        this.logoLightImageFileType = options?.logoLightImageFileType ?? base?.logoLightImageFileType ?? '';
        this.logoDarkImageFileType = options?.logoDarkImageFileType ?? base?.logoDarkImageFileType ?? '';
    }

    toVuetifyOptions(): any {
        return {
            themes: this.colors.toVuetifyOptions(),
        };
    }
}

export default Theme;
