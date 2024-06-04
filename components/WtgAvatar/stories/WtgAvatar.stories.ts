import WtgAvatar from '../WtgAvatar.vue';
import { sizeArgTypes } from '../../../composables/size';
import { Meta, StoryObj } from '@storybook/vue3';
import AvatarTemplates from './templates';
import { useFormattedIconsName, useIconsNameAsStorybookLabel } from '../../../composables/icons';

const icons = useFormattedIconsName();
type Story = StoryObj<typeof WtgAvatar>;
const meta: Meta<typeof WtgAvatar> = {
    title: 'Components/Avatar',
    component: WtgAvatar,
    parameters: {
        docs: {
            description: {
                component:
                    'An Avatar is used as a visual representation of a user, entity or portal. This can be represented with either a photo, icon or initials.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=305-20614&mode=design&t=FoGkzhcXiCnlZFCr-0',
        },
    },
    argTypes: {
        ...sizeArgTypes,
        icon: {
            options: icons,
            control: {
                type: 'select',
                labels: useIconsNameAsStorybookLabel(),
            },
        },
        upload: {
            control: 'boolean',
        },
        loading: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
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

export const PhotoAvatar: Story = {
    args: {
        image: 'avatarImage.png',
        size: 'xl',
    },
    render: (args) => ({
        components: { WtgAvatar },
        setup: () => ({ args }),
        template: AvatarTemplates,
    }),
};

export const IconAvatar: Story = {
    args: {
        icon: '$user',
        size: 'xl',
    },
    render: (args) => ({
        components: { WtgAvatar },
        setup: () => ({ args }),
        template: AvatarTemplates,
    }),
};

export const InitialsAvatar: Story = {
    args: {
        initials: 'MA',
        size: 'xl',
    },
    render: (args) => ({
        components: { WtgAvatar },
        setup: () => ({ args }),
        template: AvatarTemplates,
    }),
};
