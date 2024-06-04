<template>
    <div :class="computedClasses" @click="() => !open && toggleOpen()">
        <slot>
            <WtgExpansionPanelHeader v-bind="props" />
            <WtgExpansionPanelContent />
        </slot>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, inject, watchEffect } from 'vue';
import { openKey, registerPanelFunctionKey, toggleOpenFunctionKey } from './keys';
import { RegisterPanel } from './types';
import WtgExpansionPanelContent from './WtgExpansionPanelContent.vue';
import WtgExpansionPanelHeader from './WtgExpansionPanelHeader.vue';

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
});

const open = ref(false);

const computedClasses = computed(() => [
    {
        'wts-expansion-panel-open': open.value,
        'wts-expansion-panel-closed': !open.value,
        'wts-expansion-panel-disabled': props.disabled,
    },
    'wts-expansion-panel',
]);

const registerPanel = inject<() => RegisterPanel>(registerPanelFunctionKey);
const { isPanelOpen, togglePanel } = registerPanel
    ? registerPanel()
    : { isPanelOpen: undefined, togglePanel: undefined };

const toggleOpen = () => {
    togglePanel && togglePanel();
    open.value = !open.value;
};

provide(openKey, open);
provide(toggleOpenFunctionKey, toggleOpen);

watchEffect(() => {
    if (isPanelOpen === undefined) {
        return;
    }
    open.value = isPanelOpen.value;
});
</script>

<style lang="scss">
.wts-expander-group .wts-expansion-panel {
    border-bottom: 1px solid var(--neutral-border-weak-default, rgba(107, 107, 104, 0.5));
}

.wts-expander-panel .wts-expansion-panel {
    border-radius: var(--radius-s, 4px);
    border: 1px solid var(--neutral-border-weak-default, rgba(107, 107, 104, 0.5));
    background: var(--neutral-bg-default, #fff);
}

.wts-expansion-panel {
    display: flex;
    padding: var(--padding-m, 8px);
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;

    &.wts-expansion-panel-closed:hover {
        background: var(--primary-bg-weak-default, #f6f8ff);
        cursor: pointer;
    }

    &.wts-expansion-panel-disabled {
        pointer-events: none;
        background: var(--neutral-bg-disabled, #f8f8f7);

        .dropdown-icon {
            color: var(--s-neutral-icon-disabled);
        }

        .leading-icon {
            color: var(--s-neutral-icon-disabled);
        }

        .header-container .header-text {
            .title-text {
                color: var(--s-neutral-txt-disabled, #b9b9b5);
            }

            .description {
                color: var(--s-neutral-txt-disabled, #b9b9b5);
            }
        }
    }

    .header-container {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        gap: var(--spacing-m, 8px);
        align-self: stretch;

        .prepend-icon {
            display: flex;
            height: 28px;
            align-items: center;
            gap: 8px;
        }

        .actions {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: var(--padding-m, 8px);
        }

        .header-text {
            display: flex;
            padding: var(--padding-null, 0px);
            flex-direction: column;
            align-items: flex-start;
            gap: var(--padding-null, 0px);
            flex: 1 0 0;

            .title-text {
                display: flex;
                height: 28px;
                flex-direction: column;
                justify-content: center;
                align-self: stretch;
                overflow: hidden;
                color: var(--neutral-txt-default, #30302e);
                text-overflow: ellipsis;
                white-space: nowrap;

                font: var(--s-title);
            }

            .description {
                align-self: stretch;
                color: var(--neutral-txt-weak-default, #6b6b68);

                font: var(--s-body);
            }
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        overflow: hidden;
        transition: margin-top 0.3s, height 0.3s;
        border-top: 1px solid var(--neutral-border-weak-default, rgba(107, 107, 104, 0.5));
        padding-top: var(--s-spacing-m);

        .slot-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            align-self: stretch;
        }
    }

    &.wts-expansion-panel-closed .content {
        border-top: none;
        padding-top: 0;
    }

    .dropdown-icon {
        transition: all 0.3s;
    }

    &.wts-expansion-panel-closed .dropdown-icon {
        transform: rotate(180deg);
    }
}
</style>
