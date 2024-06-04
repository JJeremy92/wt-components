import { WtgTooltip } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgTooltip', () => {
    test('it sets the Tooltip text value to the value attribute passed in ', () => {
        const wrapper = mountComponent({
            propsData: {
                value: 'My Tooltip',
            },
        });
        const wtgTooltip = wrapper.find('.wtg-tooltip');
        expect(wtgTooltip.html()).toContain('My Tooltip');
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgTooltip as any, {
            wtgUi,
            propsData,
        });
    }
});
