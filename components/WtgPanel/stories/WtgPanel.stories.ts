import { Meta, StoryObj } from '@storybook/vue3';
import { VDialog } from 'vuetify/components/VDialog';
import WtgBadge from '../../WtgBadge';
import WtgButton from '../../WtgButton';
import WtgCheckbox from '../../WtgCheckbox';
import WtgIcon from '../../WtgIcon';
import WtgRadio from '../../WtgRadio';
import WtgSwitch from '../../WtgSwitch';
import WtgTooltip from '../../WtgTooltip';
import WtgPanel from '../WtgPanel.vue';
import { WtgPanelInsideDialogTemplate, WtgPanelTemplate } from './templates';

type Story = StoryObj<typeof WtgPanel>;
const meta: Meta<typeof WtgPanel> = {
    title: 'Components/Panel',
    component: WtgPanel,
    parameters: {
        docs: {
            description: {
                component:
                    'Panels are simple surfaces that are used to organise and display content within a page. They can also be used for elevated elements such as dropdowns and popups.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=3156-35922&mode=design&t=FoGkzhcXiCnlZFCr-0',
        },
    },
    render: (args) => ({
        components: { WtgPanel },
        setup: () => ({ args }),
        template: '<wtg-panel v-bind="args"></wtg-panel>',
    }),
};

export default meta;
export const Default: Story = {
    args: {
        caption: 'Panel Caption',
    },
};
export const VerticalFlow: Story = {
    render: (args) => ({
        components: { WtgPanel, WtgRadio, WtgButton, WtgTooltip, WtgCheckbox, WtgIcon, WtgSwitch, WtgBadge },
        setup: () => ({ args }),
        template: WtgPanelTemplate,
    }),
    argTypes: {
        caption: { table: { disable: true } },
    },
    decorators: [
        () => ({
            template: `
            <div style="display: flex; flex-direction: column; gap:10px">
                <story/>
            </div>
            `,
        }),
    ],
};
export const HorizontalFlow: Story = {
    render: (args) => ({
        components: { WtgPanel, WtgRadio, WtgButton, WtgTooltip, WtgCheckbox, WtgIcon, WtgSwitch, WtgBadge },
        setup: () => ({ args }),
        template: WtgPanelTemplate,
    }),
    argTypes: {
        caption: { table: { disable: true } },
    },
    decorators: [
        () => ({
            template: `
            <div style="display: flex; flex-direction: row; gap:10px">
                <story/>
            </div>
            `,
        }),
    ],
};
export const InsideDialog: Story = {
    render: (args) => ({
        components: {
            WtgPanel,
            VDialog,
            WtgRadio,
            WtgButton,
            WtgTooltip,
            WtgCheckbox,
            WtgIcon,
            WtgSwitch,
            WtgBadge,
        },
        setup: () => ({ args }),
        template: WtgPanelInsideDialogTemplate,
    }),
    argTypes: {
        caption: { table: { disable: true } },
    },
    decorators: [
        () => ({
            template: `
            <div style="display: flex; flex-direction: row; gap:10px">
                <story/>
            </div>
            `,
        }),
    ],
};
