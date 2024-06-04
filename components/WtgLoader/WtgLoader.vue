<template>
    <wtg-icon class="wts-loader" :size="size" :color="color"> $spinner </wtg-icon>
</template>

<script setup lang="ts">
import { sizeProps } from '../../composables/size';
import { WtgIcon } from '../WtgIcon';
defineProps({
    ...sizeProps,
    color: {
        type: String,
        default: undefined,
    },
});
</script>

<style>
.wts-loader {
    animation: rotation infinite 3s linear;
    display: flex;
    align-items: center;
    position: absolute;
}

@keyframes rotation {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
