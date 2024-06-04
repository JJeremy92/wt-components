<template>
    <div class="wts-tabs">
        <div class="wts-tabs-navigation">
            <div
                v-for="(tabInfo, index) in tabsInfo"
                :key="index"
                class="wts-tab-label-wrapper"
                :class="{
                    'wts-tab-label-wrapper__active': index === activeTabInternal,
                }"
            >
                <div
                    class="wts-tab-label"
                    :class="{
                        'wts-tab-label__disabled': tabInfo.props?.disabled,
                        'wts-tab-label__compact': isMobile,
                        'wts-tab-label__active': index === activeTabInternal,
                    }"
                    @click="onTabClick($event, index)"
                >
                    <span>{{ tabInfo.props?.label }}</span>
                    <span v-if="tabInfo.props?.number" class="wts-tab-label__number">({{ tabInfo.props.number }})</span>
                    <wtg-badge
                        v-if="tabInfo.props?.hasNotification && !tabInfo.props?.disabled"
                        type="notification"
                        class="wts-tab-label__badge"
                    ></wtg-badge>
                </div>
            </div>
        </div>
        <component :is="tabsInfo[activeTabInternal].content" v-if="tabsInfo[activeTabInternal]?.content" />
    </div>
    <div v-show="false"><slot /></div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import { registerTabFunctionKey } from './keys';
import { WtgTabData } from './types';
import WtgBadge from '../WtgBadge';

const props = defineProps({
    activeTab: {
        type: Number,
        default: 0,
    },
    isMobile: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(['tab-change']);
let activeTabInternal = ref(props.activeTab);
const tabsInfo = ref<WtgTabData[]>([]);

const registerTabFunction = (tab: WtgTabData) => tabsInfo.value.push(tab);
provide(registerTabFunctionKey, registerTabFunction);

const onTabClick = (e: MouseEvent, index: number | string | symbol) => {
    if (activeTabInternal.value !== index) {
        activeTabInternal.value = index as number;
        emit('tab-change', e, index);
    }
};
</script>

<style lang="scss">
.wts-tabs {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: var(--s-spacing-m, 8px);
    padding: var(--s-padding-xl, 16px);

    .wts-tabs-navigation {
        display: flex;
        flex-flow: row wrap;
        gap: var(--s-spacing-xl, 16px);
    }
}

.wts-tab-label-wrapper {
    border-bottom: 2px solid transparent;

    &__active {
        border-bottom: 2px solid var(--s-primary-border-default, #371ee1);
    }
}

.wts-tab-label {
    &:hover {
        border-radius: var(--s-radius-s, 4px);
        color: var(--s-primary-txt-weak-hover, #371ee1);
        background: var(--s-primary-bg-weak-hover, #ecf1ff);
    }

    &__badge {
        position: absolute;
        right: -4px;
        top: -4px;
    }

    &__active {
        color: var(--s-primary-txt-weak-hover, #371ee1);
    }

    &__compact {
        font-size: var(--s-font-size-500, 20px);
        font-weight: var(--s-font-weights-700, 700);
        line-height: var(--s-line-heights-600, 32px);
    }

    &__disabled {
        color: var(--s-neutral-txt-disabled, #b9b9b5) !important;
        background: var(--s-neutral-bg-disabled, #f8f8f7) !important;
        pointer-events: none !important;
    }

    &__number {
        font-weight: var(--s-font-weights-400, 400);
    }

    display: inline-flex;
    gap: var(--s-spacing-s, 4px);
    color: var(--s-neutral-txt-default, #30302e);
    font: var(--s-title-small);
    position: relative;
    padding: var(--s-padding-s, 4px) var(--s-padding-xs, 2px);
    cursor: pointer;
}
</style>
