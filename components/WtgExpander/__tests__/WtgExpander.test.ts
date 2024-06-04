import WtgExpander from '../WtgExpander.vue';
import WtgExpansionPanel from '../WtgExpansionPanel.vue';
import WtgExpansionPanelHeader from '../WtgExpansionPanelHeader.vue';
import WtgExpansionPanelContent from '../WtgExpansionPanelContent.vue';
import { h } from 'vue';
import { mount, enableAutoUnmount } from '@vue/test-utils';
import WtgUi from '../../../WtgUi';
enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgExpander', () => {
    test('it renders a div component', () => {
        const wrapper = mountComponent();
        expect(wrapper.element.tagName).toBe('DIV');
    });

    test('it passes the wts-expander-panel class to the component if variant is panel', () => {
        const wrapper = mountComponent({ propsData: { variant: 'panel' } });
        expect(wrapper.classes('wts-expander-panel')).toBe(true);
    });

    test('it passes the wts-expander-group class to the component if variant is group', () => {
        const wrapper = mountComponent({ propsData: { variant: 'group' } });
        expect(wrapper.classes('wts-expander-group')).toBe(true);
    });

    test('it closes the currently open panel when a new panel is opened', async () => {
        const wrapper = mountComponent();

        const expansionPanel1 = wrapper.findComponent({ name: 'WtgExpansionPanel' });
        expect(expansionPanel1.vm.open).toBe(false);
        const expansionPanel1ExpandButton = wrapper.findComponent({ name: 'WtgIconButton' });
        await expansionPanel1ExpandButton.trigger('click');
        expect(expansionPanel1.vm.open).toBe(true);

        const expansionPanel2ExpandButton = wrapper
            .findAllComponents({ name: 'WtgExpansionPanel' })
            .at(1)
            .findComponent({ name: 'WtgIconButton' });
        await expansionPanel2ExpandButton.trigger('click');
        expect(expansionPanel1.vm.open).toBe(false);
    });

    test('it opens the first panel by default if mandatory is true', () => {
        const wrapper = mountComponent({ propsData: { mandatory: true } });

        const expansionPanel1 = wrapper.findComponent({ name: 'WtgExpansionPanel' });
        expect(expansionPanel1.vm.open).toBe(true);
    });

    test('it opens the first panel by default if mandatory is true and value is an empty array', () => {
        const wrapper = mountComponent({ propsData: { mandatory: true, value: [] } });

        const expansionPanel1 = wrapper.findComponent({ name: 'WtgExpansionPanel' });
        expect(expansionPanel1.vm.open).toBe(true);
    });

    test('it opens the panel provided by value if mandatory is true and value is provided', () => {
        const wrapper = mountComponent({ propsData: { value: 1, mandatory: true } });
        expect(wrapper.findAllComponents({ name: 'WtgExpansionPanel' }).at(0).vm.open).toBe(false);
        expect(wrapper.findAllComponents({ name: 'WtgExpansionPanel' }).at(1).vm.open).toBe(true);
    });

    test('it does not close currently open panel when a new panel is opened if multiple is true', async () => {
        const wrapper = mountComponent({ propsData: { multiple: true } });

        const expansionPanel1 = wrapper.findComponent({ name: 'WtgExpansionPanel' });
        expect(expansionPanel1.vm.open).toBe(false);
        const expansionPanel1ExpandButton = wrapper.findComponent({ name: 'WtgIconButton' });
        await expansionPanel1ExpandButton.trigger('click');
        expect(expansionPanel1.vm.open).toBe(true);

        const expansionPanel2ExpandButton = wrapper
            .findAllComponents({ name: 'WtgExpansionPanel' })
            .at(1)
            .findComponent({ name: 'WtgIconButton' });
        await expansionPanel2ExpandButton.trigger('click');
        expect(expansionPanel1.vm.open).toBe(true);
    });

    test('it opens the panel passed by the value prop when an index is provided', async () => {
        const wrapper = mountComponent({ propsData: { value: 0 } });

        const expansionPanel1 = wrapper.findComponent({ name: 'WtgExpansionPanel' });
        expect(expansionPanel1.vm.open).toBe(true);

        await wrapper.setProps({ value: 2 });
        expect(expansionPanel1.vm.open).toBe(false);
        expect(wrapper.findAllComponents({ name: 'WtgExpansionPanel' }).at(2).vm.open).toBe(true);
    });

    test('it opens the panels passed by the value prop when an array of indexes is provided', async () => {
        const wrapper = mountComponent({ propsData: { value: [0, 2] } });

        const expansionPanel1 = wrapper.findComponent(WtgExpansionPanel);
        expect(expansionPanel1.vm.open).toBe(true);
        expect(wrapper.findAllComponents({ name: 'WtgExpansionPanel' }).at(2).vm.open).toBe(true);

        await wrapper.setProps({ value: [1, 2] });
        expect(expansionPanel1.vm.open).toBe(false);
        expect(wrapper.findAllComponents({ name: 'WtgExpansionPanel' }).at(2).vm.open).toBe(true);
        expect(wrapper.findAllComponents({ name: 'WtgExpansionPanel' }).at(1).vm.open).toBe(true);
    });

    test('it emits a change event with the index of the open panel when the open panel is changed', async () => {
        const wrapper = mountComponent();

        const expansionPanel1ExpandButton = wrapper.findComponent({ name: 'WtgIconButton' });
        await expansionPanel1ExpandButton.trigger('click');
        expect(wrapper.emitted('change')[0][0]).toBe(0);

        const expansionPanel2ExpandButton = wrapper
            .findAllComponents({ name: 'WtgExpansionPanel' })
            .at(1)
            .findComponent({ name: 'WtgIconButton' });
        await expansionPanel2ExpandButton.trigger('click');
        expect(wrapper.emitted('change')[1][0]).toBe(1);
    });

    test('it emits a change event with undefined when the open panel is closed', async () => {
        const wrapper = mountComponent();

        const expansionPanel1ExpandButton = wrapper.findComponent({ name: 'WtgIconButton' });
        await expansionPanel1ExpandButton.trigger('click');
        expect(wrapper.emitted('change')[0][0]).toBe(0);

        await expansionPanel1ExpandButton.trigger('click');
        expect(wrapper.emitted('change')[1][0]).toBe(undefined);
    });

    test('it emits a change event with indexes of open panels when open panels are changed and multiple is true', async () => {
        const wrapper = mountComponent({ propsData: { multiple: true } });
        const expansionPanel1ExpandButton = wrapper.findComponent({ name: 'WtgIconButton' });
        await expansionPanel1ExpandButton.trigger('click');
        const expansionPanel2ExpandButton = wrapper
            .findAllComponents({ name: 'WtgExpansionPanel' })
            .at(1)
            .findComponent({ name: 'WtgIconButton' });
        await expansionPanel2ExpandButton.trigger('click');
        expect(wrapper.emitted('change')[1][0]).toEqual([0, 1]);
    });

    test('it does not emit a change event if open panels are changed via the value prop', async () => {
        const wrapper = mountComponent({ propsData: { value: [0, 2] } });
        await wrapper.setProps({ value: [1, 2] });
        expect(wrapper.emitted('change')).toBe(undefined);
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgExpander as any, {
            propsData,
            wtgUi,
            slots: {
                default: [
                    h(WtgExpansionPanel, [
                        h(WtgExpansionPanelHeader),
                        h(WtgExpansionPanelContent, h('div', 'content1')),
                    ]),
                    h(WtgExpansionPanel, [
                        h(WtgExpansionPanelHeader),
                        h(WtgExpansionPanelContent, h('div', 'content2')),
                    ]),
                    h(WtgExpansionPanel, [
                        h(WtgExpansionPanelHeader),
                        h(WtgExpansionPanelContent, h('div', 'content3')),
                    ]),
                ],
            },
        });
    }
});
