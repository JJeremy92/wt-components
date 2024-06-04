export const WtgPasswordControlsWithMessagesTemplate = `
    <wtg-password-text-field
        v-bind="args"
        :is-invalid="true"
        :messages="['Please enter a valid password.']"
        @change="changeAction"
        @focus="focusAction"
        @blur="blurAction">
    </wtg-password-text-field>
    <wtg-password-text-field
        v-bind="args"
        :is-warning="true"
        :messages="['Password quality: weak']"
        @change="changeAction" 
        @focus="focusAction"
        @blur="blurAction">
    </wtg-password-text-field>
    <wtg-password-text-field
        v-bind="args"
        :is-valid="true"
        :messages="['Password quality: strong']"
        @change="changeAction"
        @focus="focusAction"
        @blur="blurAction">
    </wtg-password-text-field>
`;
