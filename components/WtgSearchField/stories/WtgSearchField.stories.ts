import WtgSearchField from '..';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/vue3';
import CountriesItemProvider from '../__tests__/CountriesItemProvider';

type Story = StoryObj<typeof WtgSearchField>;
const meta: Meta<typeof WtgSearchField> = {
    title: 'Components/Inputs/Search',
    component: WtgSearchField,
    parameters: {
        docs: {
            description: {
                component:
                    'The SearchField is a TextField that allows you to search for content from the related page, entity, datagrid or portal',
            },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/g6kTPiwXZrzyIZb4i41RYl/%5BCargoWise%5D-SUPPLY---Components?type=design&node-id=715-50148&mode=design&t=8skww1YZjQmpwYkT-0',
        },
    },
    render: (args) => ({
        components: { WtgSearchField },
        setup: () => ({ args }),
        methods: { changeAction: action('change'), focusAction: action('focus'), blurAction: action('blur') },
        template: `<wtg-search-field v-bind="args"  
                        @change="changeAction"
                        @focus="focusAction"
                        @blur="blurAction">
                    </wtg-search-field>`,
    }),
    argTypes: {},
};

export default meta;

const countryProvider = new CountriesItemProvider();

export const Default: Story = {
    args: {
        itemProvider: countryProvider,
        label: 'Label',
        isValid: false,
        isWarning: false,
        isInvalid: false,
        isDisabled: false,
        isReadOnly: false,
        isLoading: false,
        messages: [],
        trailingInnerIcon: '',
        trailingIcon: '',
        leadingInnerIcon: '',
        leadingIcon: '',
        value: 'AU',
    },
};
