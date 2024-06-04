<template>
    <v-text-field v-model="filter" variant="solo" placeholder="Search icons..." density="comfortable" autofocus color="success"></v-text-field>

    <div class="icons-layout">
        <template v-for="icon in computedMatchingIcons" :key="icon">
            <v-tooltip :text="iconTooltipText ?? `s-icon-${icon}`">
                <template #activator="{ props }">
                    <div class="icons-item" v-bind="props" @click="onClickIcon(icon)">
                        <wtg-icon size="xxl">{{ `$${icon}` }}</wtg-icon>
                        <p class="icons-item-text">{{ icon }}</p>
                    </div>
                </template>
            </v-tooltip>
        </template>
    </div>
</template>

<script setup lang="ts">
import { WtgIcon } from '../components/WtgIcon';
import { VTextField } from 'vuetify/components/VTextField';
import { VTooltip } from 'vuetify/components/VTooltip';
import { ref, computed, watch } from 'vue';
import { useCanonicalIconsName } from '../composables/icons';

const iconsArray = useCanonicalIconsName();
const filter = ref('');
const delayedFilter = ref('');
const delayFilterTimeout = ref(0);
const iconTooltipText = ref<string | undefined>(undefined);
const icons = ref(iconsArray);

watch(filter, (newValue) => {
    if (delayFilterTimeout.value) {
        window.clearTimeout(delayFilterTimeout.value);
    }

    delayFilterTimeout.value = window.setTimeout(() => {
        delayedFilter.value = newValue ? newValue.toUpperCase() : '';
        delayFilterTimeout.value = 0;
    }, 300);
});

const computedMatchingIcons = computed(() => {
    if (!delayedFilter.value) {
        return icons.value;
    }
    const matchedIcons = icons.value.filter((icon) => icon.toUpperCase().includes(delayedFilter.value));
    return matchedIcons;
});

const onClickIcon = (iconName: any) => {
    navigator.clipboard.writeText(`s-icon-${iconName}`);
    iconTooltipText.value = `Copied s-icon-${iconName}!`;
    window.setTimeout(() => {
        iconTooltipText.value = undefined;
    }, 1000);
};
</script>

<style>
.v-field__input:focus {
    border: 1px solid var(--s-primary-border-default);
}
.icons-layout {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, 150px);
    justify-content: space-around;
    vertical-align: middle;

    .icons-item {
        display: flex;
        padding-top: 20px;
        align-items: center;
        flex-direction: column;
        height: 130px;

        .icons-item-text {
            font-size: 14px;
        }
    }

    .icons-item:hover {
        background: var(--s-neutral-bg-weak-hover);
        border-color: var(--s-neutral-border-weak-hover);
        color: var(--s-neutral-txt-hover);
        cursor: pointer;
    }

    .icons-item:active {
        background: var(--s-neutral-bg-default);
        border-color: var(--s-neutral-border-weak-active);
        color: var(--s-neutral-txt-active);
    }
}
</style>
