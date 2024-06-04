<template>
    <wtg-button :class="computedClass" :variant="variant" :color="color" @click="onClick">
        <div class="wts-icon-button-container">
            <slot>
                <wtg-icon class="wts-icon-button-icon">{{ icon }}</wtg-icon>
            </slot>
        </div>
    </wtg-button>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { WtgIcon } from '../WtgIcon';
import { WtgButton } from '../WtgButton';

const props = defineProps({
    icon: {
        type: String,
        default: '',
    },
    variant: {
        type: String as PropType<'primary' | 'ghost'>,
        default: undefined,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    color: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['click']);

const onClick = (e: MouseEvent) => emit('click', e);

const computedClass = computed(() => ({
    'wts-icon-button-disabled': props.disabled,
    'wts-icon-button': true,
}));
</script>

<style lang="scss">
.wts-icon-button {
    cursor: pointer;
    display: inline-flex;
    padding: var(--s-padding-s);
    justify-content: center;
    align-items: center;
    gap: var(--s-spacing-xs);

    .wts-icon-button-container {
        display: flex;
        padding: var(--s-padding-xs);
        justify-content: center;
        align-items: center;
    }

    &.wts-icon-button-disabled {
        pointer-events: none;
        background: var(--s-neutral-bg-disabled);
        border-color: var(--s-neutral-bg-disabled);

        &.wts-button-primary {
            .wts-button-shadow {
                box-shadow: none;
            }
        }

        &.wts-button-default {
            .wts-button-shadow {
                box-shadow: none;
            }
        }

        .wts-icon-button-icon {
            color: var(--s-neutral-icon-disabled);
        }
    }
}
</style>
