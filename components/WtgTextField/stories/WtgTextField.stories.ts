import WtgTextField from '..';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';

type Story = StoryObj<typeof WtgTextField>;
const meta: Meta<typeof WtgTextField> = {
    title: 'Components/Inputs/Text',
    component: WtgTextField,
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
        components: { WtgTextField },
        setup: () => ({ args }),
        methods: { changeAction: action('change'), focusAction: action('focus'), blurAction: action('blur') },
        template: `<wtg-text-field v-bind="args"  
                                                    @change="changeAction"
                                                    @focus="focusAction"
                                                    @blur="blurAction">
                    </wtg-text-field>`,
    }),
    argTypes: {},
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
        trailingInnerIcon: '$placeholder',
        trailingIcon: '',
        leadingInnerIcon: '',
        leadingIcon: '',
        value: '',
    },
};
