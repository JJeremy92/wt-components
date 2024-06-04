<template>
    <div :style="measurableStyles" :class="computedClass">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { measureProps, useMeasure } from '../../composables/measure/measure';

const props = defineProps({
    caption: {
        type: String,
        default: undefined,
    },
    fitToHeight: {
        type: Boolean,
        default: false,
    },
    ...measureProps,
});

const computedClass = computed(() => ({
    'wts-container-fit-to-height': props.fitToHeight,
    'wts-container': true,
}));

const { measurableStyles } = useMeasure(props);
</script>

<style lang="scss">
.wts-container {
    &.wts-container-fit-to-height {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow: hidden;
    }
}
</style>
