import { defineComponent } from 'vue';
import { WtgRadio } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgRadio', () => {
    test('it sets the radio label to the label attribute passed in ', () => {
        const wrapper = mountComponent({
            propsData: {
                label: 'My Radio',
            },
        });
        const radioBtnlabel = wrapper.find('label');
        expect(radioBtnlabel.html()).toContain('My Radio');
    });

    test('it shows the s-icon-radio-off icon when the radio is not checked', async () => {
        const wrapper = mountComponent();

        const icon = wrapper.find('i');
        expect(icon.classes()).toContain('s-icon-radio-off');
    });

    test('it shows the s-icon-radio-on icon when the radio is checked', async () => {
        const wrapper = mountComponent({
            propsData: {
                modelValue: true,
            },
        });

        const icon = wrapper.find('i');
        expect(icon.classes()).toContain('s-icon-radio-on');
    });

    test('it should emit the update:modelValue event when the input change event is fired', async () => {
        const wrapper = mountComponent();
        const input = wrapper.find('input');
        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
        await input.setValue(true);
        expect(wrapper.emitted('update:modelValue')!.length).toBe(1);
        expect(wrapper.emitted('update:modelValue')![0][0]).toBe(true);
    });

    test('it implements v-model through the value property and the change event', async () => {
        const component = defineComponent({
            components: { WtgRadio },
            data: () => {
                return {
                    radio1Value: true,
                    radio2Value: false,
                };
            },
            template: '<wtg-radio v-model="radio1Value" name="group1" label="my radio 1" /><wtg-radio v-model="radio2Value" name="group1" label="my radio 2" />',
        });
        const wrapper = mount(component, {
            wtgUi,
        });
        const radio1 = wrapper.findAllComponents(WtgRadio).at(0);
        const radio2 = wrapper.findAllComponents(WtgRadio).at(1);
        expect(radio1!.props('modelValue')).toBe(true);
        expect(radio2!.props('modelValue')).toBe(false);

        const input = radio2!.find('input');
        await input.setValue(true);
        //expect(wrapper.vm.$data.radio1Value).toBe(false);
        expect(wrapper.vm.$data.radio2Value).toBe(true);
        //expect(radio1!.props('modelValue')).toBe(false);
        expect(radio2!.props('modelValue')).toBe(true);
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgRadio as any, {
            wtgUi,
            propsData,
        });
    }
});
