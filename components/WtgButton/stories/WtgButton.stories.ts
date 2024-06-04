import { action } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { Meta, StoryObj } from '@storybook/vue3';
import { sizeArgTypes } from '../../../composables/size';
import WtgIcon from '../../WtgIcon/WtgIcon.vue';
import WtgButton from '../WtgButton.vue';
import { ButtonWithIconsTemplate } from './templates/wtg-button-with-icons.stories-template';
import { ButtonWithVariantsTemplate } from './templates/wtg-button-with-variants.stories-template';

type Story = StoryObj<typeof WtgButton>;
const meta: Meta<typeof WtgButton> = {
    title: 'Components/Button',
    component: WtgButton,
    parameters: {
        docs: {
            description: {
                component:
                    'Buttons are interactive components that trigger an action, such as submitting a form, confirming a decision, or initiating an operation. They are designed to communicate and action a clear path forward or logical next step of a user’s journey.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=59-1790&mode=design&t=FoGkzhcXiCnlZFCr-0',
        },
    },
    render: (args) => ({
        components: { WtgButton },
        methods: {
            action: action('click'),
        },
        setup: () => ({ args }),
        template: `<wtg-button v-bind="args" @click="action">{{args.caption}}</wtg-button>`,
    }),
    argTypes: {
        caption: {
            control: 'text',
        },
        ...sizeArgTypes,
    },
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
export const Default: Story = { args: { caption: 'Label', leadingIcon: '$placeholder', trailingIcon: '$placeholder' } };
export const Ghost: Story = {
    args: { caption: 'Label', leadingIcon: '$placeholder', trailingIcon: '$placeholder', variant: 'ghost' },
};
export const Primary: Story = {
    args: { caption: 'Label', leadingIcon: '$placeholder', trailingIcon: '$placeholder', variant: 'primary' },
};

export const Variants: Story = {
    args: { caption: 'Label' },
    render: (args) => ({
        components: { WtgButton },
        methods: {
            action: action('click'),
        },
        setup: () => ({ args }),
        template: ButtonWithVariantsTemplate,
    }),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const focusedButton = canvas.getByTestId('testButton-primary');
        await step('Focus on button', async () => {
            focusedButton.focus();
            await step('Should show button outline', () => {
                const outline = getComputedStyle(focusedButton).outlineColor;
                expect(outline).toEqual('rgb(55, 30, 225)');
            });
        });
    },
};
export const Icons: Story = {
    args: { icon: '$placeholder', caption: 'Label' },
    render: (args) => ({
        components: { WtgButton, WtgIcon },
        methods: {
            action: action('click'),
        },
        setup: () => ({ args }),
        template: ButtonWithIconsTemplate,
    }),
};
