import { WtgInput } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgInput', () => {
    test('its name is WtgInput', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.$options.__name).toBe('WtgInput');
    });

    test('it applies the wts-default-content style to the default slot', () => {
        const wrapper = mountComponent({
            slots: {
                default: '<span id="text">Some text</span>',
            },
        });
        const slotContent = wrapper.find('.wts-default-content');
        expect(slotContent.html()).toContain('<span id="text">Some text</span>');
    });

    test('it applies the wts-input-leading-outer-content style to the leading slot', () => {
        const wrapper = mountComponent({
            slots: {
                leading: '<span id="text">leading content</span>',
            },
        });
        const slotContent = wrapper.find('.wts-input-leading-outer-content');
        expect(slotContent.html()).toContain('<span id="text">leading content</span>');
    });

    test('it applies the wts-input-leading-inner-content style to the leadingInner slot', () => {
        const wrapper = mountComponent({
            slots: {
                leadingInner: '<span id="text">leading inner content</span>',
            },
        });
        const slotContent = wrapper.find('.wts-input-leading-inner-content');
        expect(slotContent.html()).toContain('<span id="text">leading inner content</span>');
    });

    test('it applies the wts-input-trailing-inner-content style to the trailingInner slot', () => {
        const wrapper = mountComponent({
            slots: {
                trailingInner: '<span id="text">trailing inner content</span>',
            },
        });
        const slotContent = wrapper.find('.wts-input-trailing-inner-content');
        expect(slotContent.html()).toContain('<span id="text">trailing inner content</span>');
    });

    test('it applies the wts-input-trailing-outer-content style to the trailingInner slot', () => {
        const wrapper = mountComponent({
            slots: {
                trailing: '<span id="text">trailing outer content</span>',
            },
        });
        const slotContent = wrapper.find('.wts-input-trailing-outer-content');
        expect(slotContent.html()).toContain('<span id="text">trailing outer content</span>');
    });

    test('it renders the messages list passed in the messages property', () => {
        const wrapper = mountComponent({
            props: {
                messages: ['this is a test message'],
            },
        });
        const messagesContent = wrapper.find('.wts-input-messages');
        expect(messagesContent.html()).toContain('<li>this is a test message</li>');
    });

    test('it set the label props as the input label', () => {
        const wrapper = mountComponent({
            props: { label: 'label text' },
        });
        const labelContent = wrapper.find('.wts-input-label');
        expect(labelContent.html()).toContain('label text');
    });

    test('it set the icon props to the appropriate slots', () => {
        const wrapper = mountComponent({
            props: {
                leadingIcon: '$phone',
                leadingInnerIcon: '$pin',
                trailingInnerIcon: '$placeholder',
                trailingIcon: '$plane',
            },
        });

        expect(wrapper.find('.wts-input-leading-outer-content').html()).toContain('wts-icon s-icon-phone');
        expect(wrapper.find('.wts-input-leading-inner-content').html()).toContain('wts-icon s-icon-pin');
        expect(wrapper.find('.wts-input-trailing-inner-content').html()).toContain('wts-icon s-icon-placeholder');
        expect(wrapper.find('.wts-input-trailing-outer-content').html()).toContain('wts-icon s-icon-plane');
    });

    test('it applies the correct style when WtgInput is set to isValid', () => {
        const wrapper = mountComponent({
            props: {
                isValid: true,
            },
        });
        expect(wrapper.classes()).toContain('wts-input-field-valid');
    });

    test('it applies the correct style when WtgInput is set to isWarning', () => {
        const wrapper = mountComponent({
            props: {
                isWarning: true,
            },
        });
        expect(wrapper.classes()).toContain('wts-input-field-warning');
    });

    test('it applies the correct style when WtgInput is set to isInvalid', () => {
        const wrapper = mountComponent({
            props: {
                isInvalid: true,
            },
        });
        expect(wrapper.classes()).toContain('wts-input-field-invalid');
    });

    test('it applies the correct style when WtgInput is set to isDisabled', () => {
        const wrapper = mountComponent({
            props: {
                isDisabled: true,
            },
        });
        expect(wrapper.classes()).toContain('wts-input-field-disabled');
    });

    test('it applies the correct style when WtgInput is set to isReadOnly', () => {
        const wrapper = mountComponent({
            props: {
                isReadOnly: true,
            },
        });
        expect(wrapper.classes()).toContain('wts-input-field-readonly');
    });

    test('it applies the correct style when WtgInput is set to isLoading', () => {
        const wrapper = mountComponent({
            props: {
                isLoading: true,
            },
        });
        expect(wrapper.classes()).toContain('wts-input-field-loading');
    });

    function mountComponent({ props = {}, slots = {} } = {}) {
        return mount(WtgInput as any, {
            wtgUi,
            props,
            slots,
        });
    }
});
