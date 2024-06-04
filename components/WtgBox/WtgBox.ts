import { defineComponent, h, PropType, VNode, useSlots } from 'vue';
import WtgLayoutGrid from '../WtgLayoutGrid';
import { layoutProps, useLayout } from '../../composables/layoutGrid';
import { measureProps, useMeasure } from '../../composables/measure';
import { layoutGridColumnProps, useLayoutGridColumn } from '../../composables/layoutGridColumn/';

export default defineComponent({
    name: 'WtgBox',
    props: {
        absolute: {
            type: Boolean,
            default: false,
        },
        bottom: {
            type: [Number, String] as PropType<number | string | undefined>,
            default: undefined,
        },
        left: {
            type: [Number, String] as PropType<number | string | undefined>,
            default: undefined,
        },
        right: {
            type: [Number, String] as PropType<number | string | undefined>,
            default: undefined,
        },
        top: {
            type: [Number, String] as PropType<number | string | undefined>,
            default: undefined,
        },
        ...layoutGridColumnProps,
        ...layoutProps,
        ...measureProps,
    },
    setup(props) {
        useLayoutGridColumn(props);
        const { layoutClasses } = useLayout(props);
        const { measurableStyles } = useMeasure(props);
        const slots = useSlots();

        return { layoutClasses, measurableStyles, slots };
    },
    computed: {
        style(): {} {
            if (!this.absolute) {
                return this.measurableStyles;
            }

            let bottom = this.bottom;
            let left = this.left;
            let right = this.right;
            let top = this.top;

            let number = Number(bottom);
            if (!isNaN(number)) {
                bottom = number.toString() + 'px';
            }

            number = Number(left);
            if (!isNaN(number)) {
                left = number.toString() + 'px';
            }

            number = Number(right);
            if (!isNaN(number)) {
                right = number.toString() + 'px';
            }

            number = Number(top);
            if (!isNaN(number)) {
                top = number.toString() + 'px';
            }

            return {
                ...this.measurableStyles,
                position: 'absolute',
                bottom,
                left,
                right,
                top,
            };
        },
    },
    render(): VNode {
        const slot = this.slots.default ? this.slots.default() : [];
        const data = {
            class: this.layoutClasses,
            ...this.$props,
            style: this.style,
        };
        if (this.layout === 'grid') {
            return h(WtgLayoutGrid, data, slot);
        } else {
            return h('div', data, slot);
        }
    },
});
