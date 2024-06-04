import { mount, enableAutoUnmount } from '@vue/test-utils';
import WtgTimeField from '..';
import WtgUi from '../../../WtgUi';
import { nextTick } from 'vue';

enableAutoUnmount(afterEach);

const $wtgUi = new WtgUi();

describe('WtgTimeField', () => {
    test('its name is WtgTimeField', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.$options.__name).toBe('WtgTimeField');
    });

    describe('when given a formatter', () => {
        let wrapper;
        const time = '13:01:10';

        beforeEach(() => {
            const formatter: any = {
                formatTime(time: string, useSeconds: boolean): string {
                    const hhmmss = time.split(':').concat('00', '00');
                    let result = (hhmmss[0] ?? '00') + ' ' + (hhmmss[1] ?? '00');
                    if (useSeconds) {
                        result += ' ' + (hhmmss[2] ?? '00');
                    }
                    return result;
                },
                parseTime(time: string, useSeconds: boolean): string {
                    const hhmmss = (time === 'noon' ? ['12'] : time.split(' ')).concat('00', '00');
                    let result = (hhmmss[0] ?? '00') + ':' + (hhmmss[1] ?? '00');
                    if (useSeconds) {
                        result += ':' + (hhmmss[2] ?? '00');
                    }
                    return result;
                },
            };
            wrapper = mountComponent({
                propsData: {
                    value: time,
                    useSeonds: false,
                    formatter: formatter,
                },
            });
        });

        test('it uses the formatter to create the display value', async () => {
            const textField = wrapper.findComponent({ name: 'WtgTextField' });
            await textField.vm.$emit('blur', time);
            expect(textField.props('value')).toBe('13 01');

            await wrapper.setProps({ useSeconds: true });
            expect(textField.props('value')).toBe('13 01 10');
        });

        test('when the input changes and the field loses focus, it uses the formatter to parse the display value back into an ISO time string', async () => {
            const textField = wrapper.findComponent({ name: 'WtgTextField' });

            await textField.vm.$emit('blur', '17:15');
            expect(textField.props('value')).toBe('17 15');
            await textField.vm.$emit('blur', 'noon');
            expect(textField.props('value')).toBe('12 00');

            await wrapper.setProps({ useSeconds: true });

            await textField.vm.$emit('blur', '17:15:30');
            expect(textField.props('value')).toBe('17 15 30');

            await textField.vm.$emit('blur', 'noon');
            expect(textField.props('value')).toBe('12 00 00');
        });
    });

    describe('when NOT given a formatter', () => {
        let wrapper;
        const time = '13:01:10';

        beforeEach(() => {
            wrapper = mountComponent({
                propsData: {
                    value: time,
                    useSeconds: false,
                },
            });
        });

        test('it uses the builtin (locale aware) formatter to create the display value', async () => {
            const textField = wrapper.findComponent({ name: 'WtgTextField' });
            expect(textField.props('value')).toBe('13:01');

            $wtgUi.language.current = 'en-US';

            await textField.vm.$emit('blur', '13:01');
            expect(textField.props('value')).toBe('01:01 PM');
        });

        test('when the input changes and the field loses focus, it uses the builtin (locale aware) parser to parse the display value back into an ISO date string', async () => {
            const textField = wrapper.findComponent({ name: 'WtgTextField' });

            $wtgUi.language.current = 'en-AU';
            await nextTick();

            await textField.vm.$emit('blur', '1:30 PM');
            expect(textField.props('value')).toBe('13:30');

            await wrapper.setProps({ useSeconds: true });

            await textField.vm.$emit('blur', '1:30:59 PM');
            expect(textField.props('value')).toBe('13:30:59');
        });
    });

    function mountComponent({ propsData = {}, slots = {} } = {}) {
        return mount(WtgTimeField as any, {
            $wtgUi,
            propsData,
            slots,
        });
    }
});
