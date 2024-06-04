import { ColorVariantOptions } from './types';
import AppColors from './AppColors';
import ControlColors from './ControlColors';

class ColorVariant {
    readonly _primary: string;
    readonly _secondary: string;
    readonly _accent: string;
    readonly _critical: string;
    readonly _info: string;
    readonly _success: string;
    readonly _warning: string;
    readonly app: AppColors;
    readonly controls: ControlColors;

    constructor(options: ColorVariantOptions = {}, base?: ColorVariant) {
        this._primary = options.primary ?? base?._primary ?? '';
        this._secondary = options.secondary ?? base?._secondary ?? '';
        this._accent = options.accent ?? base?._accent ?? '';
        this._critical = options.critical ?? base?._critical ?? '';
        this._info = options.info ?? base?._info ?? '';
        this._success = options.success ?? base?._success ?? '';
        this._warning = options.warning ?? base?._warning ?? '';
        this.app = new AppColors(options.app, base?.app);
        this.controls = new ControlColors(options.controls, base?.controls);
    }

    get primary(): string | undefined {
        return this._primary;
    }

    get secondary(): string | undefined {
        return this._secondary;
    }

    get accent(): string | undefined {
        return this._accent;
    }

    get error(): string | undefined {
        return this._critical;
    }

    get info(): string | undefined {
        return this._info;
    }

    get success(): string | undefined {
        return this._success;
    }

    get warning(): string | undefined {
        return this._warning;
    }

    get messageError(): string | undefined {
        return this._warning;
    }

    toVuetifyOptions(): any {
        return {
            colors: {
                primary: this.primary,
                secondary: this.secondary,
                accent: this.accent,
                error: this.error,
                info: this.info,
                success: this.success,
                warning: this.warning,
                messageError: this.messageError,
            },
        };
    }
}

export default ColorVariant;
