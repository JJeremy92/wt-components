import { ColorVariantOptions, FoundationOptions } from './colors/types';

const defaultFoundationLight: FoundationOptions = {
    primary: '#0022CC',
    success: '#0C6E22',
    info: '#6E0A87',
    warning: '#FF6F00',
    critical: '#E4130C',
    secondary: '#0F2A46',
    accent: '#524834',
};

const defaultFoundationDark = {
    primary: '#7486DC',
    success: '#52A075',
    info: '#AF80BE',
    warning: '#C98104',
    critical: '#F16251',
    secondary: '#0F2A46',
    accent: '#a29b8d',
};

function colorsFromFoundationContrast(foundation: FoundationOptions): ColorVariantOptions {
    return {
        primary: foundation.primary,
        secondary: foundation.secondary,
        accent: foundation.accent || '',
        success: foundation.success,
        info: foundation.info,
        warning: foundation.warning,
        critical: foundation.critical,
    };
}

export function colorsFromFoundation(
    foundationLight?: FoundationOptions,
    foundationDark?: FoundationOptions
): { light: ColorVariantOptions; dark: ColorVariantOptions } {
    return {
        light: colorsFromFoundationContrast(foundationLight ?? defaultFoundationLight),
        dark: colorsFromFoundationContrast(foundationDark ?? defaultFoundationDark),
    };
}
