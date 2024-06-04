export const SwitchWithStatesTemplate = `
    <wtg-switch label="Default" @change="changeAction"></wtg-switch>
    <wtg-switch label="Selected" model-value="true" @change="changeAction"></wtg-switch>
    <wtg-switch label="Disabled" :disabled="true" @change="changeAction"></wtg-switch>
    <wtg-switch label="Selected and Disabled" :model-value="true" :disabled="true" @change="changeAction"></wtg-switch>
    <wtg-switch label="Invalid" :isInvalid="true" @change="changeAction"></wtg-switch>
`;
