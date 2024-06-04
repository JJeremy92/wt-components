import { ComputedRef } from 'vue';

export type RegisterPanel = {
    isPanelOpen: ComputedRef<boolean>;
    togglePanel: () => void;
};
