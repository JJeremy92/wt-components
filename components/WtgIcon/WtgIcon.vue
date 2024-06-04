<template>
    <i :aria-hidden="true" :class="[computeClasses(), sizeClass]" :style="{ ...computedStyle }" />
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { sizeProps, useSize } from '../../composables/size';
const slots = useSlots();

const props = defineProps({
    color: { type: String, default: undefined },
    icon: { type: String, default: undefined },
    ...sizeProps,
});

const { sizeClass } = useSize(props, 'icon');

const computeClasses = () => {
    const classes = ['wts-icon'];
    const iconName =
        props.icon ||
        (slots.default && typeof slots.default()[0].children === 'string'
            ? (slots.default()[0].children! as string).trim()
            : '');

    if (iconName.startsWith('$')) {
        classes.push(`s-icon-${iconName.substring(1)}`);
    }

    return classes;
};

const computedStyle = computed(() => {
    return {
        color: props.color,
    };
});
</script>
<style lang="scss">
.wts-icon {
    display: inline-flex;
    font-size: var(--s-sizing-m);
    height: var(--s-sizing-m);
    width: var(--s-sizing-m);

    &.wts-icon-xs {
        font-size: var(--s-sizing-xs);
        height: var(--s-sizing-xs);
        width: var(--s-sizing-xs);
    }

    &.wts-icon-s {
        font-size: var(--s-sizing-s);
        height: var(--s-sizing-s);
        width: var(--s-sizing-s);
    }

    &.wts-icon-m {
        font-size: var(--s-sizing-m);
        height: var(--s-sizing-m);
        width: var(--s-sizing-m);
    }

    &.wts-icon-l {
        font-size: var(--s-sizing-l);
        height: var(--s-sizing-l);
        width: var(--s-sizing-l);
    }

    &.wts-icon-xl {
        font-size: var(--s-sizing-xl);
        height: var(--s-sizing-xl);
        width: var(--s-sizing-xl);
    }

    &.wts-icon-xxl {
        font-size: var(--s-sizing-xxl);
        height: var(--s-sizing-xxl);
        width: var(--s-sizing-xxl);
    }
}
</style>
