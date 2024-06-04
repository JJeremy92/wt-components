import { DOMWrapper, mount, enableAutoUnmount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import WtgPopover from '..';
import WtgUi from '../../../WtgUi';

const wtgUi = new WtgUi();
const vuetify = createVuetify();
class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
}
window.ResizeObserver ??= ResizeObserverStub;
enableAutoUnmount(afterEach);

describe('WtgPopover', () => {
    test('it renders a VMenu component', () => {
        const wrapper = mountComponent();
        expect(wrapper.findComponent({ name: 'VMenu' }).exists()).toBe(true);
    });

    test('it passes its properties down to the VMenu component', () => {
        const wrapper = mountComponent({
            propsData: { closeOnContentClick: true, location: 'top right', modelValue: true, transition: false },
        });
        const menuProps = wrapper.findComponent({ name: 'VMenu' }).props();
        expect(menuProps.closeOnContentClick).toBe(true);
        expect(menuProps.location).toBe('top right');
        expect(menuProps.modelValue).toBe(true);
        expect(menuProps.transition).toBe(false);
    });

    test('it emits an update:model-value event when the VMenu component emits an update:model-value event', async () => {
        const wrapper = mountComponent({ propsData: { modelValue: true } });
        const menu = wrapper.findComponent({ name: 'VMenu' });
        menu.vm.$emit('update:model-value', false);
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted('update:model-value')[0][0]).toBe(false);
    });

    test('it toggles default slot visibility when the activator is clicked', async () => {
        const wrapper = mountComponent();
        const menu = wrapper.findComponent({ name: 'VMenu' });
        const button = wrapper.find('button');
        expect(menu.emitted('update:modelValue')).toBe(undefined);
        await button.trigger('click');
        expect(menu.emitted('update:modelValue').length).toBe(1);
        expect(menu.emitted('update:modelValue')[0][0]).toBe(true);
        await button.trigger('click');
        expect(menu.emitted('update:modelValue').length).toBe(2);
        expect(menu.emitted('update:modelValue')[1][0]).toBe(false);
    });

    test('it has an isActive prop on the default slot that toggles default slot visibility', async () => {
        const wrapper = mountComponent();
        const button = wrapper.find('button');
        await button.trigger('click');
        const closeMenuButton = new DOMWrapper(document.body).find('button');
        expect(closeMenuButton.html()).toContain('Close Menu');
        await closeMenuButton.trigger('click');
        expect(wrapper.findComponent({ name: 'VMenu' }).emitted('update:modelValue')[1][0]).toBe(false);
    });

    test('it applies the wts-popover class if variant is Pop over', async () => {
        const wrapper = mountComponent({ propsData: { variant: 'Pop over' } });
        const button = wrapper.find('button');
        await button.trigger('click');
        const popoverContainer = new DOMWrapper(document.body).find('#popoverContainer');
        expect(popoverContainer.classes('wts-popover')).toBe(true);
    });

    test('it applies the wts-dropdown class if variant is Dropdown', async () => {
        const wrapper = mountComponent({ propsData: { variant: 'Dropdown' } });
        const button = wrapper.find('button');
        await button.trigger('click');
        const popoverContainer = new DOMWrapper(document.body).find('#popoverContainer');
        expect(popoverContainer.classes('wts-dropdown')).toBe(true);
    });

    test('it applies the wts-elevation-100 class if elevation is 100', async () => {
        const wrapper = mountComponent({ propsData: { elevation: '100' } });
        const button = wrapper.find('button');
        await button.trigger('click');
        const popoverContainer = new DOMWrapper(document.body).find('#popoverContainer');
        expect(popoverContainer.classes('wts-elevation-100')).toBe(true);
    });

    test('it applies the wts-elevation-200 class if elevation is 200', async () => {
        const wrapper = mountComponent({ propsData: { elevation: '200' } });
        const button = wrapper.find('button');
        await button.trigger('click');
        const popoverContainer = new DOMWrapper(document.body).find('#popoverContainer');
        expect(popoverContainer.classes('wts-elevation-200')).toBe(true);
    });

    test('it applies the wts-elevation-300 class if elevation is 300', async () => {
        const wrapper = mountComponent({ propsData: { elevation: '300' } });
        const button = wrapper.find('button');
        await button.trigger('click');
        const popoverContainer = new DOMWrapper(document.body).find('#popoverContainer');
        expect(popoverContainer.classes('wts-elevation-300')).toBe(true);
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgPopover, {
            wtgUi,
            props: propsData,
            slots: {
                activator: '<button v-bind="params.props">Activator</button>',
                default: '<button @click="() => params.isActive.value = false">Close Menu</button>',
            },
            global: {
                plugins: [vuetify],
            },
        });
    }
});
