<template>
    <wtg-popover location="right top" popover-style="margin-left: 24px;">
        <template #activator="{ props, isActive }">
            <div
                v-if="isCollapsed"
                class="wts-portalswitch__collapsed"
                :class="isActive ? 'wts-portalswitch__active' : ''"
            >
                <div class="container" v-bind="props">
                    <div class="container">
                        <span class="portal-name">{{ application?.portalCode.value ?? portalCode }}</span>
                    </div>
                </div>
            </div>
            <div v-else class="wts-portalswitch" :class="isActive ? 'wts-portalswitch__active' : ''">
                <div class="container" v-bind="props">
                    <div class="container">
                        <span class="portal-name">{{ application?.title.value ?? title }}</span>
                        <span class="branch-department">Branch/Department</span>
                    </div>
                </div>
            </div>
        </template>
        <div class="wts-navigation-portalswitch-menu">
            <div class="header">
                <span class="label">Change portal/branch</span>
                <wtg-text-field label="Portal" />
            </div>
            <div class="container">
                <wtg-text-field label="Branch" />
                <wtg-text-field label="Department" />
            </div>
            <div class="actions">
                <wtg-button>Cancel</wtg-button>
                <wtg-button variant="primary">Confirm</wtg-button>
            </div>
        </div>
    </wtg-popover>
</template>

<script setup lang="ts">
import { WtgPopover, WtgTextField, WtgButton } from '../..';
import { useApplication } from '../../../composables/application';

defineProps({
    isCollapsed: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: undefined,
    },
    portalCode: {
        type: String,
        default: undefined,
    },
});

const application = useApplication();
</script>

<style lang="scss">
.wts-portalswitch {
    display: flex;
    padding: var(--padding-M, 8px) var(--padding-XL, 16px);
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    border-bottom: 1px solid var(--brand-border-weak-default, rgba(77, 88, 235, 0.5));
    > .container {
        display: flex;
        padding: var(--padding-S, 4px) var(--padding-M, 8px);
        align-items: center;
        flex: 1 0 0;
        border-radius: var(--radius-S, 4px);
        cursor: pointer;

        &:hover {
            background: var(--brand-bg-hover, #221098);
            outline: 1px solid var(--neutral-border-weak-default, rgba(101, 106, 122, 0.6));
        }
        > .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: var(--spacing-Null, 0px);
            flex: 1 0 0;
            > .portal-name {
                font: var(--s-title-small);
                overflow: hidden;
                color: var(--brand-txt-inv-default, #f6f8ff);
                text-overflow: ellipsis;
            }
            > .branch-department {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                align-self: stretch;
                overflow: hidden;
                color: var(--brand-txt-weak-inv-default, #dae2fe);
                text-overflow: ellipsis;
                font: var(--s-body);
            }
        }
    }
}

.wts-portalswitch__collapsed {
    display: inline-flex;
    padding: var(--padding-XL, 16px);
    align-items: center;
    align-self: stretch;
    border-bottom: 1px solid var(--brand-border-weak-default, rgba(77, 88, 235, 0.5));
    > .container {
        display: flex;
        align-items: center;
        align-self: stretch;
        flex-grow: 1;
        gap: var(--spacing-M, 8px);

        > .container {
            display: flex;
            justify-content: center;
            flex-grow: 1;
            border-radius: var(--radius-S, 4px);
            border: 1px solid var(--brand-border-weak-active, rgba(33, 16, 152, 0.5));
            background: var(--brand-bg-weak-active, #4d58eb);
            padding: 2px;
            cursor: pointer;

            &:hover {
                border-radius: var(--radius-S, 4px);
                border: 1px solid var(--brand-border-weak-hover, rgba(54, 30, 226, 0.5));
                background: var(--brand-bg-hover, #221098);
            }

            > .portal-name {
                display: flex;
                flex-direction: column;
                justify-content: center;
                flex: 1 0 0;
                align-self: stretch;
                color: var(--brand-txt-inv-default, #f6f8ff);
                text-align: center;
                font-variant-numeric: lining-nums tabular-nums;

                font: var(--s-numeric);
            }
        }
    }
}

.wts-navigation-portalswitch-menu {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: var(--padding-XL, 16px);
    align-self: stretch;
    > .header {
        display: flex;
        padding-bottom: var(--padding-XL, 16px);
        flex-direction: column;
        align-items: flex-start;
        gap: var(--padding-M, 8px);
        border-bottom: 1px solid var(--neutral-border-weak-default, rgba(107, 107, 104, 0.5));
        > .label {
            color: var(--neutral-txt-default, #30302e);
            font: var(--s-title);
        }
    }
    > .container {
        display: flex;
        padding-bottom: var(--padding-XL, 16px);
        flex-direction: column;
        align-items: flex-start;
        gap: var(--padding-XL, 16px);
        border-bottom: 1px solid var(--neutral-border-weak-default, rgba(107, 107, 104, 0.5));
    }

    > .actions {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        gap: var(--padding-M, 8px);
    }
}

.wts-portalswitch.wts-portalswitch__active > .container {
    outline: 1px solid var(--brand-border-weak-active, rgba(33, 16, 152, 0.5));
    background: var(--brand-bg-active, #110662);
}

.wts-portalswitch__collapsed.wts-portalswitch__active > .container > .container {
    border: 1px solid var(--brand-border-weak-active, rgba(33, 16, 152, 0.5));
    background: var(--brand-bg-weak-active, #4d58eb);
}
</style>
