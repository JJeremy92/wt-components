import { createVuetify } from 'vuetify';
import { WtgBox } from '../';
import { WtgLayoutGrid } from '../../WtgLayoutGrid';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();
const vuetify = createVuetify();

describe('WtgBox', () => {
    test('it renders a div element', () => {
        const wrapper = mountComponent();
        expect(wrapper.element.tagName).toBe('DIV');
    });

    test('it has an absolute property that applies absolute positioning to the div element', async () => {
        const wrapper = mountComponent();

        let computedStyle = window.getComputedStyle(wrapper.element);
        expect(computedStyle.position).toBe('');
        expect(computedStyle.bottom).toBe('');
        expect(computedStyle.left).toBe('');
        expect(computedStyle.right).toBe('');
        expect(computedStyle.top).toBe('');

        await wrapper.setProps({
            absolute: true,
            bottom: '1px',
            left: '2px',
            right: '3px',
            top: '4px',
        });
        computedStyle = window.getComputedStyle(wrapper.element);
        expect(computedStyle.position).toBe('absolute');
        expect(computedStyle.bottom).toBe('1px');
        expect(computedStyle.left).toBe('2px');
        expect(computedStyle.right).toBe('3px');
        expect(computedStyle.top).toBe('4px');

        await wrapper.setProps({
            absolute: true,
            bottom: '1%',
            left: '2%',
            right: '3%',
            top: '4%',
        });
        computedStyle = window.getComputedStyle(wrapper.element);
        expect(computedStyle.position).toBe('absolute');
        expect(computedStyle.bottom).toBe('1%');
        expect(computedStyle.left).toBe('2%');
        expect(computedStyle.right).toBe('3%');
        expect(computedStyle.top).toBe('4%');

        await wrapper.setProps({
            absolute: true,
            bottom: '1',
            left: '2',
            right: '3',
            top: '4',
        });
        computedStyle = window.getComputedStyle(wrapper.element);
        expect(computedStyle.position).toBe('absolute');
        expect(computedStyle.bottom).toBe('1px');
        expect(computedStyle.left).toBe('2px');
        expect(computedStyle.right).toBe('3px');
        expect(computedStyle.top).toBe('4px');
    });

    test('when the layout property is NOT specified, it renders a div', () => {
        const wrapper = mountComponent();
        expect(wrapper.element.tagName).toBe('DIV');
    });

    test('when the layout property is set to GRID, it renders a layout grid', () => {
        const wrapper = mountComponent({
            propsData: { layout: 'grid' },
        });
        expect(wrapper.findComponent(WtgLayoutGrid).exists()).toBe(true);
    });

    test('when the layout property is set to FLEX, it renders a div AND it applies the d-flex class', () => {
        const wrapper = mountComponent({
            propsData: { layout: 'flex' },
        });
        expect(wrapper.element.tagName).toBe('DIV');
        expect(wrapper.classes()).toContain('d-flex');
    });

    test('when the layout property is set to FLEX, it also applies the classes for the flex-directive properties', () => {
        const wrapper = mountComponent({
            propsData: {
                layout: 'flex',
                flexDirection: 'flex-column-reverse',
                flexAlign: 'align-center',
                flexJustify: 'justify-end',
            },
        });
        expect(wrapper.classes()).toContain('flex-column-reverse');
        expect(wrapper.classes()).toContain('align-center');
        expect(wrapper.classes()).toContain('justify-end');
    });

    test('when the layout property is NOT set to FLEX, it does NOT apply the classes for the flex-directive properties', () => {
        const wrapper = mountComponent({
            propsData: {
                layout: 'grid',
                flexDirection: 'flex-column-reverse',
                flexAlign: 'align-center',
                flexJustify: 'justify-end',
            },
        });
        expect(wrapper.classes()).not.toContain('flex-column-reverse');
        expect(wrapper.classes()).not.toContain('align-center');
        expect(wrapper.classes()).not.toContain('justify-end');
    });

    test('it has a columns property mixed in that allows it to be positioned inside a wtg-layout-grid', () => {
        const wrapper = mountComponent({
            propsData: { columns: 'col-md-6 col-xl-4' },
        });
        expect(wrapper.props('columns')).toBe('col-md-6 col-xl-4');
    });

    test('it has measure capability mixed in allowing quick access to common sizing attributes', async () => {
        const wrapper = mountComponent();

        expect(wrapper.html()).not.toContain('max-width');
        await wrapper.setProps({ maxWidth: 1200 });
        expect(wrapper.html()).toContain('max-width: 1200px;');
        await wrapper.setProps({ maxWidth: 'calc(100% - 32px)' });
        expect(wrapper.html()).toContain('max-width: calc(100% - 32px);');
        await wrapper.setProps({ maxWidth: undefined });
        expect(wrapper.html()).not.toContain('max-width');

        await wrapper.setProps({
            height: 1000,
            minHeight: '20%',
            minWidth: 300,
            maxHeight: 1200,
            maxWidth: 700,
            width: 'calc(100% - 32px)',
        });

        expect(wrapper.html()).toContain('height: 1000px;');
        expect(wrapper.html()).toContain('min-height: 20%;');
        expect(wrapper.html()).toContain('min-width: 300px;');
        expect(wrapper.html()).toContain('max-height: 1200px;');
        expect(wrapper.html()).toContain('max-width: 700px;');
        expect(wrapper.html()).toContain('width: calc(100% - 32px);');
    });

    function mountComponent({ propsData = {}, slots = {} } = {}) {
        return mount(WtgBox, {
            wtgUi,
            propsData,
            slots,
            global: {
                plugins: [vuetify],
            },
        });
    }
});
