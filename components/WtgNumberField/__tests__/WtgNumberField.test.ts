import { mount, enableAutoUnmount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { WtgNumberField } from '..';
import WtgTextField from '../../WtgTextField';
import WtgUi from '../../../WtgUi';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgNumberField', () => {
    test('its name is WtgNumberField', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.$options.__name).toBe('WtgNumberField');
    });

    test('it should accept string entries', () => {
        let wrapper = mountComponent({
            props: {
                modelValue: '100',
            },
        });
        let nativeInput = wrapper.find('input');
        expect(parseFloat(nativeInput.element.value)).toEqual(100);
        wrapper = mountComponent({
            props: {
                modelValue: 'abc',
            },
        });
        nativeInput = wrapper.find('input');
        expect(nativeInput.element.value).toEqual('');
    });

    test('it should update the model value when input value changes', async () => {
        const wrapper = mountComponent({
            props: {
                modelValue: 1234,
                decimals: 2,
            },
        });

        const textField = wrapper.findComponent(WtgTextField).vm;
        textField.$emit('change', '2345.12');
        expect(wrapper.emitted('update:modelValue')![0][0]).toBe(2345.12);
    });

    test('it caters for min and max attributes of the native numeric input', () => {
        const wrapper = mountComponent({
            props: {
                minValue: 10,
                maxValue: 20,
            },
        });
        const nativeInput = wrapper.find('input');
        expect(parseFloat(nativeInput.attributes('min') || '')).toEqual(10);
        expect(parseFloat(nativeInput.attributes('max') || '')).toEqual(20);
    });

    test('it is responding to value changes correctly with the correct format', async () => {
        const wrapper = mountComponent({
            props: {
                modelValue: 1234,
                decimals: 4,
                minValue: -100000,
                maxValue: 100000,
            },
        });

        const textField = wrapper.findComponent(WtgTextField).vm;
        await wrapper.setProps({ modelValue: 4321 });
        expect(textField.$props.value).toBe('4,321.0000');
    });

    test('it will suppress trail zeroes when suppressTrailingZeroes is true', async () => {
        const wrapper = mountComponent({
            props: {
                modelValue: 1234,
                decimals: 4,
                minValue: -100000,
                maxValue: 100000,
                suppressTrailingZeroes: true,
            },
        });

        const textField = wrapper.findComponent(WtgTextField).vm;
        await wrapper.setProps({ modelValue: 4321.0 });
        expect(textField.$props.value).toBe('4,321');
    });

    test('when the zeroWhenEmpty property is true, it will set the value to zero when the user empties the field', async () => {
        const wrapper = mountComponent({
            props: {
                modelValue: 1234,
                zeroWhenEmpty: true,
            },
        });

        const textField = wrapper.findComponent(WtgTextField).vm;
        await wrapper.setProps({ modelValue: '' });
        expect(textField.$props.value).toBe('0');
    });

    test('when the zeroWhenEmpty property is false, it will set the value to blanks when the user empties the field', async () => {
        const wrapper = mountComponent({
            props: {
                modelValue: 1234,
                zeroWhenEmpty: false,
            },
        });

        const textField = wrapper.findComponent(WtgTextField).vm;
        await wrapper.setProps({ modelValue: '' });
        expect(textField.$props.value).toBe('');
    });

    test('it is formatting the input value with decimals', async () => {
        const wrapper = mountComponent({
            props: {
                modelValue: 1234,
                decimals: 2,
            },
        });

        expect(wrapper.vm.displayValue).toBe('1,234.00');
    });

    test('it is formatting the input value without digit grouping if requested', async () => {
        const wrapper = mountComponent({
            props: {
                modelValue: 123456789,
            },
        });
        expect(wrapper.vm.displayValue).toBe('123,456,789');

        await wrapper.setProps({ noDigitGrouping: true });
        expect(wrapper.vm.displayValue).toBe('123456789');

        await wrapper.setProps({ noDigitGrouping: false });
        expect(wrapper.vm.displayValue).toBe('123,456,789');
    });

    test('it is formatting Infinity as a blank string and not passing it to autoNumeric', async () => {
        const wrapper = mountComponent({
            props: {
                modelValue: Infinity,
                decimals: 2,
            },
        });

        expect(wrapper.vm.displayValue).toBe('');
        expect(wrapper.vm.nonReactive.autoNumeric.getFormatted()).toBe('');
    });

    test('it formats massive values over type maximum to the maximumValue', () => {
        const wrapper = mountComponent({
            props: {
                modelValue: 1234,
                decimals: 4,
                minValue: -100000,
                maxValue: 100000,
            },
        });

        const textField = wrapper.findComponent(WtgTextField);
        textField.vm.$emit('change', '999,999,999,999,999,999,999,999,999,999.123');

        expect(wrapper.vm.displayValue).toBe('100,000.0000');
        expect(wrapper.vm.nonReactive.autoNumeric.getNumericString()).toBe('100000');
    });

    test('it formats massive values under type minimum to the minimumValue', () => {
        const wrapper = mountComponent({
            props: {
                modelValue: 1234,
                decimals: 4,
                minValue: -100000,
                maxValue: 100000,
            },
        });

        const textField = wrapper.findComponent(WtgTextField);
        textField.vm.$emit('change', '-999,999,999,999,999,999,999,999,999,999.123');

        expect(wrapper.vm.displayValue).toBe('-100,000.0000');
        expect(wrapper.vm.nonReactive.autoNumeric.getNumericString()).toBe('-100000');
    });

    test('it formats correctly with minValue==0', () => {
        const wrapper = mountComponent({
            props: {
                modelValue: 8,
                minValue: 0,
                maxValue: 10,
            },
        });

        const textField = wrapper.findComponent(WtgTextField);
        textField.vm.$emit('change', '-3');

        expect(wrapper.vm.displayValue).toBe('0');
        expect(wrapper.vm.nonReactive.autoNumeric.getNumericString()).toBe('0');
    });

    test('it formats correctly with maxValue==0', () => {
        const wrapper = mountComponent({
            props: {
                modelValue: 8,
                minValue: -10,
                maxValue: 0,
            },
        });

        const textField = wrapper.findComponent(WtgTextField);
        textField.vm.$emit('change', '3');

        expect(wrapper.vm.displayValue).toBe('0');
        expect(wrapper.vm.nonReactive.autoNumeric.getNumericString()).toBe('0');
    });

    test('it does not modify empty value when formatting', () => {
        const wrapper = mountComponent({ props: { modelValue: '100' } });

        const textField = wrapper.findComponent(WtgTextField);
        textField.vm.$emit('change', '');

        expect(wrapper.vm.displayValue).toBe('');
        expect(wrapper.vm.nonReactive.autoNumeric.getNumericString()).toBe('');
    });

    test('it will adjust the display value each time the locale changes', async () => {
        const wrapper = mountComponent({
            props: {
                modelValue: 1234,
                decimals: 2,
            },
        });
        expect(wrapper.vm.displayValue).toBe('1,234.00');

        wtgUi.language.current = 'fr';
        await nextTick();
        expect(wrapper.vm.displayValue).toBe('1 234,00');

        wtgUi.language.current = 'nl';
        await nextTick();
        expect(wrapper.vm.displayValue).toBe('1.234,00');
    });

    function mountComponent({ props = {}, slots = {} } = {}) {
        return mount(WtgNumberField as any, {
            wtgUi,
            props,
            slots,
        });
    }
});
