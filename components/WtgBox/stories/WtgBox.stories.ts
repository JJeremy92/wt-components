import WtgBox from '../';
import WtgPanel from '../../WtgPanel';
import { layoutArgTypes } from '../../../composables/layoutGrid';
import { layoutGridColumnArgTypes } from '../../../composables/layoutGridColumn';
import { measureArgTypes } from '../../../composables/measure';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
    title: 'Layouts/Box',
    component: WtgBox,
    parameters: {
        docs: {
            description: {
                component: 'Box is a helper component whose primary purpose is to simplify access to the different layout behaviors used in applications. The layout property allows access to flex and layout grid support for child components.',
            },
        },
    },
    render: (args) => ({
        components: { WtgBox, WtgPanel },
        setup: () => ({ args }),
        template: '<wtg-box v-bind="args" @click="action"><span>This is a Box component containing some text and 3 panels</span><wtg-panel caption="Panel 1" /><wtg-panel caption="Panel 2" /><wtg-panel caption="Panel 3" /></wtg-box>',
    }),
    argTypes: {
        ...layoutArgTypes,
        ...layoutGridColumnArgTypes,
        ...measureArgTypes,
    },
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Default = { args: {} };
