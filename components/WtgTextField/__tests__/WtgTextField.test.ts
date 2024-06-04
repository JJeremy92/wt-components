import { WtgTextField } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgTextField', () => {
    test('its name is WtgTextField', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.$options.__name).toBe('WtgTextField');
    });

    test('it emits the focus event', async () => {
        const wrapper = mountComponent();
        const input = wrapper.find('[type="text"]');
        await input.trigger('focus');

        expect(wrapper.emitted('focus')).toBeTruthy();
    });

    test('it emits the blur event', async () => {
        const wrapper = mountComponent();
        const input = wrapper.find('[type="text"]');
        await input.trigger('blur');

        expect(wrapper.emitted('blur')).toBeTruthy();
    });

    test('it emits the change event', async () => {
        const wrapper = mountComponent();
        const input = wrapper.find('[type="text"]');

        await input.trigger('click');
        await input.setValue('some text');

        expect(wrapper.emitted('input')).toBeTruthy();
        expect(wrapper.emitted('change')).toBeTruthy();
    });

    test('when not hiding description, it shows an input and a span, the input is for editing the value, the span is for displaying the description', () => {
        const wrapper = mountComponent({
            propsData: {
                value: 'ABC',
                description: 'some description',
                showDescription: true,
            },
        });
        const input = wrapper.find('input');
        expect(input.exists()).toBe(true);
        const spans = wrapper.findAll('span');
        expect(spans.length).toBe(2);

        const inputElement = input.element as HTMLInputElement;
        const descriptionSpan = spans.at(1);
        expect(inputElement.value).toBe('ABC');
        expect(inputElement.readOnly).toBeFalsy();
        expect(descriptionSpan.text()).toBe('some description');
    });

    test('when hiding the description, it shows 1 input only, just for editing the value', () => {
        const wrapper = mountComponent({
            propsData: {
                value: 'ABC',
                description: 'some description',
            },
        });
        const input = wrapper.find('input');
        expect(input.exists()).toBe(true);
        const spans = wrapper.findAll('span');
        expect(spans.length).toBe(0);

        const inputElement = input.element as HTMLInputElement;
        expect(inputElement.value).toBe('ABC');
        expect(inputElement.readOnly).toBeFalsy();
    });

    function mountComponent({ propsData = {}, slots = {} } = {}) {
        return mount(WtgTextField as any, {
            wtgUi,
            propsData,
            slots,
        });
    }
});
