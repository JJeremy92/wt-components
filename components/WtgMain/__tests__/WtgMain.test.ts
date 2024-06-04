import { h } from 'vue';
import { createVuetify } from 'vuetify';
import { WtgMain } from '../';
import { WtgApp } from '../../WtgApp';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';
import { VMain } from 'vuetify/lib/components/index.mjs';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();
const vuetify = createVuetify();

window.ResizeObserver = jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
}));
describe('WtgMain', () => {
    test('its name is WtgMain', () => {
        const wrapper = mountComponent();
        const defaultSlots = wrapper.vm.$slots.default ? wrapper.vm.$slots.default() : undefined;
        if (defaultSlots) {
            expect(defaultSlots[0].type['name']).toBe('WtgMain');
        }
    });

    test('it renders a VMain component', () => {
        const wrapper = mountComponent();
        const spacer = wrapper.findComponent(VMain);
        expect(spacer.exists()).toBe(true);
    });

    test('it passes the default slot content to the VMain component', () => {
        const wrapper = mountComponent({
            slots: { default: h(WtgMain, null, { default: () => '<div class="my-div">Some Text</div>' }) },
        });
        expect(wrapper.html()).toContain('Some Text');
    });

    function mountComponent({ props = {}, slots = { default: h(WtgMain) } } = {}) {
        return mount(WtgApp, {
            wtgUi,
            props,
            slots,
            global: {
                plugins: [vuetify],
            },
        }).findComponent(WtgMain);
    }
});
