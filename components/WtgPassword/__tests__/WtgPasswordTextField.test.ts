import { WtgPasswordTextField } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgPasswordTextField', () => {
    test('its name is WtgPasswordTextField', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.$options.__name).toBe('WtgPasswordTextField');
    });

    function mountComponent({ props = {}, slots = {} } = {}) {
        return mount(WtgPasswordTextField as any, {
            wtgUi,
            props,
            slots,
        });
    }
});
