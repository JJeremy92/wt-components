import { mount, enableAutoUnmount } from '@vue/test-utils';
import { sizeProps, useSize } from '../size';
import { defineComponent } from 'vue';

enableAutoUnmount(afterEach);

describe('size', () => {
    test('sizeProps adds a property called size to a component', () => {
        const wrapper = mountComponent({ propsData: { size: 'xs' } });
        expect(wrapper.props('size')).toBe('xs');
    });

    test('useSize has a computed prop sizeClass that returns a class made from the size prop when used', async () => {
        const wrapper = mountComponent({ propsData: { size: 'xs' } });
        expect(wrapper.vm.sizeClass).toBe('wts-component-xs');
        await wrapper.setProps({ size: 'l' });
        expect(wrapper.vm.sizeClass).toBe('wts-component-l');
    });

    function mountComponent({ propsData = {} } = {}) {
        const component = defineComponent({
            name: 'SizeComponent',
            props: sizeProps,
            setup(props) {
                const { sizeClass } = useSize(props, 'component');
                return { sizeClass };
            },
            template: '<div>Size Component</div>',
        });

        return mount(component as any, {
            propsData,
        });
    }
});
