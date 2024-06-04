import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import WtgCheckbox from '../WtgCheckbox.vue';
import { CheckboxWithStatesTemplate, IndeterminedCheckboxTemplate } from './templates';

type Story = StoryObj<typeof WtgCheckbox>;
const meta: Meta<typeof WtgCheckbox> = {
    title: 'Components/Checkbox',
    component: WtgCheckbox,
    parameters: {
        docs: {
            description: {
                component: 'Checkboxes allow user to choose one or more options from a limited set of predefined options. If you have more than 10 options, please use Select component instead.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=149-5673&mode=design&t=FoGkzhcXiCnlZFCr-0',
        },
    },
    render: (args) => ({
        components: { WtgCheckbox },
        setup: () => ({ args }),
        methods: {
            changeAction: action('change'),
        },
        template: '<wtg-checkbox v-bind="args" @change="changeAction">something</wtg-checkbox>',
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

export const States: Story = {
    render: (args) => ({
        components: { WtgCheckbox },
        setup: () => ({ args }),
        methods: {
            changeAction: action('change'),
        },
        template: CheckboxWithStatesTemplate,
    }),
};

export const Indetermined: Story = {
    render: (args) => ({
        components: { WtgCheckbox },
        setup: () => ({ args }),
        methods: {
            changeAction: action('change'),
        },
        template: IndeterminedCheckboxTemplate,
    }),
};
