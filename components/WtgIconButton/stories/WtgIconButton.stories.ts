import WtgIconButton from '../WtgIconButton.vue';
import { action } from '@storybook/addon-actions';
// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
    title: 'Components/Icon Button',
    component: WtgIconButton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Icon buttons, like buttons, are commonly used to trigger an action and act as a stand in to save space for actions that are frequently used and have a clear and recognisable visual representation. ',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=59-1790&mode=design&t=47JRmfxuVaeXjLVt-0',
        },
    },

    render: (args) => ({
        components: { WtgIconButton },
        setup: () => ({ args }),
        methods: {
            clickAction: action('click'),
        },
        template: '<wtg-icon-button v-bind="args"  @change="clickAction"></wtg-icon-button>',
    }),
    argTypes: {
        variant: {
            options: ['default', 'primary', 'ghost'],
            control: { type: 'radio' },
        },
    },
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Primary = {
    args: {
        color: 'default',
        variant: 'default',
        icon: '$placeholder',
        disabled: false,
    },
};
