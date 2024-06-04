<template>
    <div>
        <WtgAlert color="error" :description="formatCaption('imagePicker.invalidFileError')" />
    </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useLocale } from '../../composables/locale';
import { useWtgUi } from '../../composables/global';
import { WtgAlert } from '../../components/WtgAlert';

const props = defineProps({
    locale: {
        type: String,
        default: 'en',
    },
});

const { formatCaption } = useLocale();
const wtgUi = useWtgUi();
watchEffect(() => {
    wtgUi.language.current = props.locale;
});
</script>
