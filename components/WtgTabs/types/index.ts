import { Slot } from 'vue';

export type WtgTabData = {
    props?: {
        label?: string;
        disabled?: boolean;
        number?: number;
        hasNotification?: boolean;
    };
    content?: Slot;
};
