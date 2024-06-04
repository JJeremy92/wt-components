<template>
    <div :class="computedClass" :style="computedAlertStyle">
        <div class="wts-alert-icon-container">
            <wtg-icon>{{ computedIcon }}</wtg-icon>
        </div>
        <div class="wts-alert-container">
            <div v-if="title && variant !== 'inline'" class="wts-alert-title">
                {{ titleText }}
            </div>
            <div class="wts-alert-description" :style="computedFontStyle">
                {{ description }}
            </div>
        </div>
        <div v-if="isDismissible && variant !== 'inline'" class="wts-alert-close-icon-container" @click="emit('close')">
            <wtg-icon>$close</wtg-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { WtgIcon } from '../WtgIcon';

const props = defineProps({
    color: {
        type: String,
        default: '',
    },
    variant: {
        type: String as PropType<'inline'>,
        default: undefined,
    },
    title: {
        type: Boolean,
        default: false,
    },
    isDismissible: {
        type: Boolean,
        default: false,
    },
    titleText: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
});

const computedIcon = computed(() => {
    let icon = '';
    switch (props.color) {
        case 'info':
            icon = '$info-circle';
            break;
        case 'success':
            icon = '$status-success';
            break;
        case 'warning':
            icon = '$status-warning';
            break;
        case 'error':
            icon = '$status-critical';
            break;
    }

    return icon;
});

const computedAlertStyle = computed(() => {
    if (props.variant !== 'inline') {
        return { padding: 'var(--s-padding-m)' };
    } else {
        return {
            padding: 'var(--s-padding-null)',
            boxShadow: 'none',
            border: 'none',
            background: 'none',
        };
    }
});

const computedFontStyle = computed(() => {
    if (props.variant !== 'inline') {
        return { font: 'var(--s-label)' };
    } else {
        return { font: 'var(--s-microcopy)' };
    }
});

const computedClass = computed(() => ({
    'wts-alert-info': props.color === 'info',
    'wts-alert-success': props.color === 'success',
    'wts-alert-warning': props.color === 'warning',
    'wts-alert-error': props.color === 'error',
    'wts-alert': true,
}));

const emit = defineEmits(['close']);
</script>

<style lang="scss">
.wts-alert {
    display: flex;
    align-items: center;
    gap: var(--s-spacing-s);
    border-radius: var(--s-radius-s);
    box-shadow: 0px 1px 1px 1px rgba(17, 17, 16, 0.06), 0px -1px 1px 0px rgba(17, 17, 16, 0.12) inset;

    .wts-alert-icon-container {
        display: flex;
        align-items: flex-start;
        gap: var(--padding-null);
        width: auto;
        height: 100%;
        align-self: stretch;
    }

    .wts-alert-container {
        width: 100%;
        .wts-alert-title {
            font: var(--s-label-strong);
            align-self: stretch;
        }

        .wts-alert-description {
            color: var(--s-neutral-txt-default);
            align-self: stretch;
        }
    }

    .wts-alert-close-icon-container {
        display: flex;
        align-items: flex-start;
        gap: var(--padding-null);
        width: auto;
        height: 100%;
        align-self: stretch;
        &:hover {
            opacity: 0.5;
            cursor: pointer;
        }
    }

    &.wts-alert-info {
        .wts-alert-title {
            color: var(--s-info-txt-default);
        }

        .wts-alert-icon-container {
            color: var(--s-info-icon-default);
        }

        .wts-alert-close-icon-container {
            color: var(--s-info-icon-default);
        }

        border: 1px solid var(--s-info-border-weak-default);
        background: var(--s-info-bg-weak-default);
    }

    &.wts-alert-success {
        .wts-alert-title {
            color: var(--s-success-txt-default);
        }

        .wts-alert-icon-container {
            color: var(--s-success-icon-default);
        }

        .wts-alert-close-icon-container {
            color: var(--s-success-icon-default);
        }

        border: 1px solid var(--s-success-border-weak-default);
        background: var(--s-success-bg-weak-default);
    }

    &.wts-alert-warning {
        .wts-alert-title {
            color: var(--s-warning-txt-default);
        }

        .wts-alert-icon-container {
            color: var(--s-warning-icon-default);
        }

        .wts-alert-close-icon-container {
            color: var(--s-warning-icon-default);
        }

        border: 1px solid var(--s-warning-border-weak-default);
        background: var(--s-warning-bg-weak-default);
    }

    &.wts-alert-error {
        .wts-alert-title {
            color: var(--s-error-txt-default);
        }

        .wts-alert-icon-container {
            color: var(--s-error-icon-default);
        }

        .wts-alert-close-icon-container {
            color: var(--s-error-icon-default);
        }

        border: 1px solid var(--s-error-border-weak-default);
        background: var(--s-error-bg-weak-default);
    }
}
</style>
