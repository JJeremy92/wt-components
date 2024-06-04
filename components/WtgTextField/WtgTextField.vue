<template>
    <wtg-input
        :label="label"
        :leading-icon="leadingIcon"
        :leading-inner-icon="leadingInnerIcon"
        :trailing-inner-icon="trailingInnerIcon"
        :trailing-icon="trailingIcon"
        :messages="messages"
        :is-valid="isValid"
        :is-warning="isWarning"
        :is-invalid="isInvalid"
        :is-disabled="isDisabled"
        :is-read-only="isReadOnly"
        :is-loading="isLoading"
        class="wts-text-field"
    >
        <template #trailingInner><slot name="trailingInner" /></template>
        <input
            :id="id"
            ref="input"
            v-model="internalValue"
            :type="textFieldType"
            :placeholder="placeholder"
            :min="minValue"
            :max="maxValue"
            @focus="onFocus"
            @blur="onBlur"
            @change="onChange"
            @input="onInput"
        />
        <div
            v-if="showDescription"
            style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; display: flex"
        >
            <span style="min-width: 30px; visibility: hidden; flex-shrink: 0; white-space: pre">{{
                internalValue
            }}</span>
            <div
                class="d-flex flex-shrink-0 flex-grow-0 mx-2"
                style="width: 2px; height: 5px; background-color: currentcolor; align-self: end"
            ></div>
            <span> {{ description }}</span>
        </div>
    </wtg-input>
</template>
<script setup lang="ts">
import WtgInput from '../WtgInput';
import { inputProps } from '../../composables/input';
import { watch, ref } from 'vue';
const props = defineProps({
    value: {
        type: [String, Number],
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    showDescription: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        default: '',
    },
    ...inputProps,
});

const input = ref<HTMLElement | null>(null);
defineExpose({
    input
});
const textFieldType = ref(props.type || 'text');
const internalValue = ref(props.value);

const emit = defineEmits(['change', 'focus', 'blur', 'input']);
const onFocus = (e: MouseEvent) => emit('focus', e);
const onChange = () => emit('change', internalValue.value);
const onInput = () => emit('input', internalValue.value);
const onBlur = () => emit('blur', internalValue.value);

watch(
    () => props.value,
    (value: number | string) => {
        internalValue.value = value;
    }
);
</script>
<style lang="scss">
.wts-text-field {
    input[type='text'] {
        min-width: 100%;
        &:focus {
            outline: none;
        }
    }
}
</style>
