import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import WtgEntityActions from '../WtgEntityActions.vue';

const items = [
    {
        label: 'Workflow',
        icon: '$workflow',
    },
    {
        label: 'eDocs',
        icon: '$eDocs',
    },
    {
        label: 'Documents',
        icon: '$file',
    },
    {
        label: 'Related Items',
        icon: '$related-records',
    },
    {
        label: 'Notes',
        icon: '$notes',
    },
    {
        label: 'Messages',
        icon: '$chat',
        disabled: true,
    },
    {
        label: 'Logs',
        icon: '$logs',
    },
];
type Story = StoryObj<typeof WtgEntityActions>;
const meta: Meta<typeof WtgEntityActions> = {
    title: 'Components/EntityActions',
    component: WtgEntityActions,
    parameters: {
        docs: {
            description: {
                component:
                    'EntityActions are a collection of entity specific actions you can perform based on where you are in the product and what is available on the current page.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=684-32659&mode=design&t=Id65DtVyTBzfOExN-0',
        },
    },
    render: (args) => ({
        components: { WtgEntityActions },
        setup: () => ({ args }),
        methods: {
            action: action('click'),
        },
        template: '<wtg-entity-actions v-bind="args" @click="action"></wtg-entity-actions>',
    }),
    decorators: [
        () => ({
            template: `
            <div style="display:flex;flex-direction:row">
                <story/>
            </div>
            `,
        }),
    ],
};

export default meta;
export const Default: Story = {
    args: {
        items,
    },
};
export const MobileMode: Story = {
    args: {
        items,
        isMobile: true,
    },
};
