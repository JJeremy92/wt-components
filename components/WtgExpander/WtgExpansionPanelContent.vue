<template>
    <div class="content" :style="{ height: computeHeight() }">
        <div ref="content" class="slot-wrapper">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject, Ref } from 'vue';
import { openKey } from './keys';

const content = ref<HTMLElement | null>(null);
const open = inject<Ref<boolean>>(openKey);
const computeHeight = () => {
    if (content.value === null || open === undefined || !open.value) {
        return '0px';
    }
    return `${8 + content.value.scrollHeight}px`;
};
</script>
