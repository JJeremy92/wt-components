<template>
    <div :class="computedClass">
        <div :class="computedSelectionControlClass">
            <input :id="computedId" :aria-checked="internalValue ? 'true' : 'false'" type="checkbox" :disabled="disabled" :checked="internalValue" @change="onChange" />
            <div class="wtg-switch-container" @click="onClick">
                <div class="wtg-switch-track">
                    <div class="wtg-switch-thumb"></div>
                </div>
            </div>
        </div>
        <label :for="computedId">
            {{ label }}
        </label>
    </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch } from 'vue';

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    id: {
        type: String,
        default: undefined,
    },
    label: {
        type: String,
        default: '',
    },
    modelValue: {
        type: [Boolean],
        default: false,
    },
});
const internalValue = ref(props.modelValue);

const emit = defineEmits(['update:modelValue']);

const change = (newValue: boolean) => {
    if (internalValue.value !== newValue) {
        internalValue.value = newValue;
        emit('update:modelValue', internalValue.value);
    }
};

const onChange = (e: Event) => {
    change((e.target as HTMLInputElement).checked);
};

const onClick = () => {
    change(!internalValue.value);
};

watch(
    () => props.modelValue,
    (newValue: any) => {
        internalValue.value = newValue;
    }
);

const computedClass = computed(() => ({
    'wts-switch': true,
    'wts-disabled': props.disabled,
}));

const computedSelectionControlClass = computed(() => ({
    'wts-selection-control': true,
    'wtg-switch-default': !internalValue.value,
    'wtg-switch-selected': internalValue.value,
}));

const instance = getCurrentInstance();
const computedId = computed(() => props.id || `switch-${instance!.uid}`);
</script>

<style lang="scss">
.wts-switch {
    display: flex;
    flex: 1 1 auto;
    max-width: 100%;
    padding: var(--s-padding-s) var(--s-padding-null);
    align-items: center;
    gap: var(--s-spacing-s);

    label {
        font: var(--s-label);
    }

    .wtg-switch-container {
        display: flex;
        align-items: flex-start;

        .wtg-switch-track {
            width: var(--s-sizing-xl);
            height: var(--s-sizing-m);
            border-radius: var(--s-radius-m);
            border: 1px solid var(--s-neutral-border-default);
            background: var(--s-neutral-bg-default);
            display: inline-flex;
            position: relative;
        }

        .wtg-switch-thumb {
            left: -1px;
            top: -1px;
            width: var(--s-sizing-m);
            height: var(--s-sizing-m);
            position: absolute;
            border-radius: var(--s-radius-xxl);
            border: 1px solid var(--s-neutral-border-default);
            background: var(--s-neutral-bg-default);
            transition: left 0.25s;
        }
    }

    .wts-selection-control {
        display: inline-flex;
        flex: 0 0 auto;
        position: relative;

        input[type='checkbox'] {
            position: absolute;
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            user-select: none;

            &:disabled {
                pointer-events: none;
            }

            &:focus-visible {
                + .wtg-switch-container {
                    .wtg-switch-track {
                        outline: 2px solid var(--s-primary-border-default);
                        outline-offset: 1px;
                    }
                }
            }

            &:checked {
                + .wtg-switch-container {
                    display: flex;
                    align-items: flex-start;
                    .wtg-switch-track {
                        border-radius: var(--s-radius-m);
                        border: 1px solid var(--s-primary-border-default);
                        background: var(--s-primary-bg-weak-default);
                    }

                    .wtg-switch-thumb {
                        position: absolute;
                        left: calc(50% - 1px);
                        border-radius: var(--s-radius-xxl);
                        border: 1px solid var(--s-primary-border-default);
                        background: var(--s-primary-bg-default);
                    }
                }
            }
        }
    }

    &.wts-disabled label {
        color: var(--s-neutral-icon-disabled);
        pointer-events: none;
    }

    &.wts-disabled .wts-selection-control {
        .wtg-switch-container {
            pointer-events: none;

            .wtg-switch-track {
                border: 1px solid var(--s-neutral-border-disabled) !important;
                background: var(--s-neutral-bg-weak-disabled) !important;
            }

            .wtg-switch-thumb {
                border: 1px solid var(--s-neutral-border-disabled) !important;
                background: var(--s-neutral-bg-disabled) !important;
            }
        }
    }
}
</style>
