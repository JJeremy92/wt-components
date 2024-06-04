import { defineComponent, h, useAttrs, useSlots, VNode } from 'vue';
import { VRow } from 'vuetify/components/VGrid';
import WtgLayoutGridColumn from './WtgLayoutGridColumn';
import { layoutGridColumnProps, useLayoutGridColumn } from '../../composables/layoutGridColumn/layoutGridColumn';

export default defineComponent({
    props: {
        noGutters: {
            type: Boolean,
            default: false,
        },
        ...layoutGridColumnProps,
    },
    setup(props: any) {
        const attrs = useAttrs();
        const slots = useSlots();
        useLayoutGridColumn(props);
        return () => {
            const data = {
                attrs,
                ...props,
            };
            const cols = [] as VNode[];
            if (slots.default) {
                const slot = slots.default() || [];
                for (let index = 0; index < slot.length; ++index) {
                    const node = slot[index];
                    if (node.children !== 'v-if') {
                        const dataAttrs = node.props;
                        if (dataAttrs && dataAttrs['data-wtg-layout-grid-ignore'] !== undefined) {
                            cols.push(node);
                        } else {
                            const col = h(WtgLayoutGridColumn, {}, [node]);
                            cols.push(col);
                        }
                    }
                }
            }
            return h(VRow, data, cols);
        };
    },
});
