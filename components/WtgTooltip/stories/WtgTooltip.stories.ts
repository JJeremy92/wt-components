import WtgTooltip from '../WtgTooltip.vue';
import WtgButton from '../../WtgButton';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';

type Story = StoryObj<typeof WtgTooltip>;

const meta: Meta<typeof WtgTooltip> = {
    title: 'Components/Tooltip',
    component: WtgTooltip,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Tooltips are floating containers for displaying additional information for the currently focused element. A tooltip can be useful when you want to provide additional context for an button, icon or link.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=166-8918&mode=design&t=sODjUEQkJ0Fqqrs6-0',
        },
    },
    tags: ['autodocs'],
    render: (args) => ({
        components: { WtgTooltip, WtgButton },
        setup: () => ({ args }),
        methods: {
            changeAction: action('change'),
        },
        template: `<wtg-tooltip v-bind="args">
                            <wtg-button>Hover Over Me</wtg-button>
                    </wtg-tooltip>
                    `,
    }),
    argTypes: {},
};

export default meta;
export const Primary: Story = {
    args: {
        text: 'My Tooltip Text',
        top: false,
        right: true,
        left: false,
        bottom: false,
        disabled: false,
    },
};
