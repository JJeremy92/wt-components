import WtgBox from '../../WtgBox';
import WtgLayoutGrid from '../WtgLayoutGrid';
import WtgPanel from '../../WtgPanel';
import { layoutGridColumnArgTypes } from '../../../composables/layoutGridColumn';
import { measureArgTypes } from '../../../composables/measure';
import { StoryObj } from '@storybook/vue3';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
    title: 'Layouts/LayoutGrid',
    component: WtgLayoutGrid,
    parameters: {
        docs: {
            description: {
                component:
                    'LayoutGrid is a helper component whose primary purpose is to simplify responsive design code by negating the need for individual wtg-col layout construction in favor of a columns property on individual components. When wrapped in a wtg-layout-grid component, you can control the layout behaviour of components through their columns property (if it has one).',
            },
        },
    },
    render: (args) => ({
        components: { WtgPanel, WtgLayoutGrid },
        setup: () => ({ args }),
        template: '<wtg-layout-grid v-bind="args"><wtg-panel caption="Panel 1" /><wtg-panel caption="Panel 2" /><wtg-panel caption="Panel 3" /></wtg-layout-grid>',
    }),
    argTypes: {
        noGutters: {
            control: 'boolean',
        },
        ...layoutGridColumnArgTypes,
        ...measureArgTypes,
    },
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Default = { args: {} };

type Story = StoryObj<typeof WtgLayoutGrid>;

export const Columns: Story = {
    args: {},
    render: (args) => ({
        components: { WtgLayoutGrid, WtgBox },
        setup: () => ({ args }),
        template: `<wtg-layout-grid class="text-center" v-bind="args">
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6">col-sm-6</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6">col-sm-6</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-3">col-sm-6 col-md-3</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-3">col-sm-6 col-md-3</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-3">col-sm-6 col-md-3</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-3">col-sm-6 col-md-3</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-2 col-lg-2">col-sm-6 col-md-2 col-lg-2</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-2 col-lg-2">col-sm-6 col-md-2 col-lg-2</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-2 col-lg-2">col-sm-6 col-md-2 col-lg-2</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-2 col-lg-2">col-sm-6 col-md-2 col-lg-2</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-2 col-lg-2">col-sm-6 col-md-2 col-lg-2</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-2 col-lg-2">col-sm-6 col-md-2 col-lg-2</wtg-box>
            </wtg-layout-grid>`,
    }),
};

export const NoGutters: Story = {
    args: {},
    render: (args) => ({
        components: { WtgLayoutGrid, WtgBox },
        setup: () => ({ args }),
        template: `<wtg-layout-grid no-gutters class="text-center" v-bind="args">
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6">col-sm-6</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6">col-sm-6</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-3">col-sm-6 col-md-3</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-3">col-sm-6 col-md-3</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-3">col-sm-6 col-md-3</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-3">col-sm-6 col-md-3</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-2 col-lg-2">col-sm-6 col-md-2 col-lg-2</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-2 col-lg-2">col-sm-6 col-md-2 col-lg-2</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-2 col-lg-2">col-sm-6 col-md-2 col-lg-2</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-2 col-lg-2">col-sm-6 col-md-2 col-lg-2</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-2 col-lg-2">col-sm-6 col-md-2 col-lg-2</wtg-box>
                <wtg-box class="wtg-bg-primary wtg-txt-primary pa-2" fill columns="col-sm-6 col-md-2 col-lg-2">col-sm-6 col-md-2 col-lg-2</wtg-box>
            </wtg-layout-grid>`,
    }),
};
