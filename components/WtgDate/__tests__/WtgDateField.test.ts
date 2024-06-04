import { mount, enableAutoUnmount } from '@vue/test-utils';
import WtgDateField from '..';
import WtgUi from '../../../WtgUi';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgDateField', () => {
    test('its name is WtgDateField', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.$options.__name).toBe('WtgDateField');
    });

    test('it sets the display value and internal value ref based on the value passed in as prop', () => {
        const wrapper = mountComponent({
            props: {
                modelValue: '09-Jan-24',
            },
        });

        expect(wrapper.vm.internalValue).toBe('09-Jan-24');
        expect(wrapper.vm.displayValue).toBe('09-Jan-24');
    });

    test('it formats the display value and internal value ref with a default formatter when a blur event is triggered', async () => {
        const wrapper = mountComponent({
            props: {
                modelValue: '09-Jan-24',
            },
        });

        const textField = wrapper.findComponent({ name: 'WtgTextField' });
        textField.vm.$emit('blur', '09-01-24');
        expect(wrapper.vm.internalValue).toBe('2024-01-09');
        expect(wrapper.vm.displayValue).toBe('09-Jan-24');
    });

    test('it formats the display value and internal value ref correctly when monthYearOnly props is true', async () => {
        const wrapper = mountComponent({
            props: {
                modelValue: '09-Jan-24',
                monthYearOnly: true,
            },
        });

        const textField = wrapper.findComponent({ name: 'WtgTextField' });
        textField.vm.$emit('blur', '09-01-24');
        expect(wrapper.vm.internalValue).toBe('2024-01');
        expect(wrapper.vm.displayValue).toBe('01-2024');
    });

    test('it emits a update:value event with correct internal value to allow 2-way binding with data from parent', async () => {
        const wrapper = mountComponent({
            props: {
                modelValue: '09-Jan-24',
            },
        });

        const textField = wrapper.findComponent({ name: 'WtgTextField' });
        textField.vm.$emit('blur', '09-01-24');
        expect(wrapper.emitted('change')).toBeTruthy();
        expect(wrapper.emitted('change')![0]).toStrictEqual(['2024-01-09']);
    });

    function mountComponent({ props = {}, slots = {} } = {}) {
        return mount(WtgDateField as any, {
            wtgUi,
            props,
            slots,
        });
    }
});
