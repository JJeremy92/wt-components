import { nextTick } from 'vue';
import  { WtgNumberField } from '../..';
import { mount } from '@vue/test-utils';
import AutoNumeric from 'autonumeric';
import autoNumericOptionsFromLocale from '../autoNumericOptionsFromLocale';
import WtgUi from '../../../../WtgUi';

const wtgUi = new WtgUi();

describe('autoNumericOptionsFromLocale', () => {
    test('it is formatting values with scale', async () => {
        const wrapper = mountComponent();
        let options = autoNumericOptionsFromLocale(wrapper.vm.locale, { decimals: 2 });

        expect(AutoNumeric.format(1234, options)).toBe('1,234.00');

        options = autoNumericOptionsFromLocale(wrapper.vm.locale, { decimals: 4 });
        expect(AutoNumeric.format(1234, options)).toBe('1,234.0000');
    });

    test('it turns off digit grouping if explicitly asked to', async () => {
        const wrapper = mountComponent();
        const options = autoNumericOptionsFromLocale(wrapper.vm.locale, {
            decimals: 2,
            noDigitGrouping: true,
        });

        expect(AutoNumeric.format(1234, options)).toBe('1234.00');
    });

    test('it will adjust values when the locale changes', async () => {
        const wrapper = mountComponent();
        let options = autoNumericOptionsFromLocale(wrapper.vm.locale, { decimals: 2 });

        expect(AutoNumeric.format(1234, options)).toBe('1,234.00');

        wtgUi.language.current = 'fr';
        await nextTick();
        options = autoNumericOptionsFromLocale(wrapper.vm.locale, { decimals: 2 });
        expect(AutoNumeric.format(1234, options)).toBe('1 234,00');

        wtgUi.language.current = 'nl';
        await nextTick();
        options = autoNumericOptionsFromLocale(wrapper.vm.locale, { decimals: 2 });
        expect(AutoNumeric.format(1234, options)).toBe('1.234,00');
    });

    test('it will suppress trail zeroes when suppressTrailingZeroes is true', async () => {
        const wrapper = mountComponent();
        wtgUi.language.current = 'au';

        let options = autoNumericOptionsFromLocale(wrapper.vm.locale, {
            decimals: 2,
            suppressTrailingZeroes: false,
        });
        expect(AutoNumeric.format(1234, options)).toBe('1,234.00');

        options = autoNumericOptionsFromLocale(wrapper.vm.locale, {
            decimals: 2,
            suppressTrailingZeroes: true,
        });
        expect(AutoNumeric.format(1234, options)).toBe('1,234');
    });

    describe('minimumValue', () => {
        test('it will set the minimumValue option when a minValue is given', async () => {
            const wrapper = mountComponent();
            wtgUi.language.current = 'au';

            let options: AutoNumeric.Options;

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { minValue: 0 });
            expect(options.minimumValue).toBe('0');

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { minValue: 1000 });
            expect(options.minimumValue).toBe('1000');

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { minValue: -5000 });
            expect(options.minimumValue).toBe('-5000');

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { minValue: '0' });
            expect(options.minimumValue).toBe('0');

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { minValue: '1000' });
            expect(options.minimumValue).toBe('1000');

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { minValue: '-5000' });
            expect(options.minimumValue).toBe('-5000');
        });

        test('it will not set the minimumValue option when a non-numeric minValue is given', async () => {
            const wrapper = mountComponent();
            wtgUi.language.current = 'au';

            let options: AutoNumeric.Options;

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { minValue: '' });
            expect(options.minimumValue).toBe(undefined);

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { minValue: 'not-a-number' });
            expect(options.minimumValue).toBe(undefined);

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { minValue: undefined });
            expect(options.minimumValue).toBe(undefined);
        });
    });

    describe('maximumValue', () => {
        test('it will set the maximumValue option when a maxValue is given', async () => {
            const wrapper = mountComponent();
            wtgUi.language.current = 'au';

            let options: AutoNumeric.Options;

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { maxValue: 0});
            expect(options.maximumValue).toBe('0');

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { maxValue: 2000});
            expect(options.maximumValue).toBe('2000');

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { maxValue: -3000});
            expect(options.maximumValue).toBe('-3000');

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { maxValue: '0'});
            expect(options.maximumValue).toBe('0');

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { maxValue: '2000'});
            expect(options.maximumValue).toBe('2000');

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { maxValue: '-3000'});
            expect(options.maximumValue).toBe('-3000');
        });

        test('it will not set the maximumValue option when a non-numeric maxValue is given', async () => {
            const wrapper = mountComponent();
            wtgUi.language.current = 'au';

            let options: AutoNumeric.Options;

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { maxValue: ''});
            expect(options.maximumValue).toBe(undefined);

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { maxValue: 'not-a-number'});
            expect(options.maximumValue).toBe(undefined);

            options = autoNumericOptionsFromLocale(wrapper.vm.locale, { maxValue: undefined});
            expect(options.maximumValue).toBe(undefined);
        });
    });

    test(`it will set emptyInputBehaviour to 'zero' when zeroWhenEmpty is true`, async () => {
        const wrapper = mountComponent();
        wtgUi.language.current = 'au';

        let options = autoNumericOptionsFromLocale(wrapper.vm.locale, {
            decimals: 2,
            zeroWhenEmpty: false,
        });
        expect(options.emptyInputBehavior).toBeUndefined();

        options = autoNumericOptionsFromLocale(wrapper.vm.locale, {
            decimals: 2,
            zeroWhenEmpty: true,
        });
        expect(options.emptyInputBehavior).toBe('zero');
    });

    function mountComponent({ propsData = {}, listeners = {}, scopedSlots = {}, slots = {} } = {}) {
        return mount(WtgNumberField, {
            wtgUi,
            propsData,
            listeners,
            scopedSlots,
            slots,
        });
    }
});
