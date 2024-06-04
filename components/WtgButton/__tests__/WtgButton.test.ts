import { WtgButton } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgButton', () => {
    test('it renders a <button> tag', () => {
        const wrapper = mountComponent();
        expect(wrapper.element.tagName).toBe('BUTTON');
    });

    test('it renders an <a> tag when the href property is set', () => {
        const wrapper = mountComponent({
            propsData: {
                href: 'some href',
            },
        });
        expect(wrapper.element.tagName).toBe('A');
    });

    test('it emits a click event when the <button> is clicked', async () => {
        const wrapper = mountComponent();
        const button = wrapper.find('button');
        expect(wrapper.emitted('click')).toBeUndefined();
        await button.trigger('click');
        expect(wrapper.emitted('click')!.length).toBe(1);
        expect(wrapper.emitted('click')![0][0]).toBeInstanceOf(MouseEvent);
    });

    test('it passes the default slot to the <button>', () => {
        const wrapper = mountComponent();
        expect(wrapper.text()).toBe('My Button');
    });

    test('it applies the wts-button-primary class when variant is primary', () => {
        const wrapper = mountComponent({
            propsData: {
                variant: 'primary',
            },
        });
        expect(wrapper.classes()).toEqual(['wts-button-primary', 'wts-button']);
    });

    test('it applies the wts-button-fill class when fill is undefined', () => {
        const wrapper = mountComponent({
            propsData: {
                fill: true,
            },
        });
        expect(wrapper.classes()).toContain('wts-button-fill');
    });

    test('it applies the wts-button-default class when variant is undefined', () => {
        const wrapper = mountComponent();
        expect(wrapper.classes()).toEqual(['wts-button-default', 'wts-button']);
    });

    test('it applies the wts-button-ghost class when variant is ghost', () => {
        const wrapper = mountComponent({
            propsData: {
                variant: 'ghost',
            },
        });
        expect(wrapper.classes()).toContain('wts-button-ghost');
    });

    test('it passes type to the button element', () => {
        const wrapper = mountComponent({
            propsData: {
                type: 'submit',
            },
        });
        expect((wrapper.element as any).type).toBe('submit');
    });

    test('it does not pass the type to the a element', () => {
        const wrapper = mountComponent({
            propsData: {
                href: 'some href',
                type: 'submit',
            },
        });
        expect((wrapper.element as any).type).toBe('');
    });

    test('it passes disabled to the button element', () => {
        const wrapper = mountComponent({
            propsData: {
                disabled: true,
            },
        });
        expect((wrapper.element as any).disabled).toBe(true);
    });

    test('it renders the box shadow', () => {
        const wrapper = mountComponent();
        expect(wrapper.findAll('div').at(1)!.classes()).toContain('wts-button-shadow');
    });

    describe('when loading is set to true', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mountComponent({
                propsData: {
                    loading: true,
                },
            });
        });

        test('it applies the wts-button-loading class to the button element', () => {
            expect(wrapper.classes()).toContain('wts-button-loading');
        });

        test('it renders a WtgLoader', () => {
            expect(wrapper.findComponent({ name: 'WtgLoader' }).exists()).toBe(true);
        });
    });

    describe('when sentiment is set', () => {
        test('it applies the wts-button-success class if sentiment is success', () => {
            const wrapper = mountComponent({
                propsData: {
                    sentiment: 'success',
                },
            });
            expect(wrapper.classes()).toContain('wts-button-success');
        });

        test('it applies the wts-button-error class if sentiment is error', () => {
            const wrapper = mountComponent({
                propsData: {
                    sentiment: 'error',
                },
            });
            expect(wrapper.classes()).toContain('wts-button-error');
        });
    });

    describe('when color is set', () => {
        test('it applies the wts-button-color class', () => {
            const wrapper = mountComponent({
                propsData: {
                    color: 'red',
                },
            });
            expect(wrapper.classes()).toContain('wts-button-color');
        });

        test('it applies the wts-button-success class if color is success', () => {
            const wrapper = mountComponent({
                propsData: {
                    color: 'success',
                },
            });
            expect(wrapper.classes()).toContain('wts-button-success');
        });

        test('it applies the wts-button-error class if color is error', () => {
            const wrapper = mountComponent({
                propsData: {
                    color: 'error',
                },
            });
            expect(wrapper.classes()).toContain('wts-button-error');
        });

        test('it sets background color and border color to color prop when variant is primary', () => {
            const wrapper = mountComponent({
                propsData: {
                    variant: 'primary',
                    color: 'red',
                },
            });
            expect(wrapper.element.style.backgroundColor).toBe('red');
            expect(wrapper.element.style.borderColor).toBe('red');
        });

        test('it sets text color to color prop when variant is ghost', () => {
            const wrapper = mountComponent({
                propsData: {
                    variant: 'ghost',
                    color: 'red',
                },
            });
            expect(wrapper.element.style.color).toBe('red');
        });

        test('it sets text color and border color to color prop when variant is undefined', () => {
            const wrapper = mountComponent({
                propsData: {
                    color: 'red',
                },
            });
            expect(wrapper.element.style.color).toBe('red');
            expect(wrapper.element.style.borderColor).toBe('red');
        });

        test('it resolves color correctly when color is set to primary', () => {
            const wrapper = mountComponent({
                propsData: {
                    color: 'primary',
                },
            });
            expect(wrapper.vm.computedStyle.color).toBe('var(--s-primary-700)');
            expect(wrapper.vm.computedStyle.borderColor).toBe('var(--s-primary-700)');
        });
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgButton as any, {
            wtgUi,
            propsData,
            slots: {
                default: 'My Button',
            },
        });
    }
});
