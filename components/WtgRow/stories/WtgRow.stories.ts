import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import WtgRow from '../WtgRow.vue';

type Story = StoryObj<typeof WtgRow>;
const meta: Meta<typeof WtgRow> = {
    title: 'Layouts/Row',
    component: WtgRow,
    parameters: {
        docs: {
            description: {
                component: 'Row is a sub-component used to create rows in a responsive Grid.',
            },
        },
    },
    render: (args) => ({
        components: { WtgRow },
        setup: () => ({ args }),
        methods: {
            changeAction: action('change'),
        },
        template: '<wtg-row v-bind="args"/>',
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
    args: {},
};
