import WtgUi from '../../../WtgUi';
import WtgExpansionPanelHeader from '../WtgExpansionPanelHeader.vue';
import { mount, enableAutoUnmount } from '@vue/test-utils';
import { toggleOpenFunctionKey } from '../keys';
const wtgUi = new WtgUi();
enableAutoUnmount(afterEach);

describe('WtgExpansionPanelHeader', () => {
    test('it renders the title', () => {
        const wrapper = mountComponent({ propsData: { title: 'Title' } });
        expect(wrapper.find('.title-text').text()).toBe('Title');
    });

    test('it renders the description', () => {
        const wrapper = mountComponent({ propsData: { description: 'Description' } });
        expect(wrapper.find('.description').text()).toBe('Description');
    });

    test('it renders leadingIcon', () => {
        const wrapper = mountComponent({ propsData: { leadingIcon: '$truck' } });
        expect(wrapper.find('.leading-icon').html()).toContain('s-icon-truck');
    });

    test('it renders action buttons', async () => {
        const mock = jest.fn();
        const wrapper = mountComponent({
            propsData: {
                actions: [
                    {
                        icon: '$help',
                        action: mock,
                        key: 'help',
                    },
                ],
            },
        });
        const actionButton = wrapper.findComponent({ name: 'WtgIconButton' });
        expect(actionButton.html()).toContain('s-icon-help');
        await actionButton.trigger('click');
        expect(mock.mock.calls).toHaveLength(1);
    });

    test('it calls the provided toggleOpen method when the dropdown icon is clicked', async () => {
        const toggleOpen = jest.fn();
        const wrapper = mountComponent({ provide: { [toggleOpenFunctionKey]: toggleOpen } });
        const dropdownButton = wrapper.findComponent({ name: 'WtgIconButton' });
        await dropdownButton.trigger('click');
        expect(toggleOpen.mock.calls).toHaveLength(1);
    });

    function mountComponent({ propsData = {}, provide = {} } = {}) {
        return mount(WtgExpansionPanelHeader as any, {
            propsData,
            wtgUi,
            global: {
                provide,
            },
        });
    }
});
