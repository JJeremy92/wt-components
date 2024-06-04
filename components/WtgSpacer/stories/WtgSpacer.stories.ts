import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import WtgSpacer from '../WtgSpacer.vue';

type Story = StoryObj<typeof WtgSpacer>;
const meta: Meta<typeof WtgSpacer> = {
    title: 'Layouts/Spacer',
    component: WtgSpacer,
    parameters: {
        docs: {
            description: {
                component:
                    'Spacer is often used in grid scenarios. It is a basic yet versatile spacing component used to distribute remaining width in-between a parents child components. When placing a single spacer before or after the child components, the components will push to the right and left of its container. When more than one spacer’s are used between multiple components, the remaining width is evenly distributed between each spacer.',
            },
        },
    },
    render: (args) => ({
        components: { WtgSpacer },
        setup: () => ({ args }),
        methods: {
            changeAction: action('change'),
        },
        template: '<wtg-spacer v-bind="args"/>',
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
