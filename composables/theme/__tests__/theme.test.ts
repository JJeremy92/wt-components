import { defineComponent } from 'vue';
import { useTheme } from '../theme';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi({
    theme: {
        controls: {
            button: {
                contained: {
                    color: 'primary',
                },
            },
        },
        colors: {
            light: {
                controls: {
                    panel: {
                        caption: 'blue',
                    },
                },
            },
            dark: {
                controls: {
                    panel: {
                        caption: 'red',
                    },
                },
            },
        },
    },
});

describe('useTheme', () => {
    beforeEach(() => {
        wtgUi.dark = false;
    });

    test('it creates a computed property that provides access to the theme', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.theme.controls.button.contained.color).toBe('primary');
    });

    test('it should set darkMode as false when dark is undefined', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.darkMode).toBe(false);
    });

    test('it should set darkMode as false when dark is false', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.darkMode).toBe(false);
    });

    test('it should set darkMode as true when dark is true', () => {
        wtgUi.dark = true;
        const wrapper = mountComponent();
        expect(wrapper.vm.darkMode).toBe(true);
    });

    describe('resolveColor', () => {
        test.each([
            ['primary', 'var(--s-primary-700)'],
            ['red', 'red'],
            ['#0000FF', '#0000FF'],
        ])('resolves %p to %p', (color: string, themeColor: string) => {
            const wrapper = mountComponent();
            expect(wrapper.vm.resolveColor(color)).toBe(themeColor);
        });
    });

    function mountComponent() {
        const component = defineComponent({
            name: 'ThemableComponent',
            setup() {
                const { darkMode, theme, resolveColor } = useTheme();
                return { darkMode, theme, resolveColor };
            },
            template: `<div>Themable Component</div>`,
        });

        return mount<any>(component, {
            wtgUi,
        });
    }
});
