export const IndeterminedCheckboxTemplate = `
    <wtg-checkbox :indeterminate="true" label="Default" @change="changeAction" style="margin-right:2em;"></wtg-checkbox>
    <wtg-checkbox :indeterminate="true" label="Disabled" :disabled="true" @change="changeAction" style="margin-right:2em;"></wtg-checkbox>
    <wtg-checkbox :indeterminate="true" label="Invalid" :isInvalid="true" @change="changeAction" style="margin-right:2em;"></wtg-checkbox>
`;
