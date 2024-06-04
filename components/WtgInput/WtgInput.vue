<template>
    <div :class="computedClass">
        <div class="wts-input-label">
            <label :for="id">{{ label }}</label>
        </div>
        <div :id="id" class="wts-input-content">
            <div class="wts-input-leading-outer-content">
                <slot name="leading">
                    <wtg-icon v-if="leadingIcon">{{ leadingIcon }}</wtg-icon>
                </slot>
            </div>
            <div class="wts-input-leading-inner-content">
                <slot name="leadingInner">
                    <wtg-icon v-if="leadingInnerIcon">{{ leadingInnerIcon }}</wtg-icon>
                </slot>
            </div>

            <div class="wts-default-content">
                <slot></slot>
            </div>
            <div class="wts-input-trailing-inner-content">
                <slot name="trailingInner">
                    <wtg-icon v-if="trailingInnerIcon">{{ trailingInnerIcon }}</wtg-icon>
                </slot>
            </div>
            <div class="wts-input-trailing-outer-content">
                <slot name="trailing">
                    <wtg-loader v-if="isLoading" size="m"></wtg-loader>
                    <wtg-icon v-if="computedIcon && !isLoading">{{ computedIcon }}</wtg-icon>
                </slot>
            </div>
        </div>

        <ol v-for="message in messages" :key="message" class="wts-input-messages">
            <li>{{ message }}</li>
        </ol>
    </div>
</template>
<script setup lang="ts">
import { inputProps, statusIcons } from '../../composables/input/input';
import WtgIcon from '../WtgIcon';
import WtgLoader from '../WtgLoader';
import { computed } from 'vue';

const props = defineProps({
    ...inputProps,
});

const computedClass = computed(() => ({
    'wts-input-field-valid': props.isValid,
    'wts-input-field-warning': props.isWarning,
    'wts-input-field-invalid': props.isInvalid,
    'wts-input-field-loading': props.isLoading,
    'wts-input-field-readonly': props.isReadOnly,
    'wts-input-field-disabled': props.isDisabled,
    'wts-input': true,
}));

const computedIcon = computed(() => {
    if (props.isValid) {
        return statusIcons.IsValidIcon;
    } else if (props.isWarning) {
        return statusIcons.IsWarningIcon;
    } else if (props.isInvalid) {
        return statusIcons.IsInvalidIcon;
    } else {
        return props.trailingIcon;
    }
});
</script>
<style lang="scss">
.wts-input {
    display: inline-flex;
    align-content: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: var(--s-padding-s);
    font: var(--s-label);

    .wts-input-label {
        color: var(--supply-neutral-txt-default);
        color: var(--s-neutral-txt-default);
        align-items: flex-start;
        gap: var(--s-padding-xs);
        align-self: stretch;
    }

    .wts-input-leading-inner-content {
        display: flex;
        align-self: center;
        gap: var(--s-padding-s);
        i {
            width: var(--s-sizing-m);
            height: var(--s-sizing-m);
        }
    }

    .wts-input-leading-outer-content {
        display: flex;
        align-self: center;
        gap: var(--s-padding-s);
        i {
            width: var(--s-sizing-m);
            height: var(--s-sizing-m);
        }
    }

    .wts-input-content {
        display: flex;
        padding: var(--s-padding-s) var(--s-padding-m);
        justify-content: flex-end;
        align-items: center;
        gap: var(--s-padding-s);
        align-self: stretch;

        border-radius: var(--s-radius-s);
        border: 1px solid var(--s-neutral-border-weak-default);
        /* elevation.100 */
        box-shadow: 0px 1px 1px 1px rgba(17, 17, 16, 0.06), 0px -1px 1px 0px rgba(17, 17, 16, 0.12) inset;

        .wts-default-content {
            width: 100%;
            display: flex;
            flex: 1 1 auto;
            position: relative;
            align-items: center;

            &:focus {
                outline: none;
            }
        }

        background: var(--s-neutral-bg-default);
        &:hover {
            background: var(--s-neutral-bg-weak-hover);
        }

        &:focus-within {
            outline-offset: 1px;
            outline: 2px solid var(--s-primary-border-default);
        }
    }

    .wts-input-trailing-inner-content {
        display: flex;
        align-self: center;
        gap: var(--s-padding-s);

        i {
            width: var(--s-sizing-m);
            height: var(--s-sizing-m);
        }
    }

    .wts-input-trailing-outer-content {
        display: flex;
        align-self: center;
        gap: var(--s-padding-s);

        i {
            width: var(--s-sizing-m);
            height: var(--s-sizing-m);
        }
    }

    .wts-input-trailing-icon {
        display: flex;
    }

    .wts-input-messages {
        font: var(--s-label);
        list-style-type: none;
    }

    &.wts-input-field-disabled {
        pointer-events: none;
        .wts-input-label {
            color: var(--s-neutral-txt-disabled);
        }
        .wts-input-content {
            background: var(--s-neutral-bg-disabled);
            i {
                color: var(--s-neutral-icon-disabled) !important;
            }
        }
    }

    &.wts-input-field-valid {
        .wts-input-content {
            background: var(--s-success-bg-weak-default);
            &:hover {
                background: var(--s-success-bg-weak-hover);
            }
            i {
                color: var(--s-success-icon-default) !important;
            }
        }
    }

    &.wts-input-field-warning {
        .wts-input-content {
            background: var(--s-warning-bg-weak-default);
            &:hover {
                background: var(--s-warning-bg-weak-hover);
            }
            i {
                color: var(--s-warning-icon-default) !important;
            }
        }
    }

    &.wts-input-field-invalid {
        .wts-input-content {
            background: var(--s-error-bg-weak-default);
            &:hover {
                background: var(--s-error-bg-weak-hover);
            }
            i {
                color: var(--s-error-icon-default) !important;
            }
        }
    }

    &.wts-input-field-loading {
        .wts-input-content {
            pointer-events: none;
            background: var(--s-neutral-bg-disabled);
        }

        .wts-loader {
            position: relative;
        }
    }

    &.wts-input-field-readonly {
        .wts-input-content {
            pointer-events: none;
            background: var(--s-neutral-bg-disabled);
        }
    }
}
</style>
