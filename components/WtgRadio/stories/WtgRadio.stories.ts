import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import WtgRadio from '../WtgRadio.vue';
import { RadioWithStatesTemplate } from './templates';

type Story = StoryObj<typeof WtgRadio>;
const meta: Meta<typeof WtgRadio> = {
    title: 'Components/Radio',
    component: WtgRadio,
    parameters: {
        docs: {
            description: {
                component: 'Radio buttons are graphical user interface elements that allow a user to choose only one option from a small set of predefined,mutually exclusive options.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=149-5677&mode=design&t=FoGkzhcXiCnlZFCr-0',
        },
    },
    render: (args) => ({
        components: { WtgRadio },
        setup: () => ({ args }),
        methods: {
            changeAction: action('change'),
        },
        template: '<wtg-radio v-bind="args" @change="changeAction"></wtg-radio>',
    }),
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
        label: 'Check me',
    },
};

export const States: Story = {
    render: (args) => ({
        components: { WtgRadio },
        setup: () => ({ args }),
        methods: {
            changeAction: action('change'),
        },
        template: RadioWithStatesTemplate,
    }),
};
