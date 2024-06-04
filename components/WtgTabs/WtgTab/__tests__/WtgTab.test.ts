import { WtgTab } from '..';
import WtgUi from '../../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';
import { registerTabFunctionKey } from '../../keys';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgTab', () => {
    const mockRegisterTabFunction = jest.fn(() => {});

    test('it renders a <div> component', () => {
        const wrapper = mountComponent();
        expect(wrapper.element.tagName).toBe('DIV');
    });

    test('it passes the default slot to the <div>', () => {
        const wrapper = mountComponent();
        expect(wrapper.text()).toBe('Tab Content');
    });

    test('it calls the provided tabRegister function', () => {
        const propsData = {
            disabled: false,
            hasNotification: true,
            label: 'Label 1',
            number: 100,
        };
        const wrapper = mountComponent({ propsData });
        const component = wrapper.getCurrentComponent();
        expect(mockRegisterTabFunction).toHaveBeenCalledWith({ content: component.slots.default, props: propsData });
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgTab as any, {
            wtgUi,
            propsData,
            slots: {
                default: () => 'Tab Content',
            },
            global: {
                provide: {
                    [registerTabFunctionKey]: mockRegisterTabFunction,
                },
            },
        });
    }
});
