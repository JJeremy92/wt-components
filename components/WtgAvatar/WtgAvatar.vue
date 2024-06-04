<template>
    <div :class="computedClass">
        <img v-if="computedShowImg" :src="image" />

        <wtg-icon v-if="computedShowAddIcon" :style="computedAddIconStyle" :size="size"> $add </wtg-icon>

        <wtg-loader v-if="computedShowSpinnerIcon" :style="computedSpinnerIconStyle" :size="size" />

        <wtg-icon v-if="computedShowIcon" :size="size">
            {{ icon }}
        </wtg-icon>

        <span v-if="computedShowInitials" class="wts-avatar-initials">
            {{ initials }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { WtgIcon } from '../WtgIcon';
import { sizeProps, useSize } from '../../composables/size';
import { WtgLoader } from '../WtgLoader';

const props = defineProps({
    icon: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    initials: {
        type: String,
        default: '',
    },
    upload: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    ...sizeProps,
});

const avatarSpinner = ref(false);
const avatarUpload = ref(false);

const computedShowImg = computed(() => {
    return props.image;
});

const computedShowAddIcon = computed(() => {
    return avatarUpload.value;
});

const computedShowSpinnerIcon = computed(() => {
    return !avatarUpload.value && avatarSpinner.value;
});

const computedShowIcon = computed(() => {
    return !props.image && !avatarUpload.value && !avatarSpinner.value && props.icon;
});

const computedShowInitials = computed(() => {
    return !props.image && !avatarUpload.value && !avatarSpinner.value && !props.icon && props.initials;
});

const computedAddIconStyle = computed(() => ({
    color: props.image ? 'var(--s-neutral-icon-inv-default)' : 'var(--s-primary-icon-hover)',
    position: 'absolute',
}));

const computedSpinnerIconStyle = computed(() => ({
    color: props.image ? 'var(--s-neutral-icon-inv-default)' : 'var(--s-primary-icon-active)',
    position: 'absolute',
}));

const { sizeClass } = useSize(props, 'avatar');

const computedClass = computed(() => [
    {
        'wts-avatar-disabled': props.disabled,
    },
    'wts-avatar',
    sizeClass.value,
]);
watch(
    () => props.disabled,
    (newValue: any) => {
        if (newValue) {
            avatarUpload.value = false;
            avatarSpinner.value = false;
        }
    }
);

watch(
    () => props.upload,
    (newValue: any) => {
        avatarUpload.value = newValue;
    }
);

watch(
    () => props.loading,
    (newValue: any) => {
        avatarSpinner.value = newValue;
    }
);
</script>

<style lang="scss">
.wts-avatar {
    align-items: center;
    background: var(--s-primary-bg-weak-default);
    border-radius: var(--s-radius-xxl);
    color: var(--s-primary-txt-default);
    display: flex;
    flex-shrink: 0;
    height: var(--s-sizing-m);
    justify-content: center;
    overflow: hidden;
    width: var(--s-sizing-m);

    //default text/initials
    span {
        font-family: Inter;
        font-style: normal;
        font-variant-numeric: lining-nums tabular-nums;
        font-weight: 400;
        text-align: center;
    }

    //default icon color
    i {
        color: var(--s-primary-icon-default);
    }

    //hover background,all icons and text(initials)
    &:hover {
        background: var(--s-primary-bg-weak-hover);
        i {
            color: var(--s-primary-icon-hover) !important;
        }
        span {
            color: var(--s-primary-txt-hover) !important;
        }
    }

    //make the image fit the outer container size
    img {
        background: lightgray 50% / cover no-repeat;
        border-radius: var(--s-radius-xxl);
        height: 100%;
        object-fit: cover;
        width: 100%;

        //hover image
        &:hover {
            opacity: 0.75;
        }
    }

    //animate loading icon
    .wts-avatar-loader {
        animation: rotation infinite 3s linear;
    }

    .wts-avatar-initials {
        font-size: 13px;
        line-height: 20px;
    }

    &.wts-avatar-disabled {
        background: var(--s-primary-bg-weak-disabled);
        color: var(--s-primary-txt-disabled);
        opacity: 0.5;
        pointer-events: none;
    }

    &.wts-avatar-s .wts-avatar-initials {
        font-size: 10px;
        line-height: 10px;
    }

    &.wts-avatar-m {
        height: var(--s-sizing-l);
        width: var(--s-sizing-l);
    }

    &.wts-avatar-l {
        height: var(--s-sizing-xl);
        width: var(--s-sizing-xl);
    }

    &.wts-avatar-xl {
        height: var(--s-sizing-xxl);
        width: var(--s-sizing-xxl);
    }
}
</style>
