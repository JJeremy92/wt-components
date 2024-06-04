<template>
    <wtg-navigation />
    <v-app-bar
        :height="57"
        scroll-behavior="elevate"
        style="padding-left: 16px; background-color: var(--s-neutral-bg-default)"
    >
        <wtg-masthead />
    </v-app-bar>
    <wtg-main :style="computedStyle">
        <slot />
    </wtg-main>
</template>

<script setup lang="ts">
import { VAppBar } from 'vuetify/lib/components/index.mjs';
import { computed } from 'vue';
import { WtgMain, WtgMasthead } from '../components';
import { useLayout } from 'vuetify/lib/framework.mjs';
import WtgNavigation from '../components/WtgNavigation/WtgNavigation.vue';

const { mainRect } = useLayout();

const computedStyle = computed(() => {
    let styles: Record<string, string> = {};
    const { top, right, left } = mainRect.value;
    styles = {
        paddingTop: `${top}px`,
        paddingRight: `${right + 4}px`,
        paddingLeft: `${left + 12}px`,
        paddingBottom: '8px',
    };
    return styles;
});
</script>

<style>
.v-navigation-drawer {
    margin-left: 8px;
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 8px;
    height: calc(100vh - 16px) !important;
    background-color: var(--s-primary-bg-default);
}
</style>
