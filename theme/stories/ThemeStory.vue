<template>
    <div>
        <WtgButton color="primary">Button</WtgButton>
    </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import WtgButton from '../../components/WtgButton/WtgButton.vue';
import { useWtgUi } from '../../composables/global';

const props = defineProps({
    color: {
        type: String,
        default: undefined,
    },
});

const wtgUi = useWtgUi();

watchEffect(() =>
    wtgUi.installTheme({
        colors: {
            light: {
                primary: props.color,
            },
        },
    })
);
</script>
