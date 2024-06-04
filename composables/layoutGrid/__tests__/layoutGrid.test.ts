import { defineComponent, h, VNode } from 'vue';
import { createVuetify } from 'vuetify';
import {
    makeViewportHeightStyle,
    makeFitToDialogHeightStyles,
    makeFitToViewportHeightStyles,
    layoutProps,
    useLayout,
} from '../layoutGrid';
import WtgLayoutGrid from '../../../components/WtgLayoutGrid';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount, VueWrapper } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();
const vuetify = createVuetify();

describe('layoutGrid', () => {
    let layoutGridColumn: any;

    beforeEach(() => {
        layoutGridColumn = {
            updateColumns: jest.fn(),
        };
    });

    describe('layoutProps, useLayout', () => {
        let wrapper: VueWrapper;
        let slots: any;

        beforeEach(() => {
            slots = {
                default: 'Some content',
            };
            wrapper = mountComponent({ slots });
        });

        test('it does not add any classes and renders the content directly inside a div', () => {
            expect(wrapper.html()).toBe('<div class="">Some content</div>');
        });

        describe('when you set the layout property to flex', () => {
            let wrapper: VueWrapper;

            beforeEach(() => {
                const propsData = {
                    layout: 'flex',
                };
                const slots = {
                    default: 'Some content',
                };
                wrapper = mountComponent({ propsData, slots });
            });

            test('it does not add any classes and renders the content directly inside a div', () => {
                expect(wrapper.html()).toBe('<div class="d-flex">Some content</div>');
            });

            test('when you set the flex-align property, it adds the corresponding class to the outer div', async () => {
                await wrapper.setProps({ flexAlign: 'align-start' });
                expect(wrapper.classes()).toContain('align-start');
            });

            test('when you set the flex-direction property, it adds the corresponding class to the outer div', async () => {
                await wrapper.setProps({ flexDirection: 'flex-column' });
                expect(wrapper.classes()).toContain('flex-column');
            });

            test('when you set the flex-justify property, it adds the corresponding class to the outer div', async () => {
                await wrapper.setProps({ flexJustify: 'justify-space-between' });
                expect(wrapper.classes()).toContain('justify-space-between');
            });

            test('when you set the flex-nowrap property, it adds the corresponding class to the outer div', async () => {
                await wrapper.setProps({ flexWrap: 'flex-nowrap' });
                expect(wrapper.classes()).toContain('flex-nowrap');
            });
            test('when you set the flex-wrap property, it adds the corresponding class to the outer div', async () => {
                await wrapper.setProps({ flexWrap: 'flex-wrap' });
                expect(wrapper.classes()).toContain('flex-wrap');
            });

            test('when you set the flex-wrap-reverse property, it adds the corresponding class to the outer div', async () => {
                await wrapper.setProps({ flexWrap: 'flex-wrap-reverse' });
                expect(wrapper.classes()).toContain('flex-wrap-reverse');
            });
        });

        describe('when you set the layout property to grid', () => {
            let wrapper: VueWrapper;

            beforeEach(() => {
                wrapper = mountComponent({
                    propsData: {
                        layout: 'grid',
                    },
                    slots: {
                        default: 'Some content',
                    },
                });
            });

            test('it creates a layout grid around the content', () => {
                expect(wrapper.findComponent(WtgLayoutGrid).exists()).toBe(true);
            });
        });
    });

    test('it exports a makeViewportHeightStyle function for use by containers to size to the max viewport', () => {
        const styles = makeViewportHeightStyle();
        expect(styles.height).toBe('max(100vh, 200px)');
    });

    test('it exports a makeFitToViewportHeightStyles function for use by containers to size to the max viewport', () => {
        const styles = makeFitToViewportHeightStyles();
        expect(styles.display).toBe('flex');
        expect(styles.flexDirection).toBe('column');
        expect(styles.height).toBe('max(100vh, 200px)');
    });

    test('it exports a makeFitToDialogHeightStyles function for use by containers to size to the max dialog content area', () => {
        const styles = makeFitToDialogHeightStyles();
        expect(styles.display).toBe('flex');
        expect(styles.flexDirection).toBe('column');
        expect(styles.height).toBe('75vh');
    });

    function mountComponent({ propsData = {}, slots = {} } = {}) {
        const component = defineComponent({
            props: { ...layoutProps },
            setup(props) {
                const { layoutClasses, renderContent } = useLayout(props);
                return { layoutClasses, renderContent };
            },
            render(): VNode {
                return h(
                    'div',
                    {
                        class: this.layoutClasses,
                    },
                    this.renderContent()
                );
            },
        });
        return mount(component as any, {
            wtgUi,
            propsData,
            provide: {
                layoutGridColumn,
            },
            slots,
            global: {
                plugins: [vuetify],
            },
        });
    }
});
