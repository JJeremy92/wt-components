import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import WtgApp from '../../WtgApp';
import WtgMain from '../WtgMain.vue';

type Story = StoryObj<typeof WtgMain>;
const meta: Meta<typeof WtgMain> = {
    title: 'Layouts/Main',
    component: WtgMain,
    parameters: {
        docs: {
            description: {
                component: 'Main is used to contain the main content of an application. It is a structural component part of the layout system that allows you to easily create complex website designs.',
            },
        },
    },
    render: (args) => ({
        components: { WtgApp, WtgMain },
        setup: () => ({ args }),
        methods: {
            changeAction: action('change'),
        },
        template: '<wtg-app><wtg-main v-bind="args"/></wtg-app>',
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
