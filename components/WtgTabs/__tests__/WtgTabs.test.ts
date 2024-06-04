import { WtgTabs, WtgTab } from '..';
import { h } from 'vue';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount, flushPromises } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgTabs', () => {
    test('it only shows the active tab content', async () => {
        const wrapper = mountComponent({
            propsData: {
                activeTab: 1,
            },
        });
        await flushPromises();
        const tabContents = wrapper.find('.wts-tabs');
        expect(tabContents.html()).toContain('Tab 2');
    });

    test('it emits the tab-change event when switch to a new tab', async () => {
        const wrapper = mountComponent({
            propsData: {
                activeTab: 0,
            },
        });
        await flushPromises();
        const middleTabLabel = wrapper.findAll('.wts-tab-label')[1];
        middleTabLabel.trigger('click');
        expect(wrapper.emitted('tab-change')?.length).toEqual(1);
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgTabs as any, {
            wtgUi,
            propsData,
            slots: {
                default: [h(WtgTab, 'Tab 1'), h(WtgTab, 'Tab 2'), h(WtgTab, 'Tab 3')],
            },
        });
    }
});
