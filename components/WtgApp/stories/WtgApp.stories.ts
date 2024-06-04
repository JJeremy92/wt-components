import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import WtgApp from '../WtgApp.vue';
import WtgNavigation from '../../WtgNavigation/WtgNavigation.vue';

type Story = StoryObj<typeof WtgApp>;
const meta: Meta<typeof WtgApp> = {
    title: 'Layouts/App',
    component: WtgApp,
    parameters: {
        docs: {
            description: {
                component: 'App is the outermost component of an application. It enables the layout system that allows you to easily create complex website designs.',
            },
        },
    },
    render: (args) => ({
        components: { WtgApp, WtgNavigation },
        setup: () => ({ args }),
        methods: {
            changeAction: action('change'),
        },
        template: '<wtg-app><wtg-navigation v-bind="args"/></wtg-app>',
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
