import { createVuetify } from 'vuetify';
import { VRow } from 'vuetify/components/VGrid';
import { WtgRow } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();
const vuetify = createVuetify();

describe('WtgRow', () => {
    test('its name is WtgRow', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.$options.__name).toBe('WtgRow');
    });

    test('it renders a VRow component', () => {
        const wrapper = mountComponent();
        const row = wrapper.findComponent(VRow);
        expect(row.exists()).toBe(true);
    });

    function mountComponent({ props = {}, slots = {} } = {}) {
        return mount(WtgRow as any, {
            wtgUi,
            props,
            slots,
            global: {
                plugins: [vuetify],
            },
        });
    }
});
