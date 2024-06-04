import WtgSwitch from '../WtgSwitch.vue';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import { SwitchWithStatesTemplate } from './templates';

type Story = StoryObj<typeof WtgSwitch>;

const meta: Meta<typeof WtgSwitch> = {
    title: 'Components/Switch',
    component: WtgSwitch,
    parameters: {
        docs: {
            description: {
                component: 'A selection control, also known as a toggle, that allows users to turn a setting on or off.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=3789-1898&mode=design&t=E83QXaanpQcOYKS3-0',
        },
    },
    render: (args) => ({
        components: { WtgSwitch },
        setup: () => ({ args }),
        methods: {
            changeAction: action('change'),
        },
        template: '<wtg-switch v-bind="args"  @change="changeAction">{{ label }}</wtg-switch>',
    }),
    argTypes: {},
    decorators: [
        () => ({
            template: `
            <div style="display: flex; flex-wrap: wrap;">
                <story/>
            </div>
            `,
        }),
    ],
};

export default meta;
export const Default: Story = {
    args: {
        label: 'My Switch',
    },
};

export const States: Story = {
    render: (args) => ({
        components: { WtgSwitch },
        setup: () => ({ args }),
        methods: {
            changeAction: action('change'),
        },
        template: SwitchWithStatesTemplate,
    }),
};
