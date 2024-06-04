import WtgPasswordTextField from '..';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import { WtgPasswordControlsWithMessagesTemplate } from './templates';

type Story = StoryObj<typeof WtgPasswordTextField>;
const meta: Meta<typeof WtgPasswordTextField> = {
    title: 'Components/Inputs/Password',
    component: WtgPasswordTextField,
    parameters: {
        docs: {
            description: {
                component:
                    'TextFields are used to allow users to provide text input when the expected input is short. As well as plain text, Input supports various types of text, including passwords and numbers.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=197-16949&mode=design&t=vynEI3YJJbgeF8YH-0',
        },
    },
    render: (args) => ({
        components: { WtgPasswordTextField },
        setup: () => ({ args }),
        methods: { changeAction: action('change'), focusAction: action('focus'), blurAction: action('blur') },
        template: `<wtg-password-text-field 
                                            v-bind="args"  
                                            @change="changeAction" 
                                            @focus="focusAction"
                                            @blur="blurAction">
                    </wtg-password-text-field>`,
    }),
    argTypes: {},
    decorators: [
        () => ({
            template: `
            <div style="display: flex; flex-direction: column; gap:20px">
                <story/>
            </div>
            `,
        }),
    ],
};
export default meta;
export const Default: Story = {
    args: {
        label: 'Please enter your password',
        isValid: false,
        isWarning: false,
        isInvalid: false,
        isDisabled: false,
        isReadOnly: false,
        isLoading: false,
        messages: [],
        trailingInnerIcon: '',
        trailingIcon: '',
        leadingInnerIcon: '',
        leadingIcon: '',
        value: '',
    },
};
export const WithMessages: Story = {
    args: {
        value: 'password',
    },
    render: (args) => ({
        components: { WtgPasswordTextField },
        setup: () => ({ args }),
        methods: { changeAction: action('change'), focusAction: action('focus'), blurAction: action('blur') },
        template: WtgPasswordControlsWithMessagesTemplate,
    }),
};
