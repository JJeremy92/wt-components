import { ComputedRef, inject } from 'vue';

type WtgApplication = {
    title: ComputedRef<string>;
    portalCode: ComputedRef<string>;
};

export const useApplication = () => {
    const application = inject<WtgApplication>('framework');
    return application;
};
