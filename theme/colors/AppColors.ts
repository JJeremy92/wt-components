import { AppColorOptions } from './types';
import AppBarColors from './AppBarColors';
import FooterColors from './FooterColors';
import NavigationDrawerColors from './NavigationDrawerColors';

class AppColors {
    readonly background?: string;
    readonly contentBackground?: string;
    readonly color?: string;
    readonly appBar: AppBarColors;
    readonly footer: FooterColors;
    readonly navigationDrawer: NavigationDrawerColors;

    constructor(options: AppColorOptions = {}, base?: AppColors) {
        this.background = options.background ?? base?.background;
        this.contentBackground = options.contentBackground ?? base?.contentBackground;
        this.color = options.color ?? base?.color;
        this.appBar = new AppBarColors(options.appBar, base?.appBar);
        this.footer = new FooterColors(options.footer, base?.footer);
        this.navigationDrawer = new NavigationDrawerColors(
            options.navigationDrawer,
            base?.navigationDrawer
        );
    }
}

export default AppColors;
