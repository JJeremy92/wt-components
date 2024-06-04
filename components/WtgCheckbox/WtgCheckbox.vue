<template>
    <div :class="computedClass">
        <div :class="computedSelectionControlClass">
            <input :id="computedId" :aria-checked="internalValue ? 'true' : 'false'" type="checkbox" :disabled="disabled" :checked="internalValue" @change="onChange" />
            <wtg-icon class="wts-selection-control-icon">{{ computedIcon }}</wtg-icon>
        </div>
        <label :for="computedId">
            {{ label }}
        </label>
    </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch } from 'vue';
import { WtgIcon } from '../WtgIcon';

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    indeterminate: {
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
const internalIndeterminate = ref(props.indeterminate || false);

const emit = defineEmits(['update:indeterminate', 'update:modelValue']);

const change = (newValue: boolean) => {
    if (internalValue.value !== newValue || internalIndeterminate.value) {
        internalValue.value = newValue;
        if (internalIndeterminate.value) {
            internalIndeterminate.value = false;
            emit('update:indeterminate', internalIndeterminate.value);
        }
        emit('update:modelValue', internalValue.value);
    }
};

const onChange = (e: Event) => {
    change((e.target as HTMLInputElement).checked);
};

watch(
    () => props.modelValue,
    (newValue: any) => {
        internalValue.value = newValue;
    }
);

watch(
    () => props.indeterminate,
    (newValue: any) => {
        internalIndeterminate.value = newValue;
    }
);

const computedClass = computed(() => ({
    'wts-checkbox': true,
    'wts-disabled': props.disabled,
}));

const computedSelectionControlClass = computed(() => ({
    'wts-selection-control': true,
    'wtg-checkbox-indeterminate': props.indeterminate,
    'wtg-checkbox-default': !internalValue.value && !props.indeterminate,
    'wtg-checkbox-selected': internalValue.value && !props.indeterminate,
}));

const instance = getCurrentInstance();
const computedId = computed(() => props.id || `checkbox-${instance!.uid}`);

const computedIcon = computed(() => {
    if (internalIndeterminate.value) {
        return '$checkbox-indeterminate';
    } else if (internalValue.value) {
        return '$checkbox-on';
    } else {
        return '$checkbox-off';
    }
});
</script>

<style lang="scss">
.wts-checkbox {
    display: flex;
    flex: 1 1 auto;
    max-width: 100%;
    padding: var(--s-padding-s) var(--s-padding-null);
    align-items: center;
    gap: var(--s-spacing-s);

    label {
        font: var(--s-label);
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

            &:disabled + i {
                color: var(--s-neutral-icon-disabled);
                pointer-events: none;
            }

            &:focus-visible + i {
                border-radius: var(--radius-s, 4px);
                outline: 2px solid var(--s-primary-border-default);
                outline-offset: 1px;
            }
        }
    }

    &.wts-disabled label {
        color: var(--s-neutral-icon-disabled);
        pointer-events: none;
    }

    .wtg-checkbox-default > i {
        &:hover {
            color: var(--s-neutral-icon-hover);
        }
    }

    .wtg-checkbox-selected > i {
        color: var(--s-primary-border-default);
        &:hover {
            color: var(--s-primary-icon-hover);
        }
    }

    .wtg-checkbox-indeterminate > i {
        color: var(--s-neutral-icon-default);
        &:hover {
            color: var(--s-neutral-icon-hover);
        }
    }
}
</style>
