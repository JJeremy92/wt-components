<template>
    <div :class="computedClass">
        <div :class="computedSelectionControlClass">
            <input :id="computedId" :aria-checked="internalValue ? 'true' : 'false'" :name="name" type="radio" :disabled="disabled" :checked="internalValue" @change="onChange" />
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
    name: {
        type: String,
        default: undefined,
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

watch(
    () => props.modelValue,
    (newValue: any) => {
        internalValue.value = newValue;
    }
);

const computedClass = computed(() => ({
    'wts-radio': true,
    'wts-disabled': props.disabled,
}));

const computedSelectionControlClass = computed(() => ({
    'wts-selection-control': true,
    'wtg-radio-default': !internalValue.value,
    'wtg-radio-selected': internalValue.value,
}));

const instance = getCurrentInstance();
const computedId = computed(() => props.id || `radio-${instance!.uid}`);

const computedIcon = computed(() => {
    if (internalValue.value) {
        return '$radio-on';
    } else {
        return '$radio-off';
    }
});
</script>

<style lang="scss">
.wts-radio {
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

        input[type='radio'] {
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

    .wtg-radio-default i {
        &:hover {
            color: var(--s-neutral-icon-hover);
        }
    }

    .wtg-radio-selected i {
        color: var(--s-primary-border-default);
        &:hover {
            color: var(--s-primary-icon-hover);
        }
    }
}
</style>
