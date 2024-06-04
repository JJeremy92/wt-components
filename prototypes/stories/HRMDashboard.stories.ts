import HRMDashboard from '../HRMDashboard.vue';
import { Meta, StoryObj } from '@storybook/vue3';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof HRMDashboard> = {
    title: 'Layouts/Samples/HRM Dashboard',
    component: HRMDashboard,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof HRMDashboard>;

export const Default: Story = {
    args: {},
};
