import { mount, enableAutoUnmount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import WtgThemeProvider from '..';
import WtgUi from '../../../WtgUi';
import { useTheme } from '../../../composables/theme';

enableAutoUnmount(afterEach);
const wtgUi = new WtgUi();

describe('WtgThemeProvider', () => {
    test('it applies the wts-theme-provider-light/dark class to the component based on the light/dark props', async () => {
        const wrapper = mountComponent();
        expect(wrapper.classes('wts-theme-provider-light')).toBe(true);
        await wrapper.setProps({ dark: true });
        expect(wrapper.classes('wts-theme-provider-dark')).toBe(true);
        await wrapper.setProps({ dark: false, light: true });
        expect(wrapper.classes('wts-theme-provider-light')).toBe(true);
    });

    test('it provides the appropriate darkMode value based on the light/dark props', async () => {
        const wrapper = mountComponent();
        const childComponent = wrapper.findComponent({ name: 'ChildComponent' });
        expect(childComponent.vm.darkMode).toBe(false);
        await wrapper.setProps({ dark: true });
        expect(childComponent.vm.darkMode).toBe(true);
        await wrapper.setProps({ dark: false, light: true });
        expect(childComponent.vm.darkMode).toBe(false);
    });

    function mountComponent({ propsData = {} } = {}) {
        const ChildComponent = defineComponent({
            name: 'ChildComponent',
            setup: () => {
                const { darkMode } = useTheme();
                return { darkMode };
            },
        });
        return mount(WtgThemeProvider, { propsData, wtgUi, slots: { default: ChildComponent } });
    }
});
