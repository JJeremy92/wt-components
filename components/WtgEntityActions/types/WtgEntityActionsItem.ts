export type WtgEntityActionsItemType = {
    disabled: boolean;
    id?: string;
    label: string;
    icon?: string;
};
export class WtgEntityActionsItem {
    disabled: boolean;
    id?: string;
    label: string;
    icon?: string;
    constructor(item: WtgEntityActionsItemType) {
        this.disabled = item.disabled;
        this.icon = item.icon;
        this.id = item.id;
        this.label = item.label;
    }
}
