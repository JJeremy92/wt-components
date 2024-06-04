import { h, VNode, defineComponent } from 'vue';
import { VCol } from 'vuetify/components/VGrid';
import { layoutGridColumnKey } from './keys';

declare interface ColumnProps {
    cols: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    order: number;
    orderSm?: number;
    orderMd?: number;
    orderLg?: number;
    orderXl?: number;
}

function stringToColumn(str: string): number {
    const column = Number(str);
    if (Number.isNaN(column) || column < 1 || column > 12) {
        return 0;
    }
    return column;
}

const cache = new Map<string, ColumnProps>();

function columnProps(columns?: string): ColumnProps {
    const props = { cols: 12 } as ColumnProps;

    if (!columns) {
        return props;
    }

    const cached = cache.get(columns);
    if (cached) {
        return cached;
    }

    const tokenArray = columns.split(' ');
    for (const token of tokenArray) {
        const parts = token.split('-');
        if (parts[0] === 'col') {
            if (parts.length === 2) {
                const value = stringToColumn(parts[1]);
                if (value) {
                    props.cols = value;
                }
            } else if (parts.length === 3) {
                const breakPoint = parts[1];
                const value = stringToColumn(parts[2]);
                if (value) {
                    switch (breakPoint) {
                        case 'sm':
                            props.sm = value;
                            break;
                        case 'md':
                            props.md = value;
                            break;
                        case 'lg':
                            props.lg = value;
                            break;
                        case 'xl':
                            props.xl = value;
                            break;
                    }
                }
            }
        } else if (parts[0] === 'order') {
            if (parts.length === 2) {
                const value = stringToColumn(parts[1]);
                if (value) {
                    props.order = value;
                }
            } else if (parts.length === 3) {
                const breakPoint = parts[1];
                const value = stringToColumn(parts[2]);
                if (value) {
                    switch (breakPoint) {
                        case 'sm':
                            props.orderSm = value;
                            break;
                        case 'md':
                            props.orderMd = value;
                            break;
                        case 'lg':
                            props.orderLg = value;
                            break;
                        case 'xl':
                            props.orderXl = value;
                            break;
                    }
                }
            }
        }
    }
    cache.set(columns, props);
    return props;
}

export default defineComponent({
    provide(): Record<symbol, unknown> {
        return {
            [layoutGridColumnKey]: this,
        };
    },
    data() {
        return {
            visible: true,
            columns: '',
        };
    },
    methods: {
        updateColumns(columns: string): void {
            this.columns = columns;
        },
        updateVisibility(visible: boolean): void {
            this.visible = visible;
        },
    },
    render(): VNode {
        return h(VCol, { ...columnProps(this.columns), class: { 'd-none': !this.visible } }, this.$slots.default);
    },
});
