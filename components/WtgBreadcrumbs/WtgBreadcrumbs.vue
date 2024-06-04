<template>
    <div class="wts-breadcrumbs">
        <template v-if="items.length">
            <span class="wts-breadcrumbs-item wts-breadcrumbs-item-inactive wts-breadcrumbs-item-font-body-strong">
                <a v-if="items[0].link" :href="items[0].link" style="color: inherit; text-decoration: none">
                    {{ items[0].caption }}
                </a>
                <span v-else>{{ items[0].caption }}</span>
            </span>
        </template>
        <template v-if="items.length === 3">
            <wtg-icon>$forward-slash</wtg-icon>
            <span :class="computedMiddleBreadcrumbItemClasses">
                <a v-if="items[1].link" :href="items[1].link" style="color: inherit">{{ items[1].caption }}</a>
                <span v-else>{{ items[1].caption }}</span>
            </span>
        </template>
        <template v-if="items.length > 3">
            <wtg-icon>$forward-slash</wtg-icon>
            <span :class="computedMiddleBreadcrumbItemClasses" @click="onOverflowMiddleItemsClicked">
                ...
                <div v-if="isOpen" class="wts-overflow-dropdown">
                    <div v-for="middleItem in middleItems" :key="middleItem.caption" class="wts-overflow-dropdown-item">
                        <a v-if="middleItem.link" :href="middleItem.link" style="color: inherit; text-decoration: none">
                            {{ middleItem.caption }}
                        </a>
                        <span v-else>{{ middleItem.caption }}</span>
                    </div>
                </div>
            </span>
        </template>
        <template v-if="items.length >= 2">
            <wtg-icon>$forward-slash</wtg-icon>
            <span class="wts-breadcrumbs-item-active wts-breadcrumbs-item-font-body">
                {{ items[items.length - 1].caption }}
            </span>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { WtgIcon } from '../WtgIcon';
import { WtgBreadcrumbItems } from './types';
const props = defineProps({
    items: { type: Array<WtgBreadcrumbItems>, default: () => [] },
});

const isOpen = ref(false);

const middleItems = computed(() => props.items.slice(1, -1));

const onOverflowMiddleItemsClicked = () => {
    isOpen.value = !isOpen.value;
};

const computedMiddleBreadcrumbItemClasses = computed(() => [
    'wts-breadcrumbs-item',
    'wts-breadcrumbs-item-inactive',
    'wts-breadcrumbs-item-font-body',
    { 'wts-breadcrumbs-item-overflow': props.items.length >= 4 },
]);
</script>

<style lang="scss">
.wts-breadcrumbs {
    display: inline-flex;
    align-items: center;
    gap: var(--s-spacing-m);
    border-radius: var(--s-radius-null);

    .wts-breadcrumbs-item {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .wts-overflow-dropdown {
            display: block;
            width: 10em;
            padding: var(--s-spacing-l);
            justify-content: space-between;
            align-items: flex-start;
            border-radius: var(--s-radius-s);
            border: 1px solid var(--s-neutral-border-weak-default);
            background: var(--s-neutral-bg-default-90-a);
            position: absolute !important;
            left: 0px;
            top: 105%;

            .wts-overflow-dropdown-item {
                display: flex;
                padding: var(--s-padding-s) var(--s-padding-m);
                align-items: center;
                gap: var(--s-spacing-s);
                align-self: stretch;
                color: var(--s-neutral-txt-default);
                font-family: Inter;
                font-size: var(--s-font-size-300);
                font-style: normal;
                font-weight: var(--s-font-weights-600);
                line-height: var(--s-font-size-500);
                cursor: pointer;

                &:hover {
                    background: var(--s-neutral-bg-weak-hover);
                    border-color: var(--s-neutral-border-weak-hover);
                    color: var(--s-neutral-txt-hover);
                }
                &:active {
                    background: var(--s-neutral-bg-default);
                    border-color: var(--s-neutral-border-weak-active);
                    color: var(--s-neutral-txt-active);
                }
            }
        }

        &.wts-breadcrumbs-item-overflow {
            text-decoration-line: underline;
            cursor: pointer;
        }
    }

    .wts-breadcrumbs-item-inactive {
        color: var(--s-primary-txt-default);
    }

    .wts-breadcrumbs-item-active {
        color: var(--s-primary-txt-active);
    }

    .wts-breadcrumbs-item-font-body {
        font-family: Inter;
        font-size: var(--s-font-size-300);
        font-style: normal;
        font-weight: var(--s-font-weights-400);
        line-height: var(--s-font-size-500);
    }

    .wts-breadcrumbs-item-font-body-strong {
        font-family: Inter;
        font-size: var(--s-font-size-300);
        font-style: normal;
        font-weight: var(--s-font-weights-600);
        line-height: var(--s-font-size-500);
    }
}
</style>
