<template>
    <div class="wts-navigation-settings">
        <div class="actions">
            <wtg-navigation-popover label="Favourites" icon="$star" :is-collapsed="isCollapsed">
                Placeholder content
            </wtg-navigation-popover>
            <wtg-navigation-popover label="Recently Viewed" icon="$history" :is-collapsed="isCollapsed">
                Placeholder content
            </wtg-navigation-popover>
        </div>
        <div class="utility">
            <wtg-navigation-popover label="Help" icon="$help" :is-collapsed="isCollapsed">
                Placeholder content
            </wtg-navigation-popover>
            <wtg-navigation-popover label="Settings" icon="$settings" :is-collapsed="isCollapsed">
                Placeholder content
            </wtg-navigation-popover>
            <wtg-navigation-popover label="Rafael Nadal" is-avatar :is-collapsed="isCollapsed">
                Placeholder content
            </wtg-navigation-popover>
        </div>
    </div>
</template>

<script setup lang="ts">
import WtgNavigationPopover from '../WtgNavigationPopover/WtgNavigationPopover.vue';

defineProps({
    isCollapsed: {
        type: Boolean,
        default: false,
    },
});
</script>

<style lang="scss">
.wts-navigation-settings {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    border-top: 1px solid var(--brand-border-weak-default, rgba(77, 88, 235, 0.5));

    > .actions {
        display: flex;
        padding: var(--padding-XL, 16px);
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-M, 8px);
        align-self: stretch;
    }

    > .utility {
        display: flex;
        padding: var(--padding-XL, 16px);
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-M, 8px);
        align-self: stretch;
        border-top: 1px solid var(--brand-border-weak-default, rgba(77, 88, 235, 0.5));
        > .popover-activator {
            display: flex;
            padding: var(--spacing-S, 4px) var(--spacing-M, 8px);
            align-items: center;
            gap: var(--padding-S, 4px);
            align-self: stretch;
            flex-grow: 1;
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
    }
}
</style>
