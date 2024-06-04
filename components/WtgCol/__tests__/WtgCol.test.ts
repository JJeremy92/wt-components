import { createVuetify } from 'vuetify';
import { VCol } from 'vuetify/components/VGrid';
import { WtgCol } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();
const vuetify = createVuetify();

describe('WtgCol', () => {
    test('its name is WtgCol', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.$options.__name).toBe('WtgCol');
    });

    test('it renders a VCol component', () => {
        const wrapper = mountComponent();
        const col = wrapper.findComponent(VCol);
        expect(col.exists()).toBe(true);
    });

    function mountComponent({ props = {}, slots = {} } = {}) {
        return mount(WtgCol as any, {
            wtgUi,
            props,
            slots,
            global: {
                plugins: [vuetify],
            },
        });
    }
});
