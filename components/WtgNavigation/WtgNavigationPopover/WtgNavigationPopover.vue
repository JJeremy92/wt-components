<template>
    <wtg-popover
        location="right bottom"
        popover-style="
    display: flex;
    margin-left: 24px;
    min-width: 160px;
    padding: var(--spacing-XL, 16px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--padding-XL, 16px);
"
    >
        <template #activator="{ props, isActive }">
            <div
                v-if="!isCollapsed"
                :class="['wts-navigation-popover', { 'wts-navigation-popover__active': isActive }]"
                v-bind="props"
            >
                <div class="container">
                    <wtg-avatar v-if="isAvatar" icon="$user" />
                    <wtg-icon v-else :icon="icon" style="color: var(--s-brand-icon-inv-default)" />
                    <span class="label">{{ label }}</span>
                </div>
                <wtg-icon icon="$caret-right" style="color: var(--s-brand-icon-inv-default)" />
            </div>
            <div
                v-else
                :class="['wts-navigation-popover__collapsed', { 'wts-navigation-popover__active': isActive }]"
                v-bind="props"
            >
                <div class="container">
                    <wtg-avatar v-if="isAvatar" icon="$user" />
                    <wtg-icon v-else :icon="icon" style="color: var(--s-brand-icon-inv-default)" />
                </div>
            </div>
        </template>
        <div class="wts-navigation-settings-menu-header">
            <div class="frame-7">
                <wtg-icon icon="$placeholder" />
                <span class="menu-name">Menu name</span>
            </div>
        </div>
        <div class="wts-navigation-settings-menu-content"><slot /></div>
    </wtg-popover>
</template>

<script setup lang="ts">
import { WtgPopover, WtgIcon, WtgAvatar } from '../..';
defineProps({
    isAvatar: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: String,
        default: '$placeholder',
    },
    label: {
        type: String,
        default: 'Label',
    },
    isCollapsed: {
        type: Boolean,
        default: false,
    },
});
</script>

<style lang="scss">
.wts-navigation-settings-menu-header {
    display: flex;
    padding-bottom: var(--padding-XL, 16px);
    flex-direction: column;
    align-items: flex-start;
    gap: var(--padding-M, 8px);
    align-self: stretch;
    border-bottom: 1px solid var(--neutral-border-weak-default, rgba(107, 107, 104, 0.5));

    & > .frame-7 {
        display: flex;
        align-items: center;
        gap: var(--padding-M, 8px);
        align-self: stretch;

        & > .menu-name {
            font: var(--s-title-small);
            color: var(--neutral-txt-default, #30302e);
        }
    }
}

.wts-navigation-settings-menu-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    font: var(--s-body);
}

.wts-navigation-popover {
    display: flex;
    padding: var(--spacing-S, 4px) var(--spacing-M, 8px);
    align-items: center;
    gap: var(--padding-S, 4px);
    align-self: stretch;
    flex-grow: 1;
    border-radius: var(--radius-S, 4px);
    cursor: pointer;

    &:hover {
        outline: 1px solid var(--brand-border-weak-hover, rgba(54, 30, 226, 0.5));
        background: var(--brand-bg-hover, #221098);
    }

    > .container {
        display: flex;
        align-items: center;
        gap: var(--padding-M, 8px);
        flex: 1 0 0;

        > .label {
            color: var(--brand-txt-inv-default, #f6f8ff);
            font: var(--s-button);
            flex: 1 0 0;
        }
    }
}

.wts-navigation-popover__collapsed {
    display: inline-flex;
    padding: var(--spacing-S, 4px);
    justify-content: center;
    align-items: center;
    gap: var(--spacing-XS, 2px);
    border-radius: var(--radius-S, 4px);
    cursor: pointer;
    > .container {
        display: flex;
        padding: var(--padding-XS, 2px);
        justify-content: center;
        align-items: center;
    }

    &:hover {
        outline: 1px solid var(--brand-border-weak-hover, rgba(54, 30, 226, 0.5));
        background: var(--brand-bg-hover, #221098);
    }
}

.wts-navigation-popover.wts-navigation-popover__active {
    outline: 1px solid var(--brand-border-weak-active, rgba(33, 16, 152, 0.5));
    background: var(--brand-bg-weak-active, #4d58eb);
}

.wts-navigation-popover__collapsed.wts-navigation-popover__active {
    outline: 1px solid var(--brand-border-weak-active, rgba(33, 16, 152, 0.5));
    background: var(--brand-bg-active, #110662);
}
</style>
