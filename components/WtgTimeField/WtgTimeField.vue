<template>
    <wtg-text-field
        :label="label"
        :leading-icon="leadingIcon"
        :leading-inner-icon="leadingInnerIcon"
        trailing-inner-icon="$time"
        :messages="messages"
        :is-valid="isValid"
        :is-warning="isWarning"
        :is-invalid="isInvalid"
        :is-disabled="isDisabled"
        :is-read-only="isReadOnly"
        :is-loading="isLoading"
        :value="displayValue"
        type="wts-time-input"
        class="wts-time-field"
        @blur="onChange($event)"
        @input="onInput($event)"
    >
    </wtg-text-field>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import WtgTextField from '../WtgTextField';
import { inputProps } from '../../composables/input';
import { useLocale } from '../../composables/locale';

const props = defineProps({
    value: {
        type: String,
        default: '',
    },
    formatter: {
        type: Object,
        default: undefined,
    },
    useSeconds: {
        type: Boolean,
        default: false,
    },
    ...inputProps,
});

const internalValue = ref<string>('');
const displayValue = ref<string>('');
const hasPendingChanges = ref(false);

const emit = defineEmits<{
    (event: 'change', value: string): void;
}>();

const { timeFormatter, locale } = useLocale();

const formatTime = (time: string): string => {
    return props.formatter
        ? props.formatter.formatTime(time, props.useSeconds)
        : timeFormatter.value.format(time, props.useSeconds);
};

const parseTime = (time: string): string => {
    return props.formatter
        ? props.formatter.parseTime(time, props.useSeconds)
        : timeFormatter.value.parse(time, props.useSeconds);
};

const updateValue = (newValue: string, notify: boolean): void => {
    if (internalValue.value !== newValue) {
        internalValue.value = newValue;
        if (notify) {
            emit('change', internalValue.value);
        }
    }

    displayValue.value = formatTime(internalValue.value);
    hasPendingChanges.value = false;
};

watch(
    () => props.value,
    (value: string) => {
        updateValue(value, false);
    }
);

watch(locale.value, () => {
    displayValue.value = formatTime(internalValue.value);
});

watch(
    () => props.useSeconds,
    () => {
        displayValue.value = formatTime(internalValue.value);
    }
);

onMounted(() => {
    updateValue(props.value, true);
});

onUnmounted(() => {
    if (hasPendingChanges.value) {
        updateValue(parseTime(displayValue.value), true);
    }
});

const onChange = (value: string) => {
    updateValue(parseTime(value), true);
};

const onInput = (value: string): void => {
    displayValue.value = value;
    hasPendingChanges.value = true;
};
</script>

<style lang="scss">
.wts-time-field {
    input[type='wts-time-input'] {
        min-width: 100%;
        &:focus {
            outline: none !important;
        }
    }
}
</style>
