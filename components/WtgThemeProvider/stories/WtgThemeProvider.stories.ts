import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import WtgThemeProvider from '../WtgThemeProvider.vue';
import WtgButton from '../../WtgButton';
import WtgCheckbox from '../../WtgCheckbox/WtgCheckbox.vue';
import WtgPanel from '../../WtgPanel/WtgPanel.vue';
import LightDarkCaption from './LightDarkCaption.vue';

type Story = StoryObj<typeof WtgThemeProvider>;
const meta: Meta<typeof WtgThemeProvider> = {
    title: 'Components/Theme Provider',
    component: WtgThemeProvider,
    parameters: {
        docs: {
            description: {
                component: 'Theme Provider allows you to apply different themes to different parts of your applicaiton',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=149-5673&mode=design&t=FoGkzhcXiCnlZFCr-0',
        },
    },
    tags: ['autodocs'],
    render: (args) => ({
        components: { WtgThemeProvider, WtgButton, WtgPanel, WtgCheckbox, LightDarkCaption },
        setup: () => {
            return { args };
        },
        methods: {
            changeAction: action('change'),
        },
        template: `
        <div style="display: flex; gap: 8px;">
            <wtg-theme-provider style="flex-grow: 1;" v-bind="args">
                <wtg-panel>
                    <div style="align-self: stretch; padding: 8px;">
                        <light-dark-caption />
                        <wtg-checkbox label="Shipped"/>
                        <wtg-checkbox label="Arrived at destination port"/>
                        <wtg-checkbox label="Delivered to customer"/>
                        <div style="display: flex; justify-content: space-between; padding-top: 8px;">
                        <wtg-button variant="primary">Save</wtg-button>
                        <wtg-button >Cancel</wtg-button>
                    </div>
                </div>
                </wtg-panel>
            </wtg-theme-provider>
            <wtg-theme-provider dark style="flex-grow: 1;">
                <wtg-panel>
                    <div style="align-self: stretch; padding: 8px;">
                        <light-dark-caption />
                        <wtg-checkbox label="Shipped"/>
                        <wtg-checkbox label="Arrived at destination port"/>
                        <wtg-checkbox label="Delivered to customer"/>
                        <div style="display: flex; justify-content: space-between; padding-top: 8px;">
                        <wtg-button variant="primary">Save</wtg-button>
                        <wtg-button >Cancel</wtg-button>
                    </div>
                </div>
                </wtg-panel>
            </wtg-theme-provider>
        </div>`,
    }),
};

export default meta;

export const Default: Story = { args: {} };
