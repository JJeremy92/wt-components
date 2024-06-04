import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils';
import { WtgEntityActions } from '..';
import WtgUi from '../../../WtgUi';
import WtgButton from '../../WtgButton';
import WtgIconButton from '../../WtgIconButton';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgEntityActions', () => {
    const items = [
        {
            disabled: false,
            icon: '$home',
            label: 'button 1',
            id: '1',
        },
        {
            disabled: false,
            icon: '$link',
            label: 'button 2',
            id: '2',
        },
    ];
    let wrapper;
    beforeEach(() => {
        wrapper = mountComponent({
            propsData: {
                items,
            },
        });
    });

    test('should renders buttons and pass props to each button from the component props', async () => {
        await flushPromises();
        expect(wrapper.findAllComponents(WtgButton).length).toEqual(2);
        const firstButton = wrapper.findAllComponents(WtgButton)[0];
        expect(firstButton.props().disabled).toEqual(false);
        expect(firstButton.props().leadingIcon).toEqual('$home');
        expect(firstButton.text()).toEqual('button 1');
    });

    test('should renders icon buttons if isMobile is true', async () => {
        wrapper = mountComponent({
            propsData: {
                items,
                isMobile: true,
            },
        });
        await flushPromises();
        const compactButton = wrapper.findAllComponents(WtgIconButton)[1];
        expect(compactButton.props().disabled).toEqual(false);
        expect(compactButton.props().icon).toEqual('$link');
    });

    test('should emit click event from each button', async () => {
        const firstButton = wrapper.findAllComponents(WtgButton)[0];
        await firstButton.trigger('click');
        expect(wrapper.emitted()?.click?.length).toEqual(1);
        const secondButton = wrapper.findAllComponents(WtgButton)[1];
        await secondButton.trigger('click');
        expect(wrapper.emitted()?.click?.length).toEqual(2);
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgEntityActions as any, {
            wtgUi,
            propsData,
        });
    }
});
