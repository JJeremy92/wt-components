import { inject, provide, watch } from 'vue';
import { layoutGridColumnKey } from '../../components/WtgLayoutGrid/keys';

interface LayoutGridColumnProps {
    columns?: string;
}

function isColumnPrefix(str: string): boolean {
    return str === 'col';
}

function isOrderPrefix(str: string): boolean {
    return str === 'order';
}

function isBreakpoint(str: string): boolean {
    return ['sm', 'md', 'lg', 'xl'].includes(str);
}

function isValidColumn(str: string): boolean {
    const column = Number(str);
    if (Number.isNaN(column) || column < 1 || column > 12 || str[0] === '0') {
        return false;
    }
    return true;
}

function isValidOrder(str: string): boolean {
    const column = Number(str);
    if (Number.isNaN(column) || column < 1 || str[0] === '0') {
        return false;
    }
    return true;
}

function isColumnsForBreakpoint(token: string): boolean {
    const parts = token.split('-');
    if (parts.length === 2 && isColumnPrefix(parts[0]) && isValidColumn(parts[1])) {
        return true;
    }
    if (parts.length === 3 && isColumnPrefix(parts[0]) && isBreakpoint(parts[1]) && isValidColumn(parts[2])) {
        return true;
    }
    if (parts.length === 2 && isOrderPrefix(parts[0]) && isValidOrder(parts[1])) {
        return true;
    }
    if (parts.length === 3 && isOrderPrefix(parts[0]) && isBreakpoint(parts[1]) && isValidOrder(parts[2])) {
        return true;
    }
    return false;
}

export function validateColumns(columns?: string): boolean {
    if (columns) {
        const tokenArray = columns.split(' ');
        for (const token of tokenArray) {
            if (!isColumnsForBreakpoint(token)) {
                return false;
            }
        }
    }
    return true;
}

export const layoutGridColumnProps = {
    columns: {
        type: String,
        default: undefined,
        validator: validateColumns,
    },
};

export const layoutGridColumnArgTypes = {
    columns: {
        control: 'text',
    },
};

export const useLayoutGridColumn = (props: LayoutGridColumnProps) => {
    const layoutGridColumn: any = inject(layoutGridColumnKey, undefined);
    provide(layoutGridColumnKey, undefined);
    if (layoutGridColumn) {
        watch(
            () => props.columns,
            (columns) => layoutGridColumn.updateColumns(columns),
            { immediate: true }
        );
    }
};
