import WtgDateField from '..';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';

type Story = StoryObj<typeof WtgDateField>;
const meta: Meta<typeof WtgDateField> = {
    title: 'Components/Inputs/Date',
    component: WtgDateField,
    parameters: {
        docs: {
            description: {
                component:
                    'TextFields are used to allow users to provide text input when the expected input is short. As well as plain text, Input supports various types of text, including passwords and numbers.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=383-43226',
        },
    },
    render: (args) => ({
        components: { WtgDateField },
        setup: () => ({ args }),
        methods: {
            change: action('change'),
        },
        template: `<wtg-date-field
                        v-bind="args"
                        @change="change">
                    </wtg-date-field>`,
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
    }),
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
        modelValue: '08-Jan-24',
    },
};
