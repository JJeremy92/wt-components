import { defineComponent } from 'vue';
import { createVuetify } from 'vuetify';
import { VRow, VCol } from 'vuetify/components/VGrid';
import WtgLayoutGrid from '../WtgLayoutGrid';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();
const vuetify = createVuetify();

describe('WtgLayoutGrid', () => {
    test('it renders a VRow component', () => {
        const wrapper = mountComponent();
        expect(wrapper.classes()).toContain('v-row');
    });

    test('it passes its properties to the VRow component', () => {
        const wrapper = mountComponent({
            propsData: {
                noGutters: true,
            },
        });
        const row = wrapper.findComponent(VRow);
        expect(row.props('noGutters')).toBe(true);
    });

    test('it renders a VCol component around each child-component', () => {
        const wrapper = mountComponent({
            slots: {
                default: '<child>One</child><child>Two</child><child>Three</child>',
            },
        });
        const cols = wrapper.findAllComponents(VCol);
        expect(cols.length).toBe(3);
        expect(cols.at(0).text()).toBe('One');
        expect(cols.at(1).text()).toBe('Two');
        expect(cols.at(2).text()).toBe('Three');
    });

    test('it does not render child components that have been conditionally removed', () => {
        const component = defineComponent({
            components: { WtgLayoutGrid },
            template:
                '<wtg-layout-grid><child>One</child><child>Two</child><child>Three</child><child v-if="false">Four</child></wtg-layout-grid>',
        });
        const wrapper = mount(component, {
            wtgUi,
            global: {
                plugins: [vuetify],
            },
        });

        const cols = wrapper.findAllComponents(VCol);
        expect(cols.length).toBe(3);
        expect(cols.at(0).text()).toBe('One');
        expect(cols.at(1).text()).toBe('Two');
        expect(cols.at(2).text()).toBe('Three');
    });

    test('it has a columns property mixed in that allows it to be positioned inside another wtg-layout-grid', () => {
        const wrapper = mountComponent({
            propsData: { columns: 'col-md-6 col-xl-4' },
        });
        expect(wrapper.props('columns')).toBe('col-md-6 col-xl-4');
    });

    test('it does not wrap the data-wtg-layout-grid-ignore div element inside a column', async () => {
        const wrapper = mountComponent({
            slots: {
                default:
                    '<child>One</child><child>Two</child><child>Three</child><child data-wtg-layout-grid-ignore></child>',
            },
        });
        const cols = wrapper.findAllComponents(VCol);

        expect(cols.length).toBe(3);
        expect(cols.at(0).text()).toBe('One');
        expect(cols.at(1).text()).toBe('Two');
        expect(cols.at(2).text()).toBe('Three');
    });

    function mountComponent({ propsData = {}, slots = {} } = {}) {
        return mount(WtgLayoutGrid as any, {
            wtgUi,
            propsData,
            slots,
            global: {
                plugins: [vuetify],
            },
        });
    }
});
