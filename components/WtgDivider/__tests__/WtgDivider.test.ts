import { createVuetify } from 'vuetify';
import { VDivider } from 'vuetify/components/VDivider';
import { WtgDivider } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();
const vuetify = createVuetify();

describe('WtgDivider', () => {
    test('its name is WtgDivider', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.$options.__name).toBe('WtgDivider');
    });

    test('it renders a VDivider component', () => {
        const wrapper = mountComponent();
        const divider = wrapper.findComponent(VDivider);
        expect(divider.exists()).toBe(true);
    });

    function mountComponent({ props = {}, slots = {} } = {}) {
        return mount(WtgDivider as any, {
            wtgUi,
            props,
            slots,
            global: {
                plugins: [vuetify],
            },
        });
    }
});
