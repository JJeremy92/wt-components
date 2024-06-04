import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import { WtgTab } from '..';
import WtgTabs from '../WtgTabs.vue';
import { WtgTabsStoriesTemplate } from './templates';

type Story = StoryObj<typeof WtgTabs>;
const meta: Meta<typeof WtgTabs> = {
    title: 'Components/Tabs',
    component: WtgTabs,
    parameters: {
        docs: {
            description: {
                component:
                    'Tabs allows multiple panels to be contained within a single window. Tabs can be used as a navigational element to organise content within a related entity or page.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?node-id=633%3A133578&mode=dev',
        },
    },
    render: (args) => ({
        components: { WtgTabs, WtgTab },
        setup: () => ({ args }),
        methods: {
            action: action('tab-change'),
        },
        template: WtgTabsStoriesTemplate,
    }),
};

export default meta;
export const Default: Story = {
    args: {
        isMobile: false,
    },
};
export const MobileMode: Story = {
    args: {
        isMobile: true,
    },
};
