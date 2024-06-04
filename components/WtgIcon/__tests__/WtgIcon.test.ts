import { WtgIcon } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgIcon', () => {
    test('it renders a <i> component', () => {
        const wrapper = mountComponent();
        expect(wrapper.element.tagName).toBe('I');
    });

    test('it parses the default slot to apply the supply icon class', () => {
        const wrapper = mountComponent();
        expect(wrapper.classes()).toContain('s-icon-home');
    });

    describe('when color is set', () => {
        test('it sets the element style', () => {
            const wrapper = mountComponent({
                propsData: {
                    color: 'red',
                },
            });
            expect(wrapper.element.style.color).toBe('red');
        });
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgIcon as any, {
            wtgUi,
            propsData,
            slots: {
                default: '$home',
            },
        });
    }
});
