import WtgChip from '../WtgChip.vue';
import { Meta, StoryObj } from '@storybook/vue3';

type Story = StoryObj<typeof WtgChip>;

const meta: Meta<typeof WtgChip> = {
    title: 'Components/Chip',
    component: WtgChip,
    parameters: {
        docs: {
            description: {
                component:
                    'A chip is a small, modular element that is used to denote key information or the status of a related item, object or entity.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=149-5674&mode=design&t=FoGkzhcXiCnlZFCr-0',
        },
    },
    tags: ['autodocs'],
    render: (args) => ({
        components: { WtgChip },
        setup: () => ({ args }),
        template: '<wtg-chip v-bind="args">{{ label }}</wtg-chip>',
    }),
    argTypes: {
        color: {
            options: ['default', 'primary', 'info', 'success', 'warning', 'error'],
            control: { type: 'select' },
        },
    },
};

export default meta;

export const Primary: Story = {
    args: {
        label: 'My Chip',
        condensed: false,
        isDismissable: true,
        prependIcon: '$placeholder',
    },
};
