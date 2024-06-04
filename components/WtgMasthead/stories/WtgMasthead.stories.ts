import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import WtgMasthead from '../WtgMasthead.vue';

type Story = StoryObj<typeof WtgMasthead>;

const meta: Meta<typeof WtgMasthead> = {
    title: 'Components/Masthead',
    component: WtgMasthead,
    parameters: {
        docs: {
            description: {
                component:
                    'A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy of pages and entities.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?node-id=305%3A20612',
        },
    },
    render: (args) => ({
        components: { WtgMasthead },
        setup: () => ({ args }),
        methods: {
            toolbarButtonClick: action('toolbar-button-click'),
        },
        template: `<wtg-masthead v-bind="args" @toolbar-button-click="toolbarButtonClick"></wtg-masthead>`,
    }),
    argTypes: {
        breadcrumbsItems: {
            control: { type: 'array' },
        },
        entityItems: {
            control: { type: 'array' },
        },
        entityName: {
            control: 'text',
        },
        title: {
            control: 'text',
        },
        splitButtonItems: {
            control: { type: 'array' },
        },
    },
    tags: ['autodocs'],
};

export default meta;

export const Default: Story = {
    args: {
        entityName: 'GFR-8640',
        breadcrumbsItems: [{ caption: 'Portal name', link: '/?path=/docs/intro--overview' }],
        splitButtonTitle: 'Title',
        splitButtonItems: [{ caption: 'Item 1' }, { caption: 'Item 2' }, { caption: 'Item 3' }],
        entityItems: [
            {
                label: 'Workflow',
                icon: '$workflow',
            },
            {
                label: 'eDocs',
                icon: '$eDocs',
            },
            {
                label: 'Documents',
                icon: '$file',
            },
            {
                label: 'Related Items',
                icon: '$related-records',
            },
            {
                label: 'Notes',
                icon: '$notes',
            },
            {
                label: 'Messages',
                icon: '$chat',
            },
            {
                label: 'Logs',
                icon: '$logs',
            },
        ],
    },
};
