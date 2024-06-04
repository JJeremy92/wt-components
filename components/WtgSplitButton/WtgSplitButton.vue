<template>
    <div class="wts-split-button">
        <wtg-button :variant="variant" :leading-icon="leadingIcon" class="wts-left-button" @click="onButtonClicked">
            <slot />
        </wtg-button>
        <wtg-popover
            :location="`${openPosition} right`"
            variant="Dropdown"
            :popover-style="
                openPosition === 'top' ? 'margin-bottom: var(--s-spacing-s)' : 'margin-top: var(--s-spacing-s)'
            "
        >
            <template #activator="{ props }: { props: Record<string, any> }">
                <wtg-icon-button
                    icon="$caret-switch"
                    :variant="variant"
                    :class="computedIconButtonClasses"
                    v-bind="props"
                    @click="onDropdownButtonClicked"
                >
                </wtg-icon-button>
            </template>
            <slot name="popover" />
        </wtg-popover>
    </div>
</template>

<script setup lang="ts">
import { PropType, computed, ref, watch } from 'vue';
import { WtgButton } from '../WtgButton';
import { WtgIconButton } from '../WtgIconButton';
import { WtgPopover } from '../WtgPopover';

const props = defineProps({
    variant: { type: String as PropType<'primary' | 'ghost'>, default: undefined },
    isOpen: { type: Boolean, default: false },
    openPosition: { type: String as PropType<'top' | 'bottom'>, default: 'bottom' },
    leadingIcon: { type: String, default: undefined },
    title: { type: String, default: undefined },
    items: { type: Array<{ caption: string }>, default: () => [] },
});

const isOpenRef = ref(false);

const computedIconButtonClasses = computed(() => [
    {
        'wts-dropdown-button-active-primary': isOpenRef.value && props.variant === 'primary',
        'wts-dropdown-button-active-default': isOpenRef.value && props.variant !== 'primary',
    },
    'wts-dropdown-button',
]);

const emit = defineEmits(['click', 'dropdown-click']);

const onDropdownButtonClicked = (e: MouseEvent) => {
    isOpenRef.value = !isOpenRef.value;
    emit('dropdown-click', e);
};

const onButtonClicked = (e: MouseEvent) => {
    emit('click', e);
};

watch(
    () => props.isOpen,
    (newValue: any) => {
        isOpenRef.value = newValue;
    }
);
</script>

<style lang="scss">
.wts-split-button {
    display: inline-flex;
    align-items: flex-start;

    .wts-left-button {
        border-radius: var(--s-radius-s) var(--s-radius-null) var(--s-radius-null) var(--s-radius-s);
        border-right: 0;
    }

    .wts-dropdown-button {
        border-radius: var(--s-radius-null) var(--s-radius-s) var(--s-radius-s) var(--s-radius-null);
    }

    .wts-dropdown-button-active-primary {
        background: var(--s-primary-bg-active);
        border-color: var(--s-primary-bg-active);
    }

    .wts-dropdown-button-active-default {
        background: var(--s-neutral-bg-default);
        border-color: var(--s-neutral-border-weak-active);
        color: var(--s-neutral-txt-active);
        box-shadow: var(--s-elevation-button-default);
    }
}

.wts-dropdown-popup-item {
    display: flex;
    padding: var(--s-padding-null) var(--s-padding-xl);
    align-items: center;
    cursor: pointer;
    min-height: 40px;
    font-family: Inter;
    font-size: var(--s-font-size-300);
    font-style: normal;

    &:hover {
        background: var(--s-neutral-bg-weak-hover);
        border-color: var(--s-neutral-border-weak-hover);
        color: var(--s-neutral-txt-hover);
    }
    &:active {
        background: var(--s-neutral-bg-default);
        border-color: var(--s-neutral-border-weak-active);
        color: var(--s-neutral-txt-active);
    }
}

.wts-dropdown-popup-header {
    display: flex;
    padding: var(--s-padding-null) var(--s-padding-xl);
    align-items: center;
    min-height: 40px;
    font: var(--s-body-strong);
    font-weight: var(--s-font-weights-600);
    line-height: var(--s-line-heights-300);
}
</style>
