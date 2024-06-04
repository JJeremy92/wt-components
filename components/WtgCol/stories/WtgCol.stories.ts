import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import WtgCol from '../WtgCol.vue';

type Story = StoryObj<typeof WtgCol>;
const meta: Meta<typeof WtgCol> = {
    title: 'Layouts/Col',
    component: WtgCol,
    parameters: {
        docs: {
            description: {
                component: 'Col is a sub-component used to create columns in a responsive Grid.',
            },
        },
    },
    render: (args) => ({
        components: { WtgCol },
        setup: () => ({ args }),
        methods: {
            changeAction: action('change'),
        },
        template: '<wtg-col v-bind="args"/>',
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
