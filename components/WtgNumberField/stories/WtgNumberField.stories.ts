import WtgNumberField from '..';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import { NumericControlsWithIconsTemplate, NumericControlsWithMessagesTemplate } from './templates';

type Story = StoryObj<typeof WtgNumberField>;
const meta: Meta<typeof WtgNumberField> = {
    title: 'Components/Inputs/Numeric',
    component: WtgNumberField,
    parameters: {
        docs: {
            description: {
                component: 'NumberField is used to allow users to provide number input.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=197-16949&mode=design&t=vynEI3YJJbgeF8YH-0',
        },
    },
    render: (args) => ({
        components: { WtgNumberField },
        setup: () => ({ args }),
        methods: {
            inputAction: action('input'),
            changeAction: action('change'),
            focusAction: action('focus'),
            blurAction: action('blur'),
            updateAction: action('update:modelValue'),
        },
        template: `<wtg-number-field 
                        v-bind="args"
                        @change="changeAction" 
                        @input="inputAction"
                        @focus="focusAction"
                        @blur="blurAction"
                        @update:modelValue="updateAction">
                    </wtg-number-field>`,
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
        label: 'Label',
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
        decimals: 2,
        modelValue: '200',
    },
};

export const WithIcons: Story = {
    args: {
        label: 'Please enter an amount',
        min: 0,
        max: 20000,
        modelValue: 200,
    },
    render: (args) => ({
        components: { WtgNumberField },
        setup: () => ({ args }),
        methods: {
            changeAction: action('change'),
            focusAction: action('focus'),
            blurAction: action('blur'),
        },
        template: NumericControlsWithIconsTemplate,
    }),
};

export const WithMessages: Story = {
    args: {
        label: '',
        min: 0,
        max: 20000,
    },
    render: (args) => ({
        components: { WtgNumberField },
        setup: () => ({ args }),
        methods: {
            changeAction: action('input'),
            focusAction: action('focus'),
            blurAction: action('blur'),
        },
        template: NumericControlsWithMessagesTemplate,
    }),
};
