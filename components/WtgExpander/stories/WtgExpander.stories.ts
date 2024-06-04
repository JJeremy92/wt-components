import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import WtgExpander from '../WtgExpander.vue';
import WtgExpansionPanel from '../WtgExpansionPanel.vue';
import WtgExpansionPanelHeader from '../WtgExpansionPanelHeader.vue';
import WtgExpansionPanelContent from '../WtgExpansionPanelContent.vue';
import WtgCheckbox from '../../WtgCheckbox';
import WtgButton from '../../WtgButton';
import WtgBadge from '../../WtgBadge';
import { expander } from './templates/wtg-expander.stories-template';

type Story = StoryObj<typeof WtgExpander>;
const meta: Meta<typeof WtgExpander> = {
    title: 'Components/Expander',
    component: WtgExpansionPanel,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Expander can be used for hiding complex entity related information in order to assist the scan-ability of a page and keep your layout clean.',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=59-1790&mode=design&t=FoGkzhcXiCnlZFCr-0',
        },
    },
    render: (args) => ({
        components: {
            WtgExpander,
            WtgExpansionPanel,
            WtgCheckbox,
            WtgButton,
            WtgExpansionPanelHeader,
            WtgExpansionPanelContent,
            WtgBadge,
        },
        setup: () => ({ args }),
        template: expander,
        methods: {
            onChange: action('change'),
        },
    }),
};

export default meta;
export const Default: Story = {
    args: {
        leadingIcon: '$placeholder',
        mandatory: false,
        multiple: false,
        title: 'Title',
        description: 'Description',
        variant: 'group',
        value: 2,
        actions: [{ icon: '$placeholder', key: 'placeholder', action: action('placeholder') }],
        content:
            'Expander can be used for hiding complex entity related information in order to assist the scan-ability of a page and keep your layout clean.',
    },
};
