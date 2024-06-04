<template>
    <component
        :is="computedTag"
        :class="computedClasses"
        :disabled="disabled"
        :href="href"
        :style="{ ...computedStyle, ...measurableStyles }"
        :type="computedType"
        @click="onClick"
    >
        <wtg-icon v-if="leadingIcon">{{ leadingIcon }}</wtg-icon>
        <div class="wts-button-content">
            <slot />
        </div>
        <wtg-loader v-if="loading" />
        <wtg-icon v-if="trailingIcon">{{ trailingIcon }}</wtg-icon>
        <div class="wts-button-shadow" />
    </component>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { sizeProps, useSize } from '../../composables/size';
import { useLayoutGridColumn, layoutGridColumnProps } from '../../composables/layoutGridColumn';
import { useMeasure, measureProps } from '../../composables/measure';
import { useTheme } from '../../composables/theme';
import { WtgIcon } from '../WtgIcon';
import { WtgLoader } from '../WtgLoader';
import tinycolor from 'tinycolor2';

const props = defineProps({
    color: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    fill: { type: Boolean, default: false },
    href: { type: String, default: undefined },
    leadingIcon: { type: String, default: undefined },
    loading: { type: Boolean, default: false },
    sentiment: { type: String as PropType<'error' | 'success'>, default: undefined },
    trailingIcon: { type: String, default: undefined },
    type: { type: String as PropType<'submit' | 'reset' | 'button'>, default: undefined },
    variant: { type: String as PropType<'primary' | 'ghost'>, default: undefined },
    ...layoutGridColumnProps,
    ...measureProps,
    ...sizeProps,
});

const emit = defineEmits(['click']);

const onClick = (e: MouseEvent) => emit('click', e);

const { resolveColor } = useTheme();
const { sizeClass } = useSize(props, 'button');

const computedClasses = computed(() => [
    {
        'wts-button-primary': props.variant === 'primary',
        'wts-button-default': props.variant !== 'primary' && props.variant !== 'ghost',
        'wts-button-fill': props.fill,
        'wts-button-ghost': props.variant === 'ghost',
        'wts-button-color':
            props.color !== undefined &&
            props.color !== 'success' &&
            props.color !== 'error' &&
            props.sentiment !== 'success' &&
            props.sentiment !== 'error',
        'wts-button-loading': props.loading,
        'wts-button-success': props.color === 'success' || props.sentiment === 'success',
        'wts-button-error': props.color === 'error' || props.sentiment === 'error',
    },
    sizeClass.value,
    'wts-button',
]);

const computedStyle = computed(() => {
    if (!props.color || props.disabled) {
        return {};
    }

    const color = tinycolor(props.color);
    if (props.variant === 'primary') {
        return {
            backgroundColor: resolveColor(props.color),
            borderColor: resolveColor(props.color),
            color: color.isLight() ? 'var(--s-neutral-txt-default)' : 'var(--s-primary-txt-inv-default)',
        };
    }

    if (props.variant === 'ghost') {
        return {
            color: resolveColor(props.color),
        };
    }

    return {
        borderColor: resolveColor(props.color),
        color: resolveColor(props.color),
    };
});

const { measurableStyles } = useMeasure(props);

const computedTag = computed(() => (props.href ? 'a' : 'button'));
const computedType = computed(() => (props.href ? undefined : props.type));

useLayoutGridColumn(props);
</script>
<style lang="scss">
.wts-button {
    align-items: center;
    border-radius: var(--s-radius-s);
    border: 1px solid;
    display: inline-flex;
    font: var(--s-button);
    gap: var(--s-spacing-s);
    justify-content: center;
    padding: var(--s-padding-s) var(--s-padding-m);

    &.wts-button:disabled {
        background: var(--s-neutral-bg-disabled);
        border-color: var(--s-neutral-bg-disabled);
        color: var(--s-neutral-txt-disabled);
        pointer-events: none;

        .wts-button-shadow {
            box-shadow: none;
        }
    }

    &:focus-visible {
        outline-offset: 1px;
        outline: 2px solid var(--s-primary-border-default);
    }

    &.wts-button-fill {
        flex: 1 0 auto;
        min-width: 100% !important;
        max-width: none;
    }

    &.wts-button-default {
        background: var(--s-neutral-bg-default);
        border-color: var(--s-neutral-border-weak-default);
        color: var(--s-neutral-txt-default);

        &.wts-button-error {
            border-color: var(--s-error-border-weak-default);
            color: var(--s-error-txt-default);
            &:hover {
                background: var(--s-error-bg-weak-hover);
                border-color: var(--s-error-border-weak-hover);
                color: var(--s-error-txt-hover);
            }

            &:active {
                background: var(--s-neutral-bg-default);
                border-color: var(--s-error-border-weak-active);
                color: var(--s-error-txt-active);
            }

            &:focus-visible {
                border-color: var(--s-error-border-weak-active);
                color: var(--s-error-txt-active);
            }
        }

        &.wts-button-success {
            border-color: var(--s-success-border-weak-default);
            color: var(--s-success-txt-default);
            &:hover {
                background: var(--s-success-bg-weak-hover);
                border-color: var(--s-success-border-weak-hover);
                color: var(--s-success-txt-hover);
            }

            &:active {
                background: var(--s-neutral-bg-default);
                border-color: var(--s-success-border-weak-active);
                color: var(--s-success-txt-active);
            }

            &:focus-visible {
                border-color: var(--s-success-border-weak-active);
                color: var(--s-success-txt-active);
            }
        }

        &:hover {
            background: var(--s-neutral-bg-weak-hover);
            border-color: var(--s-neutral-border-weak-hover);
            color: var(--s-neutral-txt-hover);
        }

        &:active {
            background: var(--s-neutral-bg-default);
            border-color: var(--s-neutral-border-weak-active);
            color: var(--s-neutral-txt-active);
        }

        &.wts-button-color:not(:active):hover::before {
            background-color: currentColor;
            bottom: 0;
            content: '';
            left: 0;
            opacity: 0.12;
            position: absolute;
            right: 0;
            top: 0;
        }
    }

    &.wts-button-primary {
        background: var(--s-primary-bg-default);
        border-color: var(--s-primary-border-default);
        color: var(--s-primary-txt-inv-default);

        &.wts-button-error {
            background: var(--s-error-bg-default);
            border-color: var(--s-error-border-default);
            color: var(--s-error-txt-inv-default);

            &:hover {
                background: var(--s-error-bg-hover);
                border-color: var(--s-error-border-hover);
                color: var(--s-error-txt-inv-hover);
            }

            &:active {
                background: var(--s-error-bg-active);
                border-color: var(--s-error-border-active);
                color: var(--s-error-txt-inv-active);
            }
        }

        &.wts-button-success {
            background: var(--s-success-bg-default);
            border-color: var(--s-success-border-default);
            color: var(--s-success-txt-inv-default);

            &:hover {
                background: var(--s-success-bg-hover);
                border-color: var(--s-success-border-hover);
                color: var(--s-success-txt-inv-hover);
            }

            &:active {
                background: var(--s-success-bg-active);
                border-color: var(--s-success-bg-active);
                color: var(--s-success-txt-inv-active);
            }
        }

        &:hover {
            background: var(--s-primary-bg-hover);
            border-color: var(--s-primary-border-hover);
        }

        &:active {
            background: var(--s-primary-bg-active);
            border-color: var(--s-primary-bg-active);
        }

        &.wts-button-color {
            &:hover::before {
                background-color: var(--s-neutral-txt-default);
                bottom: 0;
                content: '';
                left: 0;
                opacity: 0.12;
                position: absolute;
                right: 0;
                top: 0;
            }

            &:active::before {
                background-color: var(--s-neutral-txt-default);
                bottom: 0;
                content: '';
                left: 0;
                opacity: 0.24;
                position: absolute;
                right: 0;
                top: 0;
            }
        }

        .wts-button-shadow {
            margin: -1px;
        }
    }

    &.wts-button-ghost {
        background: transparent;
        border-color: transparent;
        color: var(--s-neutral-txt-default);

        &.wts-button-error {
            color: var(--s-error-txt-default);

            &:hover {
                background: var(--s-error-bg-weak-hover);
                color: var(--s-error-txt-hover);
            }

            &:active {
                background: var(--s-error-bg-weak-active);
                color: var(--s-error-txt-active);
            }

            &:focus-visible {
                color: var(--s-error-txt-active);
            }
        }

        &.wts-button-success {
            color: var(--s-success-txt-default);

            &:hover {
                background: var(--s-success-bg-weak-hover);
                color: var(--s-success-txt-hover);
            }

            &:active {
                background: var(--s-success-bg-weak-active);
                color: var(--s-success-txt-active);
            }

            &:focus-visible {
                color: var(--s-success-txt-active);
            }
        }

        .wts-button-shadow {
            box-shadow: none;

            &:hover {
                box-shadow: none;
            }

            &:active {
                box-shadow: none;
            }
        }

        &:hover {
            background: var(--s-neutral-bg-weak-hover);
        }

        &:active {
            background: var(--s-neutral-bg-weak-active);
        }

        &.wts-button-color {
            &:hover::before {
                background-color: currentColor;
                bottom: 0;
                content: '';
                left: 0;
                opacity: 0.12;
                position: absolute;
                right: 0;
                top: 0;
            }

            &:active::before {
                background-color: currentColor;
                bottom: 0;
                content: '';
                left: 0;
                opacity: 0.24;
                position: absolute;
                right: 0;
                top: 0;
            }
        }
    }

    &.wts-button-xs {
        padding: var(--s-padding-xs) var(--s-padding-xs);
    }

    &.wts-button-s {
        padding: var(--s-padding-s) var(--s-padding-s);
    }

    &.wts-button-m {
        padding: var(--s-padding-m) var(--s-padding-m);
    }

    &.wts-button-l {
        padding: var(--s-padding-l) var(--s-padding-l);
    }

    &.wts-button-xl {
        padding: var(--s-padding-xl) var(--s-padding-xl);
    }

    &.wts-button-xxl {
        padding: var(--s-padding-xxl) var(--s-padding-xxl);
    }

    &.wts-button-loading {
        pointer-events: none;
        .wts-button-content {
            opacity: 0;
        }
    }

    .wts-button-shadow {
        border-radius: var(--s-radius-s);
        bottom: 0;
        box-shadow: var(--s-elevation-button-default);
        content: '';
        left: 0;
        mix-blend-mode: multiply;
        position: absolute;
        right: 0;
        top: 0;
        transition-duration: 0.28s;
        transition-property: box-shadow;

        &:hover {
            box-shadow: var(--s-elevation-button-hover);
        }

        &:active {
            box-shadow: var(--s-elevation-button-pressed);
        }
    }

    .wts-button-content {
        white-space: nowrap;
        display: flex;
        align-items: center;
    }

    cursor: pointer;
    position: relative;
    transition-duration: 0.28s;
    transition-property: transform, opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
}
</style>
