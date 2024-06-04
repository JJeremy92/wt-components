export const RadioWithStatesTemplate = `
    <wtg-radio label="Default" @change="changeAction"></wtg-radio>
    <wtg-radio label="Checked" model-value="true" @change="changeAction"></wtg-radio>
    <wtg-radio label="Disabled" :disabled="true" @change="changeAction"></wtg-radio>
    <wtg-radio label="Checked and Disabled" model-value="true" :disabled="true" @change="changeAction"></wtg-radio>
    <wtg-radio label="Invalid" :isInvalid="true" @change="changeAction"></wtg-radio>
`;
