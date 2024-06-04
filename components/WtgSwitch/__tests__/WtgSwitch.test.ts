import { defineComponent } from 'vue';
import { WtgSwitch } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgSwitch', () => {
    test('it sets the switch label to the label attribute passed in ', () => {
        const wrapper = mountComponent({
            propsData: {
                label: 'My Switch',
            },
        });
        const switchlabel = wrapper.find('label');
        expect(switchlabel.html()).toContain('My Switch');
    });

    test('it should emit the update:modelValue event when the input change event is fired', async () => {
        const wrapper = mountComponent();
        const input = wrapper.find('input');
        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
        await input.setValue(true);
        expect(wrapper.emitted('update:modelValue')!.length).toBe(1);
        expect(![0][0]).toBe(true);
        await input.setValue(false);
        expect(wrapper.emitted('update:modelValue')!.length).toBe(2);
        expect(wrapper.emitted('update:modelValue')![1][0]).toBe(false);
    });

    test('it implements v-model through the value property and the change event', async () => {
        const component = defineComponent({
            components: { WtgSwitch },
            data: () => {
                return {
                    checked: true,
                };
            },
            template: '<wtg-switch v-model="checked" label="my check" />',
        });
        const wrapper = mount(component, {
            wtgUi,
        });
        const switchContol = wrapper.findComponent(WtgSwitch);
        expect(switchContol.props('modelValue')).toBe(true);

        const input = switchContol.find('input');
        await input.setValue(false);
        expect(wrapper.vm.$data.checked).toBe(false);
        expect(switchContol.props('modelValue')).toBe(false);
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgSwitch as any, {
            wtgUi,
            propsData,
        });
    }
});
