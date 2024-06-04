<template>
    <wtg-text-field
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
        :value="value"
        type="password"
        class="wts-password-text-field"
    ></wtg-text-field>
</template>
<script setup lang="ts">
import WtgTextField from '../WtgTextField';
import { inputProps } from '../../composables/input';

defineProps({
    value: {
        type: [String, Number],
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    ...inputProps,
});
</script>
<style lang="scss">
.wts-password-text-field {
    input[type='password'] {
        min-width: 100%;
        &:focus {
            outline: none;
        }
    }
}
</style>
