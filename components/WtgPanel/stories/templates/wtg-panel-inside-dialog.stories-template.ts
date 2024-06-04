export const WtgPanelInsideDialogTemplate = `
<v-dialog>
    <template v-slot:activator="{ props }">
        <wtg-button v-bind="props" variant="primary">Click me</wtg-button>
    </template>
    <template v-slot:default="{ isActive }">
        <wtg-panel>
            <div style="display: flex;flex-direction:row; align-items: center; gap:10px">
                <wtg-badge type="info"></wtg-badge>
                <div>This panel shows text only</div>
            </div>
        </wtg-panel>
        <wtg-panel caption="Main Panel Header">
            <div style="display: flex;flex-direction:row;gap:10px">
                <wtg-checkbox label="Option 1" :isSelected="true"></wtg-checkbox>
                <wtg-checkbox label="Option 2"></wtg-checkbox>
                <wtg-checkbox label="Option 3"></wtg-checkbox>
                <wtg-checkbox label="Option 4"></wtg-checkbox>
            </div>
            <wtg-switch label="My Switch"></wtg-switch>
            <wtg-tooltip text="This is a demo panel">
                <div style="display: flex;flex-direction:row; align-items: center; gap:10px">
                    <div>Hover me!</div>
                    <wtg-icon icon="$message-alert"> </wtg-icon>
                </div>
            </wtg-tooltip>
            <hr/>
            <wtg-radio label="Please tick this before you proceed"></wtg-radio>
            <div style="display: flex;flex-direction:row;justify-content:flex-end;gap:10px">
                <wtg-button @click="isActive.value = false">Cancel</wtg-button>
                <wtg-button variant="primary">Apply</wtg-button>
            </div>
        </wtg-panel>
    </template>
</v-dialog>
`;
