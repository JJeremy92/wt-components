import WtgIcon from '../WtgIcon.vue';
import { sizeArgTypes } from '../../../composables/size';
import { useFormattedIconsName, useIconsNameAsStorybookLabel } from '../../../composables/icons';

const icons = useFormattedIconsName();
// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
    title: 'Components/Icon',
    component: WtgIcon,
    parameters: {
        docs: {},
    },
    tags: ['autodocs'],
    render: (args) => ({
        components: { WtgIcon },
        setup: () => ({ args }),
        template: '<wtg-icon v-bind="args">{{ args.icon }}</wtg-icon>',
    }),
    argTypes: {
        icon: {
            options: icons,
            control: {
                type: 'select',
                labels: useIconsNameAsStorybookLabel(),
            },
        },
        ...sizeArgTypes,
    },
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Primary = { args: { icon: '$home' } };
