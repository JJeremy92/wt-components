import WtgExpansionPanelContent from '../WtgExpansionPanelContent.vue';
import { h, ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { openKey } from '../keys';

describe('WtgExpansionPanelContent', () => {
    test('it sets the content height to 0 when not open', async () => {
        const wrapper = mountComponent();
        await nextTick();
        expect(wrapper.find('.content').element.style.height).toBe('0px');
    });

    test('it computes the content height when open', async () => {
        const wrapper = mountComponent({ provide: { [openKey]: ref(true) } });
        await nextTick();
        expect(wrapper.find('.content').element.style.height).toBe('8px');
    });

    function mountComponent({ propsData = {}, provide = {} } = {}) {
        return mount(WtgExpansionPanelContent as any, {
            global: {
                provide,
            },
            propsData,
            slots: {
                default: h('div', 'expansion panel content'),
            },
        });
    }
});
