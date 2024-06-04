<template>
    <div :class="computedClasses">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { PropType, computed, provide, ref, watch } from 'vue';
import { RegisterPanel } from './types';
import { registerPanelFunctionKey } from './keys';

const props = defineProps({
    variant: {
        type: String as PropType<'panel' | 'group'>,
        default: 'panel',
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    value: {
        type: Object as PropType<number | Array<number>>,
        default: undefined,
    },
    mandatory: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['change']);

const computedClasses = computed(() => [
    {
        'wts-expander-group': props.variant === 'group',
        'wts-expander-panel': props.variant !== 'group',
    },
]);

const normalizedValue = computed<number[]>(() => {
    if (props.value === undefined) {
        return [];
    }

    if (typeof props.value === 'number') {
        return [props.value];
    }
    return props.value;
});

const openPanelIds = ref<number[]>(normalizedValue.value.length ? normalizedValue.value : props.mandatory ? [0] : []);

watch(
    () => props.value,
    () => (openPanelIds.value = normalizedValue.value)
);

let nextPanelId = 0;
provide(registerPanelFunctionKey, registerPanel);

function registerPanel(): RegisterPanel {
    const panelId = nextPanelId++;
    return {
        isPanelOpen: computed(() => openPanelIds.value.includes(panelId)),
        togglePanel: () => togglePanel(panelId),
    };
}

function togglePanel(panelId: number) {
    if (props.multiple) {
        if (openPanelIds.value.includes(panelId)) {
            openPanelIds.value = [...openPanelIds.value].filter((val) => val !== panelId);
        } else {
            openPanelIds.value = [...openPanelIds.value, panelId];
        }
    } else {
        openPanelIds.value = openPanelIds.value[0] === panelId ? [] : [panelId];
    }
    emitChange();
}

function emitChange() {
    if (props.multiple) {
        emit('change', openPanelIds.value);
        return;
    }

    if (openPanelIds.value.length) {
        emit('change', openPanelIds.value[0]);
        return;
    }

    emit('change', undefined);
}
</script>
