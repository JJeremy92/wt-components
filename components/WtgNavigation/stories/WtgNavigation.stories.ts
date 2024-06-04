import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import WtgNavigation from '../WtgNavigation.vue';
import { WtgApp } from '../..';

type Story = StoryObj<typeof WtgNavigation>;
const meta: Meta<typeof WtgNavigation> = {
    title: 'Components/Navigation',
    component: WtgNavigation,
    parameters: {
        docs: {
            description: {
                component:
                    'Navigation is used to display a list of links that users use to move between sections of the application or between different branches and portals within the product',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=310-18203&mode=design&t=oplTXzKNXa2TywCM-0',
        },
        layout: 'fullscreen',
    },
    render: (args) => ({
        components: { WtgNavigation, WtgApp },
        methods: {
            action: action('click'),
        },
        setup: () => ({ args }),
        template: `<wtg-app><wtg-navigation v-bind="args"/></wtg-app>`,
    }),
};
export default meta;
export const Default: Story = {
    args: {
        portalCode: 'HR',
        title: 'Human Resources',
    },
};
