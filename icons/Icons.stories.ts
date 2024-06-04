import { StoryObj } from '@storybook/vue3';
import IconsPage from './IconsPage.vue';

type Story = StoryObj<typeof IconsPage>;

const meta = {
    title: 'Icons/Icons',
};
export default meta;
export const IconSearch: Story = {
    render: () => ({
        components: { IconsPage },
        template: '<icons-page></icons-page>',
    }),
};
