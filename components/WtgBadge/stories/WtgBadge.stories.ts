import WtgBadge from '../WtgBadge.vue';
import { Meta, StoryObj } from '@storybook/vue3';

type Story = StoryObj<typeof WtgBadge>;

const meta: Meta<typeof WtgBadge> = {
    title: 'Components/Badge',
    component: WtgBadge,
    parameters: {
        docs: {
            description: {
                component:
                    'A Badge component is used to indicate certain status or characteristics of an item has changed based on an action.',
            },
        },
    },
    tags: ['autodocs'],
    render: (args) => ({
        components: { WtgBadge },
        setup: () => ({ args }),
        template: '<wtg-badge v-bind="args"></wtg-badge>',
    }),
    argTypes: {
        type: {
            options: ['notification', 'error', 'warning', 'success', 'info', 'custom'],
            control: { type: 'select' },
        },
    },
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Primary: Story = {
    args: {
        type: 'notification',
        customIcon: '$placeholder',
    },
};
