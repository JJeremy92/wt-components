<template>
    <span style="font: var(--s-title); color: var(--s-neutral-txt-default)">
        {{ darkMode ? 'Dark Mode' : 'Light Mode' }}
    </span>
</template>

<script setup lang="ts">
import { useTheme } from '../../../composables/theme';

const { darkMode } = useTheme();
</script>
