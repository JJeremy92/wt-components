<template>
    <WtgPopover
        :model-value="menu"
        location="bottom left"
        popover-style="padding: 0"
        :transition="false"
        @update:model-value="(newVal) => (menu = newVal)"
    >
        <template #activator="{ props: activatorProps }">
            <WtgTextField
                :ref="activatorProps.ref"
                class="wts-date-field"
                :description="description"
                :is-disabled="isDisabled"
                :is-invalid="isInvalid"
                :is-loading="isLoading"
                :is-read-only="isReadOnly"
                :is-valid="isValid"
                :is-warning="isWarning"
                :label="label"
                leading-icon="$search"
                :leading-inner-icon="leadingInnerIcon"
                :messages="messages"
                :show-description="!(codeOnly || descriptionOnly)"
                :value="displayValue"
                @blur="onChange($event)"
                @change="onChange"
                @input="onInput"
                @keydown.down="onDownKey"
                @keydown.enter="onEnterKey"
                @keydown.esc="onEscapeKey"
                @keydown.tab="onTabKey"
                @keydown.up="onUpKey"
            >
                <template #trailingInner>
                    <WtgIcon
                        icon="$caret-down"
                        class="wts-search-field-trailing-icon"
                        :style="menu ? 'transform: rotate(-180deg);' : ''"
                        @click="onTrailingIconClick"
                    />
                </template>
            </WtgTextField>
        </template>
        <template v-if="!loading">
            <div v-if="items.length > 0 && items.length < total">
                <div class="wts-search-field-showing-caption">
                    {{ showingCaption }}
                </div>
                <wtg-divider />
            </div>
            <div v-if="items.length > 0" class="wts-search-field-results-container">
                <template v-if="items.length > 0">
                    <div v-for="(item, i) in items" :key="i" ref="listItems">
                        <slot name="item" :item="item">
                            <div
                                class="wts-search-field-result"
                                :class="{ 'wts-search-field-result__active': i === listIndex }"
                                @click="selectItem(i)"
                            >
                                {{ formatSearchResult(item) }}
                            </div>
                        </slot>
                    </div>
                </template>
            </div>
            <div v-else class="wts-search-field-no-results-caption">{{ noResultsCaption }}</div>
            <div v-if="items.length < total" class="wts-search-field-results-show-more">
                <WtgButton v-if="!loadingMore" variant="ghost" fill @click="onShowMoreClick">
                    {{ showMoreCaption }}
                </WtgButton>
                <div v-else style="display: flex; align-items: center; justify-content: center; padding: 16px">
                    <WtgLoader />
                </div>
            </div>
        </template>
        <template v-else>
            <div style="display: flex; align-items: center; justify-content: center; padding: 16px">
                <WtgLoader />
            </div>
        </template>
    </WtgPopover>
</template>

<script setup lang="ts">
import { WtgTextField } from '../WtgTextField';
import { WtgPopover } from '../WtgPopover';
import { WtgLoader } from '../WtgLoader';
import { ref, PropType, watch, computed, onUnmounted } from 'vue';
import { SearchFieldDisplayMode, SearchFieldItem, SearchFieldItemProvider } from './types';
import { inputProps } from '../../composables/input';
import WtgButton from '../WtgButton';
import { useLocale } from '../../composables/locale';
import { isGuid } from './utils/stringHelper';
import WtgIcon from '../WtgIcon';

const props = defineProps({
    itemProvider: {
        type: Object as PropType<SearchFieldItemProvider>,
        default: undefined,
    },
    value: {
        type: String,
        default: undefined,
    },
    ...inputProps,
});

const emit = defineEmits(['change', 'commit-pending']);

const codeOnly = ref(false);
const description = ref('');
const descriptionOnly = ref(false);
const displayValue = ref('');
const emptyValue = ref('');
const hasPendingChanges = ref(false);
const internalValue = ref<string | undefined>(undefined);
const items = ref<SearchFieldItem[]>([]);
const listIndex = ref(-1);
const listItems = ref<HTMLElement[]>();
const loading = ref(false);
const loadingMore = ref(false);
const menu = ref(false);
const search = ref('');
const searchResultsDisplayMode = ref(SearchFieldDisplayMode.DescOnly);
const timeout = ref<number | undefined>(undefined);
const total = ref(0);

const { formatCaption } = useLocale();

const noResultsCaption = computed(() => formatCaption('searchControl.noResults'));
const notAvailableCaption = computed(() => formatCaption('searchControl.notAvailable'));
const showingCaption = computed(() => formatCaption('searchControl.showing', items.value.length, total.value));
const showMoreCaption = computed(() => formatCaption('searchControl.showMore'));

watch(
    () => props.itemProvider,
    () => {
        if (props.itemProvider) {
            props.itemProvider.getDisplayModeAsync().then((displayMode) => {
                codeOnly.value = displayMode === SearchFieldDisplayMode.CodeOnly;
                descriptionOnly.value = displayMode === SearchFieldDisplayMode.DescOnly;
            });
            props.itemProvider.getSearchResultsDisplayModeAsync().then((newSearchResultsDisplayMode) => {
                searchResultsDisplayMode.value = newSearchResultsDisplayMode;
            });
            props.itemProvider.getEmptyValueAsync().then((newEmptyValue) => {
                emptyValue.value = newEmptyValue;
            });
        }
    },
    { immediate: true }
);

watch(
    () => props.value,
    (value) => applyValue(value, false),
    { immediate: true }
);

onUnmounted(() => {
    if (hasPendingChanges.value) {
        emit('commit-pending', displayValue.value);
    }
});

function applyValue(value: string | undefined, notify: boolean) {
    if (value !== internalValue.value && value !== undefined) {
        displayValue.value = '';
        description.value = '';
        internalValue.value = value;
        loadItemForValueAsync(value).then(async (item) => {
            if (item) {
                if (descriptionOnly.value) {
                    displayValue.value = item.description;
                } else {
                    displayValue.value = item.code;
                    description.value = item.description;
                }
            } else if (value && value !== emptyValue.value) {
                displayValue.value = isGuid(value) ? notAvailableCaption.value : value;
            }

            const valid = await validateAsync(displayValue.value, item);
            if (valid && notify) {
                emit('change', internalValue.value);
            }
        });
    }
}

function onChange() {
    if (hasPendingChanges.value) {
        search.value = '';
        window.clearTimeout(timeout.value);
        loadItemAsync(displayValue.value).then((item) => {
            updateInternalValue(item);
        });
    }
}

function onInput(value: string) {
    displayValue.value = value || '';
    description.value = '';
    window.clearTimeout(timeout.value);
    timeout.value = window.setTimeout(() => {
        startSearch(value);
    }, 200);
    hasPendingChanges.value = true;
}

function onTrailingIconClick(): void {
    if (!menu.value) {
        startSearch();
        focus();
    } else {
        menu.value = false;
    }
}

function onDownKey(event: KeyboardEvent): void {
    if (menu.value) {
        setListIndex(listIndex.value + 1);
    } else {
        startSearch();
    }
    event.preventDefault();
    event.stopPropagation();
}

function onUpKey(event: KeyboardEvent): void {
    if (menu.value) {
        setListIndex(listIndex.value - 1);
        event.preventDefault();
        event.stopPropagation();
    }
}

function onEscapeKey(event: KeyboardEvent): void {
    menu.value = false;
    event.stopPropagation();
}

function onTabKey(event: KeyboardEvent): void {
    if (menu.value) {
        selectItem(listIndex.value);
        event.preventDefault();
        event.stopPropagation();
    }
}

function onEnterKey(event: KeyboardEvent) {
    if (menu.value) {
        selectItem(listIndex.value);
        event.preventDefault();
        event.stopPropagation();
    }
}

function onShowMoreClick() {
    loadItemsAsync(displayValue.value, items.value.length).then((response) => {
        if (response) {
            items.value = items.value.concat(response.items);
            total.value = response.total;
        }
    });
}

async function updateInternalValue(item?: SearchFieldItem): Promise<void> {
    const valid = await validateAsync(displayValue.value, item);
    if (valid) {
        if (item) {
            internalValue.value = item.value ?? item.code;
            displayValue.value = descriptionOnly.value ? item.description : item.code;
            description.value = item.description;
        } else {
            internalValue.value = displayValue.value || emptyValue.value;
            loadDescriptionAsync(displayValue.value);
        }
        emit('change', internalValue.value);
    }
}

function validateAsync(displayValue: string, item?: SearchFieldItem) {
    if (props.itemProvider) {
        return props.itemProvider.validateAsync(displayValue, item);
    }
    return Promise.resolve(true);
}

function startSearch(newSearch = '') {
    if (!props.isReadOnly) {
        items.value = [];
        search.value = newSearch;
        loading.value = true;
        menu.value = true;
        loadItemsAsync(newSearch).then((response) => {
            if (search.value === newSearch && response) {
                items.value = response.items;
                total.value = response.total;
                loading.value = false;
                setListIndex(findListIndex());
                window.setTimeout(() => {
                    scrollToSelection();
                }, 50);
            }
        });
    }
}

function setListIndex(index: number): void {
    if (index >= 0 && index < items.value.length) {
        listIndex.value = index;
        scrollToSelection();
    }
}

function scrollToSelection() {
    const listitems = listItems.value;
    const ref = listitems && listitems[listIndex.value];
    if (ref?.scrollIntoView) {
        ref.scrollIntoView({ block: 'nearest' });
    }
}

function findListIndex(): number {
    const displayValueUpper = displayValue.value.toLocaleUpperCase();
    for (let i = 0; i < items.value.length; i++) {
        const item = items.value[i];
        const value = descriptionOnly.value ? item.description : item.code;
        if (value && value.toLocaleUpperCase() === displayValueUpper) {
            return i;
        }
    }
    return 0;
}

function selectItem(index: number) {
    const item = items.value[index];
    if (item) {
        updateInternalValue(item);
    }
    menu.value = false;
}

function loadDescriptionAsync(value: string) {
    description.value = '';
    if (value) {
        loadItemAsync(value).then((item) => {
            if (item) {
                description.value = item.description;
            }
        });
    }
}

function loadItemAsync(search: string) {
    if (props.itemProvider) {
        return props.itemProvider.getItemAsync(search);
    }
    return Promise.resolve(undefined);
}

function loadItemForValueAsync(value: string) {
    if (props.itemProvider) {
        return props.itemProvider.getItemForValueAsync(value);
    }
    return Promise.resolve(undefined);
}

function loadItemsAsync(search = '', skip = 0) {
    if (props.itemProvider) {
        loadingMore.value = true;
        return props.itemProvider.getItemsAsync(search, skip).finally(() => (loadingMore.value = false));
    }
    return Promise.resolve(undefined);
}

function formatSearchResult(item: SearchFieldItem) {
    if (searchResultsDisplayMode.value === SearchFieldDisplayMode.CodeOnly) {
        return item.code;
    } else if (searchResultsDisplayMode.value === SearchFieldDisplayMode.DescOnly) {
        return item.description;
    } else {
        return `${item.code} - ${item.description}`;
    }
}
</script>

<style lang="scss">
.wts-search-field-loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.wts-search-field-results-container {
    max-height: 344px;
    overflow-y: scroll;
}

.wts-search-field-result {
    font: var(--s-body);
    padding: var(--s-spacing-m) var(--s-spacing-xl);

    &:hover {
        background-color: var(--s-neutral-bg-weak-hover);
        cursor: pointer;
    }

    &__active {
        background-color: var(--s-primary-bg-weak-active);
        color: var(--s-primary-txt-default);

        &:hover {
            background-color: var(--s-primary-bg-weak-active);
        }
    }
}

.wts-search-field-results-show-more {
    border-top: 1px solid var(--s-neutral-border-weak-default);
}

.wts-search-field-showing-caption {
    font: var(--s-body-strong);
    color: var(--s-neutral-txt-weak-default);
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--s-neutral-border-weak-default);
    padding: var(--s-spacing-s);
}

.wts-search-field-no-results-caption {
    font: var(--s-body-strong);
    padding: var(--s-spacing-m) var(--s-spacing-xl);
    color: var(--s-neutral-txt-weak-default);
}

.wts-search-field-trailing-icon {
    transition: all 300ms;
    cursor: pointer;
}
</style>
