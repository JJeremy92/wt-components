import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import WtgDivider from '../WtgDivider.vue';

type Story = StoryObj<typeof WtgDivider>;
const meta: Meta<typeof WtgDivider> = {
    title: 'Components/Divider',
    component: WtgDivider,
    parameters: {
        docs: {
            description: {
                component: 'The wtg-divider component is used to separate sections of lists or layouts.',
            },
        },
    },
    render: (args) => ({
        components: { WtgDivider },
        setup: () => ({ args }),
        methods: {
            changeAction: action('change'),
        },
        template: '<wtg-divider v-bind="args"/>',
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
