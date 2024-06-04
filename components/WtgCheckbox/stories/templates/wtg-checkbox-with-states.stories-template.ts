export const CheckboxWithStatesTemplate = `
    <wtg-checkbox label="Default" @change="changeAction"></wtg-checkbox>
    <wtg-checkbox label="Selected" model-value="true" @change="changeAction"></wtg-checkbox>
    <wtg-checkbox label="Disabled" :disabled="true" @change="changeAction"></wtg-checkbox>
    <wtg-checkbox label="Selected and Disabled" :model-value="true" :disabled="true" @change="changeAction"></wtg-checkbox>
    <wtg-checkbox label="Invalid" :isInvalid="true" @change="changeAction"></wtg-checkbox>
`;
