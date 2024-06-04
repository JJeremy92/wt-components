export interface ColorOptions {
    light?: ColorVariantOptions;
    dark?: ColorVariantOptions;
}

export interface ColorVariantOptions {
    primary?: string;
    secondary?: string;
    accent?: string;
    critical?: string;
    info?: string;
    success?: string;
    warning?: string;
    app?: AppColorOptions;
    controls?: ControlColorOptions;
}

export interface FoundationOptions {
    primary: string;
    secondary: string;
    accent?: string;
    critical: string;
    info: string;
    success: string;
    warning: string;
}

export interface FoundationPalette {
    color100: string;
    color200: string;
    color300: string;
    color400: string;
    color500: string;
    color600: string;
    color700: string;
    color800: string;
    color900: string;
}

export interface FoundationTokens {
    colorBgInvDefault: string;
    colorBgHover: string;
    colorBgActive: string;
    colorBgDisabled: string;
    colorBgWeakDefault: string;
    colorBgWeakHover: string;
    colorBgWeakActive: string;
    colorBgWeakDisabled: string;
    colorTxtDefault: string;
    colorTxtHover: string;
    colorTxtActive: string;
    colorTxtDisabled: string;
    colorTxtWeakDefault: string;
    colorTxtWeakHover: string;
    colorTxtWeakActive: string;
    colorTxtWeakDisabled: string;
    colorTxtInvDefault: string;
    colorTxtInvHover: string;
    colorTxtInvActive: string;
    colorTxtInvDisabled: string;
    colorTxtWeakInvDefault: string;
    colorTxtWeakInvHover: string;
    colorTxtWeakInvActive: string;
    colorTxtWeakInvDisabled: string;
    colorIconDefault: string;
    colorIconHover: string;
    colorIconActive: string;
    colorIconDisabled: string;
    colorIconWeakDefault: string;
    colorIconWeakHover: string;
    colorIconWeakActive: string;
    colorIconWeakDisabled: string;
    colorIconInvDefault: string;
    colorIconInvHover: string;
    colorIconInvActive: string;
    colorIconInvDisabled: string;
    colorIconWeakInvDefault: string;
    colorIconWeakInvHover: string;
    colorIconWeakInvActive: string;
    colorIconWeakInvDisabled: string;
    colorBorderDefault: string;
    colorBorderHover: string;
    colorBorderActive: string;
    colorBorderDisabled: string;
    colorBorderWeakDefault: string;
    colorBorderWeakHover: string;
    colorBorderWeakActive: string;
    colorBorderWeakDisabled: string;
}

export interface AppColorOptions {
    background?: string;
    contentBackground?: string;
    color?: string;
    appBar?: AppBarColorOptions;
    footer?: FooterColorOptions;
    navigationDrawer?: NavigationDrawerColorOptions;
}

export interface AppBarColorOptions {
    background?: string;
    dark?: boolean;
}

export interface FooterColorOptions {
    background?: string;
    dark?: boolean;
}

export interface NavigationDrawerColorOptions {
    background?: string;
    dark?: boolean;
}

export interface ControlColorOptions {
    icon?: IconColorOptions;
    chart?: ChartColorOptions;
    dataTable?: DataTableColorOptions;
    panel?: PanelColorOptions;
}

export interface ChartColorOptions {
    background?: string;
    backdrop?: string;
    border?: string;
    grid?: string;
    text?: string;
    ticks?: string;
}

export interface DataTableColorOptions {
    headerBackground?: string;
    mouseOverBackground?: string;
    selectionBackground?: string;
    zebraStripeBackground?: string;
}

export interface IconColorOptions {
    color?: string;
}

export interface PanelColorOptions {
    caption?: string;
}
