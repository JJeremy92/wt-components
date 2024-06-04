<template>
    <div :class="computedClass">
        <wtg-icon v-if="computedIcon">{{ computedIcon }}</wtg-icon>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { WtgIcon } from '../WtgIcon';
const props = defineProps({
    type: {
        type: String,
        default: '',
    },
    customIcon: {
        type: String,
        default: undefined,
    },
});

const computedIcon = computed(() => {
    let icon = undefined;
    switch (props.type) {
        case 'error':
            icon = '$status-critical';
            break;
        case 'warning':
            icon = '$status-warning';
            break;
        case 'success':
            icon = '$status-success';
            break;
        case 'info':
            icon = '$info-circle';
            break;
        case 'custom':
            icon = props.customIcon;
            break;
    }
    return icon;
});

const computedClass = computed(() => [
    {
        'wtg-badge-custom': props.type === 'custom',
        'wtg-badge-info': props.type === 'info',
        'wtg-badge-success': props.type === 'success',
        'wtg-badge-warning': props.type === 'warning',
        'wtg-badge-error': props.type === 'error',
        'wtg-badge-notification': props.type === 'notification',
    },
    'wtg-badge',
]);
</script>

<style lang="scss">
.wtg-badge {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    height: var(--s-sizing-m);
    width: var(--s-sizing-m);
    padding: var(--s-padding-xs);

    border-radius: var(--s-radius-xxl);

    &.wtg-badge-notification {
        height: var(--s-sizing-xs);
        width: var(--s-sizing-xs);
        padding: var(--s-padding-null);
        background: var(--s-error-bg-default);
        border: 1px solid var(--s-neutral-bg-default);
    }

    &.wtg-badge-error {
        color: var(--s-error-icon-weak-default);
        background: var(--s-error-bg-weak-default);
    }

    &.wtg-badge-warning {
        color: var(--s-warning-icon-weak-default);
        background: var(--s-warning-bg-weak-default);
    }

    &.wtg-badge-success {
        color: var(--s-success-icon-weak-default);
        background: var(--s-success-bg-weak-default);
    }

    &.wtg-badge-info {
        color: var(--s-info-icon-weak-default);
        background: var(--s-info-bg-weak-default);
    }

    &.wtg-badge-custom {
        color: var(--s-primary-icon-weak-default);
        background: var(--s-primary-bg-weak-default);
    }
}
</style>
