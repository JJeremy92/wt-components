<template>
    <div>
        <WtgPanel :caption="`It is currently ${formattedDate}`">
            <div style="display: flex; justify-content: space-between">
                <div style="gap: 8px; display: flex; justify-content: center; align-items: center">
                    <WtgIcon style="">$calendar-blank</WtgIcon>
                    <span style="font: var(--s-body)">{{ dateFormatter.format(dateFormatter.today()) }}</span>
                </div>
                <div style="gap: 8px; display: flex; justify-content: center; align-items: center">
                    <span style="font: var(--s-body)">{{
                        dateTimeFormatter.format(new Date().toISOString(), true)
                    }}</span>
                </div>
                <div style="gap: 8px; display: flex; justify-content: center; align-items: center">
                    <WtgIcon style="">$time</WtgIcon>
                    <span style="font: var(--s-body)">{{ timeFormatter.format(timeFormatter.now(true), true) }}</span>
                </div>
            </div>
        </WtgPanel>
    </div>
</template>

<script setup lang="ts">
import { watchEffect, computed } from 'vue';
import { useLocale } from '../../composables/locale';
import { useWtgUi } from '../../composables/global';
import { WtgPanel } from '../../components/WtgPanel';
import { WtgIcon } from '../../components/WtgIcon';

const props = defineProps({
    locale: {
        type: String,
        default: 'en',
    },
});

const { dateFormatter, timeFormatter, dateTimeFormatter } = useLocale();
const wtgUi = useWtgUi();

const formattedDate = computed(() => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    } as Intl.DateTimeFormatOptions;

    return Intl.DateTimeFormat(wtgUi.language.current.value, options).format(new Date());
});

watchEffect(() => {
    wtgUi.language.current = props.locale;
});
</script>
