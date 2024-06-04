import WtgTimeField from '..';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';

type Story = StoryObj<typeof WtgTimeField>;
const meta: Meta<typeof WtgTimeField> = {
    title: 'Components/Inputs/Time',
    component: WtgTimeField,
    parameters: {
        docs: {
            description: {
                component:
                    'TimeField is a specifically designed to allow users to enter or select a time and timezone from a dropdown.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=419-37504&mode=design&t=raXPFWS6gFHyS6bj-0',
        },
    },
    render: (args) => ({
        components: { WtgTimeField },
        setup: () => ({ args }),
        methods: { change: action('change'), blur: action('blur') },
        template: `<wtg-time-field v-bind="args">
                                    @change="change"
                                    @blur="blur"
                    </wtg-time-field>`,
    }),
    argTypes: {},
};

export default meta;
export const Default: Story = {
    args: {
        label: 'Label',
        useSeconds: false,
        isValid: false,
        isWarning: false,
        isInvalid: false,
        isDisabled: false,
        isReadOnly: false,
        isLoading: false,
        messages: [],
        trailingInnerIcon: '$placeholder',
        trailingIcon: '',
        leadingInnerIcon: '',
        leadingIcon: '',
        value: '',
    },
};
