import { mount, enableAutoUnmount } from '@vue/test-utils';
import { WtgLoader } from '../';

enableAutoUnmount(afterEach);

describe('WtgLoader', () => {
    test('it renders a WtgIcon component', () => {
        const wrapper = mountComponent();
        expect(wrapper.findComponent({ name: 'WtgIcon' }).exists()).toBe(true);
    });

    test('it passes its properties to the WtgIcon component', () => {
        const wrapper = mountComponent({
            propsData: {
                color: 'blue',
                size: 's',
            },
        });

        const icon = wrapper.findComponent({ name: 'WtgIcon' });
        expect(icon.props('color')).toBe('blue');
        expect(icon.props('size')).toBe('s');
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgLoader as any, {
            propsData,
        });
    }
});
