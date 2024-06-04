<template>
    <div :style="measurableStyles" :class="panelClasses">
        <div v-if="caption" class="wts-panel-caption">
            {{ caption }}
        </div>
        <wtg-layout-grid v-if="layout === 'grid'" id="content" :class="layoutClasses" :no-gutters="noGutters">
            <slot />
        </wtg-layout-grid>
        <div v-if="slots.default" class="wts-panel-content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { layoutGridColumnProps, useLayoutGridColumn } from '../../composables/layoutGridColumn/layoutGridColumn';
import { layoutProps, useLayout } from '../../composables/layoutGrid';
import { useMeasure, measureProps } from '../../composables/measure';
import { useSlots, computed } from 'vue';
import { WtgLayoutGrid } from '../WtgLayoutGrid';

const props = defineProps({
    caption: {
        type: String,
        default: '',
    },
    fitToHeight: {
        type: Boolean,
        default: false,
    },
    ...measureProps,
    ...layoutProps,
    ...layoutGridColumnProps,
});

const { layoutClasses } = useLayout(props);
const { measurableStyles } = useMeasure(props);
useLayoutGridColumn(props);

const panelClasses = computed(() => ({
    'wts-panel-fit-to-height': props.fitToHeight,
    'wts-panel': true,
}));

const slots = useSlots();
</script>

<style lang="scss">
.wts-panel {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 1 0;
    gap: var(--s-spacing-xl, 16px);
    border-radius: var(--s-radius-m, 8px);
    border: 1px solid var(--s-neutral-border-weak-default, rgba(71, 71, 70, 0.3));
    background: var(--s-neutral-bg-default, #fff);
    box-shadow: 0px 1px 1px 1px rgba(17, 17, 16, 0.06), 0px -1px 1px 0px rgba(17, 17, 16, 0.12) inset;
    padding: var(--s-padding-xl, 16px);

    &-fit-to-height {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    &-caption {
        color: var(--s-neutral-txt-default, #30302e);
        display: flex;
        font: var(--s-title-small);
    }

    &-content {
        display: flex;
        flex-direction: column;
        align-self: stretch;
        gap: var(--s-spacing-m, 8px);
    }
}
</style>
