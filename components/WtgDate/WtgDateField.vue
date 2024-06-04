<template>
    <wtg-text-field
        :label="label"
        :leading-icon="leadingIcon"
        :leading-inner-icon="leadingInnerIcon"
        trailing-inner-icon="$calendar-blank"
        :messages="messages"
        :is-valid="isValid"
        :is-warning="isWarning"
        :is-invalid="isInvalid"
        :is-disabled="isDisabled"
        :is-read-only="isReadOnly"
        :is-loading="isLoading"
        :value="displayValue"
        type="wts-date-input"
        class="wts-date-field"
        @blur="onChange($event)"
    >
    </wtg-text-field>
</template>
<script setup lang="ts">
import { Ref, ref, onMounted, watch } from 'vue';
import WtgTextField from '../WtgTextField';
import { inputProps } from '../../composables/input';
import { useLocale } from '../../composables/locale';
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    monthYearOnly: {
        type: Boolean,
        default: undefined,
    },
    formatter: {
        type: Object,
        default: undefined,
    },
    ...inputProps,
});

const { dateFormatter, locale } = useLocale();

const displayValue: Ref<string> = ref('');
const internalValue: Ref<string> = ref('');

const emit = defineEmits<{
    (event: 'change', value: string): void;
}>();
const hasPendingChanges = ref(false);

const parsedDateFn = (date: string): string => {
    return props.formatter ? props.formatter.format(date) : dateFormatter.value.parse(date);
};

const formatMonthYear = (date: string): string => {
    const dateArray = date.split('-');
    return dateArray[0] ? `${dateArray[1]}-${dateArray[0]}` : '';
};

const formatDate = (date: string): string => {
    return props.formatter ? props.formatter.formatDate(date) : dateFormatter.value.format(date);
};

const updateValue = (newValue: string, notify: boolean): void => {
    if (internalValue.value !== newValue) {
        internalValue.value = newValue;
        if (notify) {
            emit('change', internalValue.value);
        }
    }
    displayValue.value = props.monthYearOnly ? formatMonthYear(internalValue.value) : formatDate(internalValue.value);
    hasPendingChanges.value = false;
};

watch(
    () => props.modelValue,
    (value: string) => {
        updateValue(value, false);
    }
);

watch(locale.value, () => {
    displayValue.value = formatDate(internalValue.value);
});

onMounted(() => {
    updateValue(props.modelValue, false);
});

const onChange = (value: string) => {
    displayValue.value = value;
    let parsedDate = parsedDateFn(value);
    if (props.monthYearOnly) {
        const dateArray = parsedDate.split('-');
        if (dateArray) {
            parsedDate = `${dateArray[0]}-${dateArray[1]}`;
        }
    }
    updateValue(parsedDate, true);
};
</script>

<style lang="scss">
.wts-date-field {
    input[type='wts-date-input'] {
        min-width: 100%;
        &:focus {
            outline: none !important;
        }
    }
}
</style>
