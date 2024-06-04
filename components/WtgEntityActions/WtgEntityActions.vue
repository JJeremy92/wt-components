<template>
    <div class="wtg-entity-actions" :style="measurableStyles">
        <div v-for="button in internalButtons" :key="button.id">
            <wtg-icon-button
                v-if="isMobile"
                :disabled="button.disabled"
                :icon="button.icon"
                variant="ghost"
                @click="onClick($event, button.id)"
            >
            </wtg-icon-button>
            <wtg-button
                v-else
                :disabled="button.disabled"
                :leading-icon="button.icon"
                variant="ghost"
                type="button"
                @click="onClick($event, button.id)"
            >
                {{ button.label }}
            </wtg-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { computed } from 'vue';
import { measureProps, useMeasure } from '../../composables/measure';
import { WtgButton } from '../WtgButton';
import { WtgIconButton } from '../WtgIconButton';
import { WtgEntityActionsItem } from './types';

const props = defineProps({
    items: {
        type: Array<WtgEntityActionsItem>,
        default: undefined,
    },
    isMobile: {
        type: Boolean,
        default: false,
    },
    ...measureProps,
});
const { measurableStyles } = useMeasure(props);
const internalButtons = computed(
    () =>
        props?.items?.map((button: WtgEntityActionsItem) => ({
            ...button,
            id: button.id ?? uuidv4(),
        })) || []
);

const emit = defineEmits(['click']);
const onClick = (e: MouseEvent, id: string) => emit('click', e, id);
</script>
<style lang="scss">
.wtg-entity-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--s-spacing-xs, 2px);
    border: 1px solid var(--s-neutral-border-weak-default, '#6B6B6880');
    border-radius: var(--s-radius-s, 4px);
    padding: var(--s-padding-s, 4px);
}
</style>
