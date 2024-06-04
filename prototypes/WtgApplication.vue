<template>
    <wtg-app>
        <ResponsiveApp><slot /></ResponsiveApp>
    </wtg-app>
</template>

<script setup lang="ts">
import ResponsiveApp from './ResponsiveApp.vue';
import WtgApp from '../components/WtgApp/WtgApp.vue';
import { provide, computed } from 'vue';
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    portalCode: {
        type: String,
        default: '',
    },
});

const application = {
    title: computed(() => props.title),
    portalCode: computed(() => props.portalCode),
};
provide('framework', application);
</script>
