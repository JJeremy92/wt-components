<template>
    <div class="header-container">
        <slot>
            <WtgIcon class="leading-icon">{{ leadingIcon }}</WtgIcon>
            <div class="header-text">
                <div class="title-text">{{ title }}</div>
                <div class="description">{{ description }}</div>
            </div>
        </slot>
        <div class="actions">
            <WtgIconButton
                v-for="action in actions"
                :key="action.key"
                :icon="action.icon"
                variant="ghost"
                @click.stop="action.action"
            />
            <WtgIconButton variant="ghost" @click.stop="onClick">
                <WtgIcon class="dropdown-icon"> $caret-up </WtgIcon>
            </WtgIconButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import WtgIcon from '../WtgIcon';
import WtgIconButton from '../WtgIconButton';
import { toggleOpenFunctionKey } from './keys';

defineProps({
    title: {
        type: String,
        default: undefined,
    },
    description: {
        type: String,
        default: undefined,
    },
    leadingIcon: {
        type: String,
        default: undefined,
    },
    actions: {
        type: Array<{
            icon: string;
            action: () => void;
            key: string;
        }>,
        default: () => [],
    },
});

const toggleOpen = inject<() => void>(toggleOpenFunctionKey);
const onClick = () => {
    toggleOpen && toggleOpen();
};
</script>
