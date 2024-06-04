import { PropType, computed } from 'vue';

interface SizeProps {
    size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
}

export const sizeArgTypes = {
    size: {
        options: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
        control: { type: 'select' },
    },
};

export const sizeProps = {
    size: { type: String as PropType<'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'>, default: undefined },
};

export const useSize = (props: SizeProps, component: string) => {
    const sizeClass = computed(() => (props.size ? `wts-${component}-${props.size}` : ''));
    return { sizeClass };
};
