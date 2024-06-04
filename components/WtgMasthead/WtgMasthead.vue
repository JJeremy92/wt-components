<template>
    <div class="wts-masthead">
        <div class="wts-masthead-header" :style="showEntity ? '' : 'border-bottom: none;'">
            <div>
                <wtg-breadcrumbs :items="computedBreadcrumbsItems"></wtg-breadcrumbs>
            </div>
            <div class="wts-masthead-header-actions">
                <wtg-split-button
                    v-if="showSplitButton"
                    leading-icon="$add"
                    variant="primary"
                    :title="splitButtonTitle"
                    :items="splitButtonItems"
                >
                    Add New
                </wtg-split-button>
                <wtg-icon-button icon="$search"></wtg-icon-button>
                <wtg-icon-button icon="$bell"></wtg-icon-button>
            </div>
        </div>
        <div v-if="showEntity" class="wts-masthead-entity">
            <div class="wts-masthead-entity-name">
                <wtg-icon-button icon="$arrow-left"></wtg-icon-button>
                <div class="wts-masthead-entity-name-title">{{ entityName }}</div>
            </div>
            <wtg-entity-actions
                :items="entityItems"
                :is-mobile="isMobile"
                @click="onEntityActionsItemClick"
            ></wtg-entity-actions>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useApplication } from '../../composables/application';
import WtgBreadcrumbs from '../WtgBreadcrumbs';
import { computed } from 'vue';
import { WtgEntityActions, WtgEntityActionsItemType } from '../WtgEntityActions';
import WtgIconButton from '../WtgIconButton';
import WtgSplitButton from '../WtgSplitButton';

const props = defineProps({
    entityName: { type: String, default: undefined },
    breadcrumbsItems: { type: Array<{ caption: string; link?: string }>, default: () => [] },
    entityItems: { type: Array<WtgEntityActionsItemType>, default: () => [] },
    splitButtonItems: { type: Array<{ caption: string }>, default: () => [] },
    splitButtonTitle: { type: String, default: undefined },
    isMobile: { type: Boolean, default: false },
});
const emit = defineEmits(['toolbar-button-click']);
const application = useApplication();
const computedBreadcrumbsItems = computed(() =>
    props.breadcrumbsItems.length ? props.breadcrumbsItems : [{ caption: application?.title.value ?? '' }]
);
const showEntity = computed(() => !!props.entityName);
const showSplitButton = computed(() => !!props.splitButtonTitle);
const onEntityActionsItemClick = (e: MouseEvent, id: string) => {
    emit('toolbar-button-click', e, id);
};
</script>

<style lang="scss">
.wts-masthead {
    display: flex;
    flex-grow: 1;
    padding-top: var(--s-padding-m);
    padding-right: var(--s-padding-l);
    padding-left: var(--s-padding-l);
    padding-bottom: var(--s-padding-l);
    flex-direction: column;
    align-items: flex-start;
    gap: var(--s-padding-l);

    .wts-masthead-header {
        display: flex;
        padding: var(--s-padding-xl) 0px;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
        border-bottom: 1px solid var(--s-neutral-border-weak-default, rgba(107, 107, 104, 0.5));

        .wts-masthead-header-actions {
            display: flex;
            align-items: flex-start;
            gap: var(--s-spacing-m);
        }
    }

    .wts-masthead-entity {
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;

        .wts-masthead-entity-name {
            display: flex;
            align-items: flex-start;
            gap: var(--s-spacing-m);
            flex: 1 0 0;

            .wts-masthead-entity-name-title {
                color: var(--s-neutral-txt-default);
                font-variant-numeric: lining-nums tabular-nums slashed-zero;
                font-family: Inter;
                font-size: 20px;
                font-style: normal;
                font-weight: 600;
                line-height: 28px;
            }
        }
    }
}
</style>
