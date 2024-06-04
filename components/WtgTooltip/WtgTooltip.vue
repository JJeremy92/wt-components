<template>
    <div class="wtg-tooltip">
        <slot />
        <div v-if="text" :class="computedClass">
            <span class="wtg-tooltip-text">{{ text }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    text: {
        type: String,
        default: '',
    },
    right: {
        type: Boolean,
        default: false,
    },
    left: {
        type: Boolean,
        default: false,
    },
    top: {
        type: Boolean,
        default: false,
    },
    bottom: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const computedClass = computed(() => ({
    'wtg-tooltip-disabled': props.disabled,
    'wtg-tooltip-right': props.right,
    'wtg-tooltip-left': props.left,
    'wtg-tooltip-top': props.top,
    'wtg-tooltip-bottom': props.bottom,
    'wtg-tooltip-container': true,
}));
</script>

<style lang="scss">
.wtg-tooltip {
    position: relative !important;

    &:hover {
        .wtg-tooltip-container:not(.wtg-tooltip-disabled) {
            opacity: 1;
        }
    }

    $width: calc(100% - 5px);
    .wtg-tooltip-container {
        display: inline-flex;
        padding: var(--s-padding-m);
        justify-content: center;
        align-items: center;
        gap: var(--s-spacing-s);
        border-radius: var(--s-radius-s);
        background: var(--s-neutral-bg-inv-default);

        box-shadow: 0px 1px 1px 1px rgba(17, 17, 16, 0.06), 0px -1px 1px 0px rgba(17, 17, 16, 0.12) inset;
        color: var(--s-neutral-txt-inv-default);
        font: var(--s-label);

        opacity: 0;
        transition: opacity 0.25s;
        position: absolute;
        z-index: 1;
        margin: 5px;

        .wtg-tooltip-text {
            text-wrap: nowrap;
        }

        &.wtg-tooltip-right {
            top: -20%;
            left: auto;
        }

        &.wtg-tooltip-left {
            top: -20%;
            right: 100%;
        }

        &.wtg-tooltip-top {
            bottom: 100%;
            left: calc($width * -1);
            margin-left: 95%;
        }

        &.wtg-tooltip-bottom {
            top: 100%;
            left: calc($width * -1);
            margin-left: 95%;
        }
    }

    .wtg-tooltip-disabled {
        pointer-events: none;
    }
}
</style>
