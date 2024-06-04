import { Meta, StoryObj } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';
import WtgSplitButton from '../WtgSplitButton.vue';
import { WtgPanel } from '../..';

type Story = StoryObj<typeof WtgSplitButton>;

const meta: Meta<typeof WtgSplitButton> = {
    title: 'Components/Split Button',
    component: WtgSplitButton,
    parameters: {
        docs: {
            description: {
                component:
                    'A Split button is a hybrid between a Dropdown Menu and a Button. It lets users choose from parallel actions and take action on their choice.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=3693-81438&mode=design&t=RZJEuGSKOizlVdzU-0',
        },
        layout: 'centered',
    },
    render: (args) => ({
        components: { WtgSplitButton, WtgPanel },
        methods: {
            leftBtnAction: action('Left button clicked'),
            dropdownBtnAction: action('Dropdown button clicked'),
        },
        setup: () => ({ args }),
        template: `
            <wtg-split-button v-bind="args" @click="leftBtnAction" @dropdownClick="dropdownBtnAction">
                {{args.caption}}
                <template #popover>
                    <div style="font: var(--s-body-strong); padding: var(--s-padding-m) var(--s-padding-xl);">Title</div>
                    <hr />
                    <div style="font: var(--s-body);">
                        <div style="padding: var(--s-padding-m) var(--s-padding-xl)">Item 1</div>
                        <div style="padding: var(--s-padding-m) var(--s-padding-xl)">Item 2</div>
                        <div style="padding: var(--s-padding-m) var(--s-padding-xl)">Item 3</div>
                    </div>
                </template>
            </wtg-split-button>`,
    }),
    argTypes: {
        caption: {
            control: 'text',
        },
        variant: {
            options: ['primary', 'default'],
            control: { type: 'radio' },
        },
        openPosition: {
            options: ['top', 'bottom'],
            control: { type: 'radio' },
        },
        leadingIcon: {
            control: 'text',
        },
    },
    tags: ['autodocs'],
};

export default meta;

export const Default: Story = {
    args: {
        caption: 'Add item',
        variant: 'default',
        leadingIcon: '$placeholder',
    },
};
