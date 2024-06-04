import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import { VApp, VMain } from 'vuetify/components';
import WtgPopover from '../WtgPopover.vue';
import { WtgButton, WtgCheckbox, WtgPanel } from '../..';

type Story = StoryObj<typeof WtgPopover>;
const meta: Meta<typeof WtgPopover> = {
    title: 'Components/Popover',
    component: WtgPopover,
    parameters: {
        docs: {
            description: {
                component: 'Popovers are interactive components that trigger an action, such as submitting a form, confirming a decision, or initiating an operation. They are designed to communicate and action a clear path forward or logical next step of a user’s journey.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=59-1790&mode=design&t=FoGkzhcXiCnlZFCr-0',
        },
        layout: 'centered',
    },
    render: (args) => ({
        components: { WtgPopover, WtgButton, VApp, VMain, WtgCheckbox, WtgPanel },
        methods: {
            action: action('click'),
        },
        setup: () => ({ args }),
        template: `
            <wtg-popover v-bind="args">
                <template #activator="{props}">
                    <wtg-button v-bind="props">
                        Shipment Details
                    </wtg-button>
                </template>
                <template #default="{isActive}">
                <wtg-checkbox label="Shipped"/>
                <wtg-checkbox label="Arrived at destination port"/>
                <wtg-checkbox label="Delivered to customer"/>
                <div style="display: flex; justify-content: space-between; padding-top: 8px;">
                    <wtg-button variant="primary" @click="() => isActive.value = false">Save</wtg-button>
                    <wtg-button @click="() => isActive.value = false">Cancel</wtg-button>
                </div>
                </template>
            </wtg-popover>`,
    }),
    argTypes: {
        location: {
            control: 'text',
        },
        popoverStyle: {
            control: 'text',
        },
        variant: {
            control: 'radio',
            options: ['Pop over', 'Dropdown'],
        },
        elevation: {
            control: 'radio',
            options: ['100', '200', '300'],
        },
    },
};
export default meta;
export const Default: Story = {
    args: { location: 'right', popoverStyle: 'margin-left: var(--s-spacing-s)', elevation: '100', variant: 'Pop over' },
};
