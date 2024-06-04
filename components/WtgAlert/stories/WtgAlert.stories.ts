import WtgAlert from '../WtgAlert.vue';
import { Meta, StoryObj } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';

type Story = StoryObj<typeof WtgAlert>;

const meta: Meta<typeof WtgAlert> = {
    title: 'Components/Alert',
    component: WtgAlert,
    parameters: {
        docs: {
            description: {
                component:
                    'An alert component is a user interface element that is used in a design system to provide feedback or notify users of important information.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=553-67380&mode=design&t=Xv306sPXw5Tx3aqC-0',
        },
    },
    tags: ['autodocs'],
    render: (args) => ({
        components: { WtgAlert },
        setup: () => ({ args }),
        methods: {
            closeAction: action('close'),
        },
        template: '<wtg-alert v-bind="args" @close="closeAction"></wtg-alert>',
    }),
    argTypes: {
        color: {
            options: ['info', 'success', 'warning', 'error'],
            control: { type: 'select' },
        },
        variant: {
            options: ['default', 'inline'],
            control: { type: 'select' },
        },
    },
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Default: Story = {
    args: {
        title: true,
        isDismissible: true,
        color: 'info',
        variant: 'default',
        titleText: 'Alert Title',
        description: 'Description of the alert that has been triggered.',
    },
};
