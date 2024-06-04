import { computed, PropType } from 'vue';

function convertToUnit(str: string | number | null | undefined, unit = 'px'): string | undefined {
    if (str == null || str === '') {
        return undefined;
    } else if (str && isNaN(+str)) {
        return String(str);
    } else {
        return `${Number(str)}${unit}`;
    }
}

interface MeasureProps {
    height?: number | string;
    maxHeight?: number | string;
    maxWidth?: number | string;
    minHeight?: number | string;
    minWidth?: number | string;
    width?: number | string;
}

export const measureArgTypes = {
    height: {
        control: 'text',
    },
    maxHeight: {
        control: 'text',
    },
    maxWidth: {
        control: 'text',
    },
    minHeight: {
        control: 'text',
    },
    minWidth: {
        control: 'text',
    },
    width: {
        control: 'text',
    },
};

export const measureProps = {
    height: {
        type: [Number, String] as PropType<string | number | undefined>,
        default: undefined,
    },
    maxHeight: {
        type: [Number, String] as PropType<string | number | undefined>,
        default: undefined,
    },
    maxWidth: {
        type: [Number, String] as PropType<string | number | undefined>,
        default: undefined,
    },
    minHeight: {
        type: [Number, String] as PropType<string | number | undefined>,
        default: undefined,
    },
    minWidth: {
        type: [Number, String] as PropType<string | number | undefined>,
        default: undefined,
    },
    width: {
        type: [Number, String] as PropType<string | number | undefined>,
        default: undefined,
    },
};

export const useMeasure = (props: MeasureProps) => {
    const measurableStyles = computed(() => {
        const styles: Record<string, string> = {};

        const height = convertToUnit(props.height);
        const minHeight = convertToUnit(props.minHeight);
        const minWidth = convertToUnit(props.minWidth);
        const maxHeight = convertToUnit(props.maxHeight);
        const maxWidth = convertToUnit(props.maxWidth);
        const width = convertToUnit(props.width);

        if (height) styles.height = height;
        if (minHeight) styles.minHeight = minHeight;
        if (minWidth) styles.minWidth = minWidth;
        if (maxHeight) styles.maxHeight = maxHeight;
        if (maxWidth) styles.maxWidth = maxWidth;
        if (width) styles.width = width;

        return styles;
    });

    return { measurableStyles };
};
