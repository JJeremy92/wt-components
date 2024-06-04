import WtgSplitButton from '../';
import WtgButton from '../../WtgButton';
import WtgIconButton from '../../WtgIconButton';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();
const vuetify = createVuetify();
class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
}
window.ResizeObserver ??= ResizeObserverStub;

describe('WtgSplitButton', () => {
    test('it renders the left with correct slot', () => {
        const wrapper = mountComponent();
        const button = wrapper.findComponent(WtgButton);
        expect(button.text()).toBe('My Button');
    });

    test('it renders the left button with placeholder leading icon', () => {
        const wrapper = mountComponent({
            propsData: {
                leadingIcon: '$placeholder',
            },
        });
        const button = wrapper.findComponent(WtgButton);
        expect(button.props('leadingIcon')).toBe('$placeholder');
    });

    test('it emits a click event when the left button is clicked', async () => {
        const wrapper = mountComponent();
        const button = wrapper.findComponent(WtgButton);
        expect(wrapper.emitted('click')).toBeUndefined();
        await button.trigger('click');
        expect(wrapper.emitted('click')!.length).toBe(1);
        expect(wrapper.emitted('click')[0][0]).toBeInstanceOf(MouseEvent);
    });

    test('it passes the variant props to WtgButton', () => {
        const wrapper = mountComponent({
            propsData: {
                variant: 'primary',
            },
        });
        const button = wrapper.findComponent(WtgButton);
        expect(button.props('variant')).toBe('primary');
    });

    test('it has a WtgIconButton with caret switch button', () => {
        const wrapper = mountComponent();
        const dropdownBtn = wrapper.findComponent(WtgIconButton);
        expect(dropdownBtn.props('icon')).toBe('$caret-switch');
    });

    test('it passes the variant props to WtgIconButton', () => {
        const wrapper = mountComponent({
            propsData: {
                variant: 'primary',
            },
        });
        const dropdownBtn = wrapper.findComponent(WtgIconButton);
        expect(dropdownBtn.props('variant')).toBe('primary');
    });

    test('it has a WtgIconButton with caret switch button', () => {
        const wrapper = mountComponent();
        const dropdownBtn = wrapper.findComponent(WtgIconButton);
        expect(dropdownBtn.props('icon')).toBe('$caret-switch');
    });

    test('it applies the correct classes when dropdown button is active', async () => {
        const wrapper = mountComponent({
            propsData: {
                variant: 'primary',
            },
        });
        const dropdownBtn = wrapper.findComponent(WtgIconButton);
        await dropdownBtn.trigger('click');
        expect(dropdownBtn.classes()).toContain('wts-dropdown-button-active-primary');
    });

    test('it renders a WtgPopover', () => {
        const wrapper = mountComponent();
        expect(wrapper.findComponent({ name: 'WtgPopover' }).exists()).toBe(true);
    });

    test('it passes location: top right to WtgPopover when openPosition is set to top', () => {
        const wrapper = mountComponent({ propsData: { openPosition: 'top' } });
        expect(wrapper.findComponent({ name: 'WtgPopover' }).props('location')).toBe('top right');
    });

    test('it passes location: bottom right to WtgPopover when openPosition is set to bottom', () => {
        const wrapper = mountComponent({ propsData: { openPosition: 'bottom' } });
        expect(wrapper.findComponent({ name: 'WtgPopover' }).props('location')).toBe('bottom right');
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgSplitButton as any, {
            wtgUi,
            propsData,
            slots: {
                default: 'My Button',
            },
            global: {
                plugins: [vuetify],
            },
        });
    }
});
