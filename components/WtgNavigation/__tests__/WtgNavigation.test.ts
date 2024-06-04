import WtgNavigation from '../WtgNavigation.vue';
import WtgApp from '../../WtgApp';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { h } from 'vue';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();
const vuetify = createVuetify();
window.ResizeObserver = jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
}));

describe('WtgNavigation', () => {
    test('it renders a v-navigation-drawer', () => {
        const wrapper = mountComponent();
        expect(wrapper.findComponent({ name: 'VNavigationDrawer' }).exists()).toBe(true);
    });

    describe('when the navigation drawer is closed', () => {
        test('the navigation button is $drawer-open', () => {
            const wrapper = mountComponent();
            expect(wrapper.findComponent({ name: 'WtgIcon' }).props('icon')).toBe('$drawer-open');
        });

        test('it passes width of 84 to v-navigation-drawer component', () => {
            const wrapper = mountComponent();
            expect(wrapper.findComponent({ name: 'VNavigationDrawer' }).props('width')).toBe(84);
        });

        test('it sets the width style of wts-navigation to 84px', () => {
            const wrapper = mountComponent();
            expect(wrapper.find('.wts-navigation').element.style.width).toBe('84px');
        });

        test('it does not render the cargowise logo', () => {
            const wrapper = mountComponent();
            expect(wrapper.find('img').exists()).toBe(false);
        });
    });
    describe('when the navigation drawer is open', () => {
        let wrapper;
        beforeEach(async () => {
            wrapper = mountComponent();
            await wrapper.findComponent({ name: 'WtgIcon' }).trigger('click');
        });

        test('the navigation button is $drawer-close', () => {
            expect(wrapper.findComponent({ name: 'WtgIcon' }).props('icon')).toBe('$drawer-close');
        });

        test('it passes width of 248 to v-navigation-drawer component', () => {
            expect(wrapper.findComponent({ name: 'VNavigationDrawer' }).props('width')).toBe(248);
        });

        test('it does not set the width style of wts-navigation', () => {
            expect(wrapper.find('.wts-navigation').element.style.width).toBe('');
        });

        test('it does not render the cargowise logo', () => {
            expect(wrapper.find('img').exists()).toBe(true);
        });
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgApp as any, {
            wtgUi,
            propsData,
            global: {
                plugins: [vuetify],
            },
            slots: {
                default: h(WtgNavigation),
            },
        }).findComponent({ name: 'WtgNavigation' });
    }
});
