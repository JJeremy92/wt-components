<template>
    <v-app class="wtg-app">
        <slot />
    </v-app>
</template>

<script setup lang="ts">
import { VApp } from 'vuetify/components/VApp';
</script>

<style lang="scss">
.wtg-app {
    background-color: var(--s-neutral-bg-default);
    color: var(--s-neutral-txt-default);
}
.wtg-bg-primary {
    background: var(--s-primary-bg-default);
}
.wtg-txt-primary {
    color: var(--s-primary-txt-inv-default);
}
</style>
