import { Meta, StoryObj } from '@storybook/vue3';
import WtgBreadcrumbs from '../WtgBreadcrumbs.vue';

type Story = StoryObj<typeof WtgBreadcrumbs>;

const meta: Meta<typeof WtgBreadcrumbs> = {
    title: 'Components/Breadcrumbs',
    component: WtgBreadcrumbs,
    parameters: {
        docs: {
            description: {
                component:
                    'A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy of pages and entities.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=305-20672&mode=design&t=ULH2WbmuCaOClr2K-0',
        },
        layout: 'centered',
    },
    render: (args) => ({
        components: { WtgBreadcrumbs },
        setup: () => ({ args }),
        template: `<wtg-breadcrumbs v-bind="args"></wtg-breadcrumbs>`,
    }),
    argTypes: {
        items: {
            control: { type: 'array' },
        },
    },
    tags: ['autodocs'],
};

export default meta;

export const OneItem: Story = {
    args: {
        items: [{ caption: 'Portal name', link: '/?path=/docs/intro--overview' }],
    },
};

export const TwoItems: Story = {
    args: {
        items: [
            { caption: 'Portal name', link: '/?path=/docs/intro--overview' },
            { caption: 'Page name 1', link: '/?path=/docs/intro--overview' },
        ],
    },
};

export const ThreeItems: Story = {
    args: {
        items: [
            { caption: 'Portal name', link: '/?path=/docs/intro--overview' },
            { caption: 'Page name 1', link: '/?path=/docs/intro--overview' },
            { caption: 'Page name 2', link: '/?path=/docs/intro--overview' },
        ],
    },
};

export const FourPlusItems: Story = {
    args: {
        items: [
            { caption: 'Portal name', link: '/?path=/docs/intro--overview' },
            { caption: 'Page name 1', link: '/?path=/docs/intro--overview' },
            { caption: 'Page name 2', link: '/?path=/docs/intro--overview' },
            { caption: 'Page name 3', link: '/?path=/docs/intro--overview' },
        ],
    },
};
