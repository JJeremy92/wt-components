import WtgNavigationPortalswitch from '../WtgNavigationPortalswitch.vue';
import WtgUi from '../../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { computed } from 'vue';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();
const vuetify = createVuetify();

describe('WtgNavigationPortalSwitch', () => {
    test('it renders a WtgPopover component', () => {
        const wrapper = mountComponent();
        expect(wrapper.findComponent({ name: 'WtgPopover' }).exists()).toBe(true);
    });

    test('it applies the wts-portalswitch__collapsed class when isCollapsed is true', () => {
        const wrapper = mountComponent({ propsData: { isCollapsed: true } });
        expect(wrapper.find('.wts-portalswitch__collapsed').exists()).toBe(true);
    });

    test('it applies the wts-portalswitch class when isCollapsed is false', () => {
        const wrapper = mountComponent({ propsData: { isCollapsed: false } });
        expect(wrapper.find('.wts-portalswitch').exists()).toBe(true);
    });

    describe('when application is provided', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mountComponent({
                provide: {
                    framework: {
                        title: computed(() => 'title'),
                        portalCode: computed(() => 'TS'),
                    },
                },
            });
        });
        test('it displays the provided portalCode when isCollapsed is true', async () => {
            await wrapper.setProps({ isCollapsed: true });
            expect(wrapper.find('.portal-name').text()).toBe('TS');
        });

        test('it displays the provided title when isCollapsed is false', async () => {
            await wrapper.setProps({ isCollapsed: false });
            expect(wrapper.find('.portal-name').text()).toBe('title');
        });
    });

    test('it displays the title property when isCollapsed is false', () => {
        const wrapper = mountComponent({ propsData: { isCollapsed: false, title: 'title' } });
        expect(wrapper.find('.portal-name').text()).toBe('title');
    });

    test('it displays the portalCode property when isCollapsed is true', () => {
        const wrapper = mountComponent({ propsData: { isCollapsed: true, portalCode: 'TS' } });
        expect(wrapper.find('.portal-name').text()).toBe('TS');
    });

    function mountComponent({ propsData = {}, provide = {} } = {}) {
        return mount(WtgNavigationPortalswitch as any, {
            wtgUi,
            propsData,
            global: {
                plugins: [vuetify],
                provide,
            },
        });
    }
});
