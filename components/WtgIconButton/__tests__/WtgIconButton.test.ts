import { WtgIconButton } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgIconButton', () => {
    test('it renders a <button> tag', () => {
        const wrapper = mountComponent();
        expect(wrapper.element.tagName).toBe('BUTTON');
    });

    test('it emits a click event when the <button> is clicked', async () => {
        const wrapper = mountComponent();
        const button = wrapper.find('button');
        expect(wrapper.emitted('click')).toBeUndefined();
        await button.trigger('click');
        expect(wrapper.emitted('click')!.length).toBe(1);
        expect(wrapper.emitted('click')[0][0]).toBeInstanceOf(MouseEvent);
    });

    test('it applies correct classes for Icon button that is primary ', () => {
        const wrapper = mountComponent({
            propsData: {
                variant: 'primary',
            },
        });
        const wtgIconButton = wrapper.find('.wts-icon-button');
        expect(wtgIconButton.classes()).toContain('wts-button');
        expect(wtgIconButton.classes()).toContain('wts-icon-button');
        expect(wtgIconButton.classes()).toContain('wts-button-color');
        expect(wtgIconButton.classes()).toContain('wts-button-primary');
    });

    test('it applies correct classes for Icon button that is ghost ', () => {
        const wrapper = mountComponent({
            propsData: {
                variant: 'ghost',
            },
        });
        const wtgIconButton = wrapper.find('.wts-icon-button');
        expect(wtgIconButton.classes()).toContain('wts-button');
        expect(wtgIconButton.classes()).toContain('wts-icon-button');
        expect(wtgIconButton.classes()).toContain('wts-button-color');
        expect(wtgIconButton.classes()).toContain('wts-button-ghost');
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgIconButton as any, {
            wtgUi,
            propsData,
        });
    }
});
