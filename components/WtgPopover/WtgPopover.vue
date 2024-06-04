<template>
    <template v-if="modelValue !== undefined">
        <v-menu
            :location="location"
            :close-on-content-click="closeOnContentClick"
            :model-value="modelValue"
            :transition="transition"
            @update:model-value="onUpdateModelValue"
        >
            <template #activator="{ props, isActive }: { props: Record<string, any>, isActive: Boolean }">
                <slot name="activator" :props="props" :is-active="isActive"></slot>
            </template>
            <template #default="{ isActive }: { isActive: Ref<Boolean> }">
                <div id="popoverContainer" :style="popoverStyle" :class="popoverClasses">
                    <slot :is-active="isActive" />
                </div>
            </template>
        </v-menu>
    </template>
    <template v-else>
        <v-menu :location="location" :close-on-content-click="closeOnContentClick" :transition="transition">
            <template #activator="{ props, isActive }: { props: Record<string, any>, isActive: Boolean }">
                <slot name="activator" :props="props" :is-active="isActive"></slot>
            </template>
            <template #default="{ isActive }: { isActive: Ref<Boolean> }">
                <div id="popoverContainer" :style="popoverStyle" :class="popoverClasses">
                    <slot :is-active="isActive" />
                </div>
            </template>
        </v-menu>
    </template>
</template>

<script setup lang="ts">
import { VMenu } from 'vuetify/components/VMenu';
import { PropType, Ref, computed, Component, TransitionProps } from 'vue';

type Tblock = 'top' | 'bottom';
type Tinline = 'start' | 'end' | 'left' | 'right';
type Anchor =
    | Tblock
    | Tinline
    | 'center'
    | 'center center'
    | `${Tblock} ${Tinline | 'center'}`
    | `${Tinline} ${Tblock | 'center'}`;

const props = defineProps({
    location: {
        type: String as PropType<Anchor>,
        default: 'bottom right',
    },
    popoverStyle: {
        type: String,
        default: '',
    },
    variant: {
        type: String as PropType<'Pop over' | 'Dropdown'>,
        default: 'Pop over',
    },
    elevation: {
        type: String as PropType<'100' | '200' | '300'>,
        default: '100',
    },
    modelValue: {
        type: Object as PropType<boolean | undefined>,
        default: undefined,
    },
    transition: {
        type: Object as PropType<
            string | boolean | { component: Component } | (TransitionProps & { component: Component })
        >,
        default: undefined,
    },
});

const closeOnContentClick = computed(() => props.variant === 'Dropdown');
const popoverClasses = computed(() => [
    {
        'wts-popover': props.variant === 'Pop over',
        'wts-dropdown': props.variant === 'Dropdown',
    },
    `wts-elevation-${props.elevation}`,
]);
const emit = defineEmits(['update:model-value']);
const onUpdateModelValue = (newVal: string) => emit('update:model-value', newVal);
</script>

<style>
.wts-popover {
    padding: var(--s-padding-xl);
    border-radius: var(--s-radius-m);
    border: 1px solid var(--s-neutral-border-weak-default);
    background: var(--s-neutral-bg-default-90a);
    overflow-y: auto;

    &.wts-elevation-100 {
        box-shadow: 0px 2px 4px 0px rgba(17, 17, 16, 0.12), 0px -1px 1px 0px rgba(17, 17, 16, 0.12) inset;
        backdrop-filter: blur(16px);
    }
    &.wts-elevation-200 {
        box-shadow: 0px 4px 8px 0px rgba(17, 17, 16, 0.12), 0px -1px 1px 0px rgba(17, 17, 16, 0.12) inset;
        backdrop-filter: blur(16px);
    }
    &.wts-elevation-300 {
        box-shadow: 0px 8px 16px 0px rgba(17, 17, 16, 0.16), 0px -1px 1px 0px rgba(17, 17, 16, 0.12) inset;
        backdrop-filter: blur(16px);
    }
}

.wts-dropdown {
    padding: var(--s-padding-l);
    border-radius: var(--s-radius-m);
    border: 1px solid var(--s-neutral-border-weak-default);
    background: var(--s-neutral-bg-default-90a);

    &.wts-elevation-100 {
        box-shadow: 0px 1px 1px 1px rgba(17, 17, 16, 0.06), 0px -1px 1px 0px rgba(17, 17, 16, 0.12) inset;
    }

    &.wts-elevation-200 {
        box-shadow: 0px 2px 4px 0px rgba(17, 17, 16, 0.12), 0px -1px 1px 0px rgba(17, 17, 16, 0.12) inset;
    }

    &.wts-elevation-300 {
        box-shadow: 0px 4px 8px 0px rgba(17, 17, 16, 0.16), 0px -1px 1px 0px rgba(17, 17, 16, 0.12) inset;
    }
}
</style>
