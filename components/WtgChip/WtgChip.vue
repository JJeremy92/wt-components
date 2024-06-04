<template>
    <div :class="computedClass">
        <wtg-icon v-if="prependIcon">{{ props.prependIcon }}</wtg-icon>
        <span>{{ label }}</span>
        <wtg-icon v-if="isDismissable" @click="onClick">$close</wtg-icon>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { WtgIcon } from '../WtgIcon';
const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    prependIcon: {
        type: String,
        default: undefined,
    },

    isDismissable: {
        type: Boolean,
        default: false,
    },

    condensed: {
        type: Boolean,
        default: false,
    },

    color: { type: String, default: undefined },
});

const emit = defineEmits(['click']);

const onClick = (e: MouseEvent) => emit('click', e);

const computedClass = computed(() => ({
    'wtg-chip-primary': props.color === 'primary',
    'wtg-chip-info': props.color === 'info',
    'wtg-chip-success': props.color === 'success',
    'wtg-chip-warning': props.color === 'warning',
    'wtg-chip-error': props.color === 'error',
    'wtg-chip-condensed': props.condensed,
    'wtg-chip': true,
}));
</script>

<style lang="scss">
.wtg-chip {
    display: inline-flex;
    padding: var(--s-padding-s);
    justify-content: center;
    align-items: center;
    gap: var(--s-spacing-s);
    font: var(--s-label);

    color: var(--s-neutral-txt-default);
    border-radius: var(--s-radius-s);
    background: var(--s-neutral-bg-weak-default);

    i:last-child {
        cursor: pointer;
    }
}

.wtg-chip-primary {
    color: var(--s-primary-txt-default);
    background: var(--s-primary-bg-weak-default);
    i {
        color: var(--s-primary-icon-default);
    }
}

.wtg-chip-info {
    color: var(--s-info-txt-default);
    background: var(--s-info-bg-weak-default);
    i {
        color: var(--s-info-icon-default);
    }
}

.wtg-chip-success {
    color: var(--s-success-txt-default);
    background: var(--s-success-bg-weak-default);
    i {
        color: var(--s-success-icon-weak-default);
    }
}

.wtg-chip-warning {
    color: var(--s-warning-txt-default);
    background: var(--s-warning-bg-weak-default);
    i {
        color: var(--s-icon-weak-default);
    }
}

.wtg-chip-error {
    color: var(--s-error-txt-default);
    background: var(--s-error-bg-weak-default);
    i {
        color: var(--s-error-icon-weak-default);
    }
}

.wtg-chip-condensed {
    padding: var(--s-padding-xs, 2px) var(--s-padding-s, 4px);
}
</style>
