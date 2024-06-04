<template>
    <div :class="computedClass">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue';
import { useWtgUi } from '../../composables/global';

const props = defineProps({
    dark: {
        type: Boolean,
        default: false,
    },
    light: {
        type: Boolean,
        default: false,
    },
});
const wtgUi = useWtgUi();
const darkMode = computed<boolean>(() => {
    if (props.dark) {
        return true;
    } else if (props.light) {
        return false;
    }
    return wtgUi?.dark;
});
const computedClass = computed(() => (darkMode.value ? 'wts-theme-provider-dark' : 'wts-theme-provider-light'));
provide('darkMode', darkMode);
</script>
