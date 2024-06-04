import { createVuetify } from 'vuetify';
import { WtgApp } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();
const vuetify = createVuetify();

window.ResizeObserver = jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
}));

describe('WtgApp', () => {
    test('its name is WtgApp', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.$options.__name).toBe('WtgApp');
    });

    test('it applies the wtg-app class', () => {
        const wrapper = mountComponent();
        expect(wrapper.classes()).toContain('wtg-app');
    });

    test('it renders a VApp component', () => {
        const wrapper = mountComponent();
        expect(wrapper.classes()).toContain('v-application');
    });

    test('it passes the default slot to the VApp component', () => {
        const wrapper = mountComponent({
            slots: {
                default: '<span id="text">Some text</span>',
            },
        });
        expect(wrapper.find('#text').text()).toBe('Some text');
    });

    function mountComponent({ props = {}, slots = {} } = {}) {
        return mount(WtgApp, {
            wtgUi,
            props,
            slots,
            global: {
                plugins: [vuetify],
            },
        });
    }
});
