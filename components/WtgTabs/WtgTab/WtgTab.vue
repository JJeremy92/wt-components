<template>
    <div>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { inject, onMounted, PropType, useSlots } from 'vue';
import { registerTabFunctionKey } from '../keys';
import { WtgTabData } from '../types';

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    hasNotification: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: '',
    },
    number: {
        type: [Number, undefined] as PropType<number | undefined>,
        default: undefined,
    },
});
const registerTabFunction = inject<(tab: WtgTabData) => void>(registerTabFunctionKey);
const slots = useSlots();

onMounted(() => {
    if (registerTabFunction) {
        registerTabFunction({
            props,
            content: slots.default,
        });
    }
});
</script>
