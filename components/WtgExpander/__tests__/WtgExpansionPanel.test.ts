import WtgExpansionPanel from '../WtgExpansionPanel.vue';
import WtgExpansionPanelHeader from '../WtgExpansionPanelHeader.vue';
import WtgExpansionPanelContent from '../WtgExpansionPanelContent.vue';
import WtgUi from '../../../WtgUi';
import { h } from 'vue';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);
const wtgUi = new WtgUi();

describe('WtgExpansionPanel', () => {
    test('it passes the wts-expansion-panel class to the component', () => {
        const wrapper = mountComponent();
        expect(wrapper.classes('wts-expansion-panel')).toBe(true);
    });

    test('it passes the wts-expansion-disabled class to the component when disabled is true', () => {
        const wrapper = mountComponent({ propsData: { disabled: true } });
        expect(wrapper.classes('wts-expansion-panel-disabled')).toBe(true);
    });

    describe('when the panel is closed', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = mountComponent();
        });

        test('it passes the wts-expansion-panel-closed class to the component', () => {
            expect(wrapper.classes('wts-expansion-panel-closed')).toBe(true);
        });

        test('it provides the open state', () => {
            expect(wrapper.findComponent({ name: 'WtgExpansionPanelContent' }).vm.open).toBe(false);
        });
    });

    describe('when panel is open', () => {
        let wrapper;

        beforeEach(async () => {
            wrapper = mountComponent();
            const expandButton = wrapper.findComponent({ name: 'WtgIconButton' });
            await expandButton.trigger('click');
        });

        test('it passes the wts-expansion-panel-open class to the component', () => {
            expect(wrapper.classes('wts-expansion-panel-open')).toBe(true);
        });

        test('it provides the open state', () => {
            expect(wrapper.findComponent({ name: 'WtgExpansionPanelContent' }).vm.open).toBe(true);
        });
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgExpansionPanel as any, {
            propsData,
            slots: {
                default: [h(WtgExpansionPanelHeader), h(WtgExpansionPanelContent, h('div', 'expansion panel content'))],
                wtgUi,
            },
        });
    }
});
