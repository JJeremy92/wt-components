import { createVuetify } from 'vuetify';
import { VSpacer } from 'vuetify/components/VGrid';
import { WtgSpacer } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();
const vuetify = createVuetify();

describe('WtgSpacer', () => {
    test('its name is WtgSpacer', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.$options.__name).toBe('WtgSpacer');
    });

    test('it renders a VSpacer component', () => {
        const wrapper = mountComponent();
        const spacer = wrapper.findComponent(VSpacer);
        expect(spacer.exists()).toBe(true);
    });

    function mountComponent({ props = {}, slots = {} } = {}) {
        return mount(WtgSpacer as any, {
            wtgUi,
            props,
            slots,
            global: {
                plugins: [vuetify],
            },
        });
    }
});
