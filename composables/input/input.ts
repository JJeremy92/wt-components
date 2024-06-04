import { PropType } from 'vue';

export const inputProps = {
    id: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: '',
    },
    messages: {
        type: Array as PropType<string[]>,
        default: (): string[] => [],
    },
    leadingInnerIcon: {
        type: String,
        default: '',
    },
    trailingInnerIcon: {
        type: String,
        default: '',
    },
    leadingIcon: {
        type: String,
        default: '',
    },
    trailingIcon: {
        type: String,
        default: '',
    },
    isValid: {
        type: Boolean,
        default: false,
    },
    isWarning: {
        type: Boolean,
        default: false,
    },
    isInvalid: {
        type: Boolean,
        default: false,
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    isReadOnly: {
        type: Boolean,
        default: false,
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
    minValue: {
        type: [Number, undefined] as PropType<number | undefined>,
        default: undefined,
    },
    maxValue: {
        type: [Number, undefined] as PropType<number | undefined>,
        default: undefined,
    },
};

export enum statusIcons {
    IsValidIcon = '$status-success',
    IsInvalidIcon = '$status-critical',
    IsWarningIcon = '$status-warning',
}
