import WtgContainer from '../';
import WtgBox from '../../WtgBox';
import WtgPanel from '../../WtgPanel';
import { layoutArgTypes } from '../../../composables/layoutGrid';
import { layoutGridColumnArgTypes } from '../../../composables/layoutGridColumn';
import { measureArgTypes } from '../../../composables/measure';
import { StoryObj } from '@storybook/vue3';
import { WtgApp } from '../../WtgApp';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
    title: 'Layouts/Container',
    component: WtgContainer,
    parameters: {
        docs: {
            description: {
                component: 'Container is a sub-component used to ensure the main content pages of an application display with the correct margins, padding and sizing.',
            },
        },
    },
    render: (args) => ({
        components: { WtgBox, WtgPanel },
        setup: () => ({ args }),
        template: '<wtg-container v-bind="args"></wtg-container>',
    }),
    argTypes: {
        ...layoutArgTypes,
        ...layoutGridColumnArgTypes,
        ...measureArgTypes,
    },
    decorators: [
        () => ({
            components: { WtgApp },
            template: '<wtg-app><story /></wtg-app>',
        }),
    ],
};

export const Default: Story = {
    args: {},
};

type Story = StoryObj<typeof WtgContainer>;
// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args

export const FullPagePanelLayout: Story = {
    args: {},
    render: (args) => ({
        components: { WtgContainer, WtgBox, WtgPanel },
        setup: () => ({ args }),
        template: `<wtg-container  v-bind="args" fit-to-height>
                        <wtg-panel caption="Panel Header" fit-to-height>
                            <div>
                                <h1>Full page panel</h1>  
                                </div>        
                                <div>                
                                <span>
                                    Best used for displaying full-page data-grid, The a great for display large sections of data on a grid, maximizing all of the available space on your screen regardless of the screen size.
                                </span>
                            </div>
                        </wtg-panel>
                   </wtg-container>`,
    }),
};

export const fullPageWithSidePanel: Story = {
    args: {},
    render: (args) => ({
        components: { WtgContainer, WtgBox, WtgPanel },
        setup: () => ({ args }),
        template: `<wtg-container v-bind="args" fit-to-height>
                        <wtg-box layout="flex" height="100%">
                            <wtg-panel caption="Side Panel Header" max-width="250" class="me-3" fit-to-height >
                                <div>
                                    <h1> Side Panel </h1>
                                    <span>
                                        Best used for displaying content directly related to or engaging with the full-page panel in some capacity.
                                    </span>
                                </div>
                            </wtg-panel>
                            <wtg-panel caption="Panel Header" fit-to-height>
                                <div>
                                    <h1> Full page panel </h1>
                                    <span>
                                        Best used for displaying full-page data-grid, The a great for display large sections of data on a grid, maximizing all of the available space on your screen regardless of the screen size.
                                    </span>
                                </div>
                            </wtg-panel>
                        </wtg-box>
                   </wtg-container>`,
    }),
};

export const fullPageWithBottomPanel: Story = {
    args: {},
    render: (args) => ({
        components: { WtgContainer, WtgBox, WtgPanel },
        setup: () => ({ args }),
        template: `<wtg-container v-bind="args" fit-to-height>
                    <wtg-box layout="flex" height="100%" flex-direction="flex-column">
                        <wtg-panel caption="Side Panel Header" max-height="250" class="mb-3" fit-to-height >
                            <div>
                                <h1> Side Panel </h1>
                                <span>
                                    Best used for displaying content directly related to or engaging with the full-page panel in some capacity.
                                </span>
                            </div>
                        </wtg-panel>
                        <wtg-panel caption="Panel Header" fit-to-height>
                            <div>
                                <h1> Full page panel </h1>
                                <span>
                                    Best used for displaying full-page data-grid, The a great for display large sections of data on a grid, maximizing all of the available space on your screen regardless of the screen size.
                                </span>
                            </div>
                        </wtg-panel>
                    </wtg-box>
               </wtg-container>`,
    }),
};
export const fixedMultiPanel: Story = {
    args: {},
    render: (args) => ({
        components: { WtgContainer, WtgBox, WtgPanel },
        setup: () => ({ args }),
        template: `<wtg-container v-bind="args">
                        <wtg-box layout="grid">
                            <wtg-panel caption="Panel 1 Header" columns="col-md-6">
                                <div>
                                    <span>
                                        Panel Content goes here
                                    </span>
                                </div>
                            </wtg-panel>
                            <wtg-panel caption="Panel 2 Header" columns="col-md-6">
                                <div>
                                    <span>
                                    Panel Content goes here
                                    </span>
                                </div>
                            </wtg-panel>
                            <wtg-panel caption="Panel 3 Header" columns="col-md-6">
                                <div>
                                    <span>
                                    Panel Content goes here
                                    </span>
                                </div>
                            </wtg-panel>
                            <wtg-panel caption="Panel 4 Header" columns="col-md-6">
                                <div>
                                    <span>
                                    Panel Content goes here
                                    </span>
                                </div>
                            </wtg-panel>
                        </wtg-box>
           </wtg-container>`,
    }),
};
export const fixedMultiPanelWithSidePanel: Story = {
    args: {},
    render: (args) => ({
        components: { WtgContainer, WtgBox, WtgPanel },
        setup: () => ({ args }),
        template: `<wtg-container v-bind="args">
                   <wtg-box layout="flex">
                            <wtg-panel class="me-3" caption="Side Panel Header" width="250" fit-to-height>
                                <div>
                                    <span>
                                       Side Panel
                                    </span>
                                </div>
                            </wtg-panel>
                            <wtg-box layout="grid">
                                <wtg-panel caption="Panel 1 Header" columns="col-md-6">
                                    <div>
                                        <span>
                                            Panel Content goes here
                                        </span>
                                    </div>
                                </wtg-panel>
                                <wtg-panel caption="Panel 2 Header" columns="col-md-6">
                                    <div>
                                        <span>
                                        Panel Content goes here
                                        </span>
                                    </div>
                                </wtg-panel>
                                <wtg-panel caption="Panel 3 Header" columns="col-md-6">
                                    <div>
                                        <span>
                                        Panel Content goes here
                                        </span>
                                    </div>
                                </wtg-panel>
                                <wtg-panel caption="Panel 4 Header" columns="col-md-6">
                                    <div>
                                        <span>
                                        Panel Content goes here
                                        </span>
                                    </div>
                                </wtg-panel>
                        </wtg-box>
                   </wtg-box>
       </wtg-container>`,
    }),
};
export const fixedMultiPanelWithBottomPanel: Story = {
    args: {},
    render: (args) => ({
        components: { WtgContainer, WtgBox, WtgPanel },
        setup: () => ({ args }),
        template: `<wtg-container v-bind="args">
                        <wtg-box layout="grid"> 
                                <wtg-panel caption="Panel 1 Header" columns="col-md-6">
                                    <div>
                                        <span>
                                            Panel Content goes here
                                        </span>
                                    </div>
                                </wtg-panel>
                                <wtg-panel caption="Panel 2 Header" columns="col-md-6">
                                    <div>
                                        <span>
                                        Panel Content goes here
                                        </span>
                                    </div>
                                </wtg-panel>
                                <wtg-panel caption="Panel 3 Header">
                                    <div>
                                        <span>
                                        Panel Content goes here
                                        </span>
                                    </div>
                                </wtg-panel>
                        </wtg-box>
                </wtg-container>`,
    }),
};
