import { defineComponent } from 'vue';
import { WtgCheckbox } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgCheckbox', () => {
    test('it sets the checkbox label to the label attribute passed in ', () => {
        const wrapper = mountComponent({
            propsData: {
                label: 'My Checkbox',
            },
        });
        const checkboxlabel = wrapper.find('label');
        expect(checkboxlabel.html()).toContain('My Checkbox');
    });

    test('it shows the s-icon-checkbox-off icon when the checkbox is un-checked', async () => {
        const wrapper = mountComponent();

        const icon = wrapper.find('i');
        expect(icon.classes()).toContain('s-icon-checkbox-off');
    });

    test('it shows the s-icon-checkbox-on icon when the checkbox is checked', async () => {
        const wrapper = mountComponent({
            propsData: {
                modelValue: true,
            },
        });

        const icon = wrapper.find('i');
        expect(icon.classes()).toContain('s-icon-checkbox-on');
    });

    test('it shows the s-icon-checkbox-indeterminate icon when the checkbox is indeterminate', async () => {
        const wrapper = mountComponent({
            propsData: {
                indeterminate: true,
            },
        });

        const icon = wrapper.find('i');
        expect(icon.classes()).toContain('s-icon-checkbox-indeterminate');
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
            components: { WtgCheckbox },
            data: () => {
                return {
                    checked: true,
                };
            },
            template: '<wtg-checkbox v-model="checked" label="my check" />',
        });
        const wrapper = mount(component, {
            wtgUi,
        });
        const checkbox = wrapper.findComponent(WtgCheckbox);
        expect(checkbox.props('modelValue')).toBe(true);

        const input = checkbox.find('input');
        await input.setValue(false);
        expect(wrapper.vm.$data.checked).toBe(false);
        expect(checkbox.props('modelValue')).toBe(false);
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgCheckbox as any, {
            wtgUi,
            propsData,
        });
    }
});
