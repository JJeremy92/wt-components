import { defineComponent } from 'vue';
import { useWtgUi } from '../global';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('global', () => {
    it('returns access to $wtgUi', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.$wtgUi).toBe(wtgUi);
    });

    function mountComponent() {
        const component = defineComponent({
            name: 'GlobalComponent',
            setup() {
                const $wtgUi = useWtgUi();
                return { $wtgUi };
            },
            template: '<div>Global Component</div>',
        });

        return mount<any>(component, {
            wtgUi,
        });
    }
});
