export interface ButtonOptions {
    contained?: ButtonTypeOptions;
    icon?: ButtonTypeOptions;
    outlined?: ButtonTypeOptions;
    text?: ButtonTypeOptions;
}

export interface ButtonTypeOptions {
    color?: string;
    dark?: boolean;
    depressed?: boolean;
    light?: boolean;
    rounded?: boolean;
    tile?: boolean;
}
