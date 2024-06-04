<template>
    <wtg-text-field
        ref="textField"
        class="wts-numeric-text-field"
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
        :min-value="minValue"
        :max-value="maxValue"
        :value="displayValue"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
    />
</template>
<script setup lang="ts">
import { PropType, ref, markRaw, watch, onMounted, onBeforeUnmount } from 'vue';
import WtgTextField from '../WtgTextField';
import { inputProps } from '../../composables/input';
import AutoNumeric from 'autonumeric';
import { useLocale } from '../../composables/locale';
import { autoNumericOptionsFromLocale } from './utils';

const props = defineProps({
    modelValue: {
        type: [String, Number, undefined] as PropType<string | number | undefined>,
        default: undefined,
    },
    placeholder: {
        type: String,
        default: '',
    },
    decimals: {
        type: Number,
        default: 0,
    },
    noDigitGrouping: {
        type: Boolean,
        default: false,
    },
    suppressTrailingZeroes: {
        type: Boolean,
        default: false,
    },
    zeroWhenEmpty: {
        type: Boolean,
        default: false,
    },
    ...inputProps,
});

const emit = defineEmits(['change', 'input', 'focus', 'blur', 'update:modelValue']);

const textField = ref<InstanceType<typeof WtgTextField> | null>(null);
const nonReactive = markRaw<{ autoNumeric?: AutoNumeric }>({});
const displayValue = ref('');
const internalValue = ref<string | number>('');
const hasPendingChanges = ref(false);

const { locale } = useLocale();

const updateDisplayValue = (): void => {
    displayValue.value = internalValue.value.toString();
    if (nonReactive.autoNumeric) {
        nonReactive.autoNumeric.set(displayValue.value);
        displayValue.value = nonReactive.autoNumeric.getFormatted();
    }
};

const updateInternalValue = (): void => {
    let newValue = '';

    const currentValue = typeof props.modelValue === 'string' ? parseInt(props.modelValue) : props.modelValue;

    if (currentValue != null && !isNaN(currentValue) && isFinite(currentValue)) {
        newValue = currentValue.toString();
    }

    internalValue.value = newValue;
    updateDisplayValue();
};

const initAutoNumeric = () => {
    if (nonReactive.autoNumeric) {
        nonReactive.autoNumeric.remove();
        nonReactive.autoNumeric = undefined;
    }

    const { modelValue, decimals, noDigitGrouping, minValue, maxValue, suppressTrailingZeroes, zeroWhenEmpty } = props;

    const defaultValue = modelValue !== null && isFinite(Number(modelValue)) ? modelValue : '';
    const options = autoNumericOptionsFromLocale(locale.value, {
        decimals,
        noDigitGrouping,
        minValue,
        maxValue,
        suppressTrailingZeroes,
        zeroWhenEmpty,
    });

    if (textField?.value?.input) {
        nonReactive.autoNumeric = new AutoNumeric(textField?.value?.input, defaultValue, options);
    }

    updateInternalValue();
};

const isNullOrEmpty = (value: string): boolean => {
    return typeof value !== 'string' || !value.length;
};

const regexpEscape = (value: string): string => {
    if (isNullOrEmpty(value)) {
        return '';
    }

    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const unformatString = (value: string): string => {
    // Cannot use autoNumeric.unformatOther because it is buggy and does not work with larger values.
    return value
        .replace(new RegExp(regexpEscape(locale.value.digitGroupSeparator), 'g'), '')
        .replace(new RegExp(regexpEscape(locale.value.decimalCharacter), 'g'), '.')
        .replace(/\.0+$/, '');
};

const commitValue = (value: string) => {
    if (nonReactive.autoNumeric) {
        const { minValue, maxValue } = props;
        const inputString = unformatString(value);
        const committedString = nonReactive.autoNumeric.getNumericString();

        if (committedString !== inputString) {
            nonReactive.autoNumeric.set(inputString);
        }

        const numericString = nonReactive.autoNumeric.getNumericString() || '';
        let isAdjusted = false;

        if (numericString === '') {
            nonReactive.autoNumeric.set(numericString);

            internalValue.value = numericString;
        } else {
            let newValue = Number(numericString);

            if (isNaN(newValue)) {
                newValue = 0;
                isAdjusted = true;
            }

            if (minValue !== undefined) {
                const _minValue = Number(minValue);
                if (!isNaN(minValue) && newValue < _minValue) {
                    newValue = _minValue;
                    isAdjusted = true;
                }
            }

            if (maxValue !== undefined) {
                const _maxValue = Number(maxValue);
                if (!isNaN(_maxValue) && newValue > _maxValue) {
                    newValue = _maxValue;
                    isAdjusted = true;
                }
            }

            if (isAdjusted) {
                nonReactive.autoNumeric.set(newValue);
            }

            internalValue.value = newValue;
        }
        emit('input', internalValue.value);
        emit('update:modelValue', internalValue.value);

        updateDisplayValue();
        hasPendingChanges.value = false;
    }
};

const onInput = (value: string | null) => {
    displayValue.value = value ?? '';
    hasPendingChanges.value = true;
};

const onChange = (value: string | null) => {
    displayValue.value = value ?? '';
    commitValue(displayValue.value);
    emit('change', internalValue.value);
};

const onFocus = (e: MouseEvent) => {
    emit('focus', e);
};

const onBlur = (e: MouseEvent) => {
    emit('blur', e);
};

watch(
    () => [
        props.decimals,
        props.minValue,
        props.maxValue,
        props.noDigitGrouping,
        props.suppressTrailingZeroes,
        props.zeroWhenEmpty,
        locale.value,
    ],
    () => {
        initAutoNumeric();
    }
);

watch(
    () => props.modelValue,
    () => {
        updateInternalValue();
    }
);

onMounted(() => {
    initAutoNumeric();
});

onBeforeUnmount(() => {
    if (nonReactive.autoNumeric) {
        if (hasPendingChanges.value) {
            commitValue(displayValue.value);
        }
        nonReactive.autoNumeric.remove();
    }
});

updateInternalValue();
</script>
<style lang="scss">
.wts-numeric-text-field {
    input[type='number'] {
        min-width: 100%;
        &:focus {
            outline: none !important;
        }
    }
}
</style>
