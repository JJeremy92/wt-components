import WtgMasthead from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';

enableAutoUnmount(afterEach);
const wtgUi = new WtgUi();
const vuetify = createVuetify();
class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
}
window.ResizeObserver ??= ResizeObserverStub;

describe('WtgMasthead', () => {
    test('it renders a breadcrumb and pass breadcrumb items to wtgbreadcrumbs', () => {
        const breadcrumbsItems = [{ caption: 'Portal name', link: '/?path=/docs/intro--overview' }];
        const wrapper = mountComponent({
            propsData: {
                breadcrumbsItems,
            },
        });

        const breadcrumb = wrapper.findComponent({ name: 'WtgBreadcrumbs' });
        expect(breadcrumb.props('items')).toStrictEqual(breadcrumbsItems);
    });

    test('it renders a split button with correct leading icon, variant, title and items', () => {
        const splitButtonItems = [{ caption: 'Item 1' }, { caption: 'Item 2' }, { caption: 'Item 3' }];
        const splitButtonTitle = 'title';
        const wrapper = mountComponent({
            propsData: {
                splitButtonItems,
                splitButtonTitle,
            },
        });

        const splitButton = wrapper.findComponent({ name: 'WtgSplitButton' });
        expect(splitButton.props('items')).toStrictEqual(splitButtonItems);
        expect(splitButton.props('leadingIcon')).toStrictEqual('$add');
        expect(splitButton.props('title')).toStrictEqual(splitButtonTitle);
        expect(splitButton.props('variant')).toStrictEqual('primary');
    });

    test('it renders two icon buttons on the masthead header for search and notification', () => {
        const wrapper = mountComponent();

        const searchIconButton = wrapper.findAllComponents({ name: 'WtgIconButton' }).at(0);
        const notificationIconButton = wrapper.findAllComponents({ name: 'WtgIconButton' }).at(1);

        expect(searchIconButton!.props('icon')).toBe('$search');
        expect(notificationIconButton!.props('icon')).toBe('$bell');
    });

    test('it renders two icon buttons on the masthead header for search and notification', () => {
        const wrapper = mountComponent();

        const searchIconButton = wrapper.findAllComponents({ name: 'WtgIconButton' }).at(0);
        const notificationIconButton = wrapper.findAllComponents({ name: 'WtgIconButton' }).at(1);

        expect(searchIconButton!.props('icon')).toBe('$search');
        expect(notificationIconButton!.props('icon')).toBe('$bell');
    });

    test('it renders entity actions with correct entityItems and isMobile mode', () => {
        const entityItems = [
            {
                label: 'Workflow',
                icon: '$workflow',
            },
            {
                label: 'eDocs',
                icon: '$eDocs',
            },
        ];
        const wrapper = mountComponent({
            propsData: {
                entityItems,
                entityName: 'entity name',
                isMobile: true,
            },
        });

        const entityActions = wrapper.findComponent({ name: 'WtgEntityActions' });
        expect(entityActions.props('items')).toStrictEqual(entityItems);
        expect(entityActions.props('isMobile')).toEqual(true);
    });

    test('it emit events when entity-actions buttons are clicked', async () => {
        const entityItems = [
            {
                label: 'Workflow',
                icon: '$workflow',
                id: 'workflow',
            },
            {
                label: 'eDocs',
                icon: '$eDocs',
                id: 'eDoc',
            },
        ];
        const wrapper = mountComponent({
            propsData: {
                entityItems,
                entityName: 'entity name',
            },
        });
        const entityActionsButtons = wrapper.findAll('.wtg-entity-actions button');
        await entityActionsButtons?.at(0)?.trigger('click');

        let eventData: any = wrapper.emitted()['toolbar-button-click'];
        expect(eventData.length).toEqual(1);
        expect(eventData[0][1]).toEqual('workflow');

        await entityActionsButtons?.at(1)?.trigger('click');
        eventData = wrapper.emitted()['toolbar-button-click'];
        expect(eventData.length).toEqual(2);
        expect(eventData[1][1]).toEqual('eDoc');
    });

    test('it renders the back arrow icon button in the masthead entity content', () => {
        const wrapper = mountComponent({ propsData: { entityName: 'entity name' } });
        const backIconButton = wrapper.findAllComponents({ name: 'WtgIconButton' }).at(2);
        expect(backIconButton?.props('icon')).toBe('$arrow-left');
    });

    test('it renders the entity name in masthead entity content', () => {
        const entityName = 'entityName';
        const wrapper = mountComponent({ propsData: { entityName } });
        const entityNameDiv = wrapper.findAll('.wts-masthead-entity-name-title').at(0);
        expect(entityNameDiv?.html()).toContain(entityName);
    });

    test('it does not render the entity section if entity name is undefined', async () => {
        const wrapper = mountComponent({ propsData: { entityName: 'entityName' } });
        expect(wrapper.find('.wts-masthead-entity').exists()).toBe(true);
        await wrapper.setProps({ entityName: undefined });
        expect(wrapper.find('.wts-masthead-entity').exists()).toBe(false);
    });

    test('it does not render the split button if split button title is undefined', async () => {
        const wrapper = mountComponent({ propsData: { splitButtonTitle: 'title' } });
        expect(wrapper.findComponent({ name: 'WtgSplitButton' }).exists()).toBe(true);
        await wrapper.setProps({ splitButtonTitle: undefined });
        expect(wrapper.findComponent({ name: 'WtgSplitButton' }).exists()).toBe(false);
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgMasthead as any, {
            global: {
                provide: {
                    darkMode: false,
                },
                plugins: [vuetify],
            },
            propsData,
            wtgUi,
            slots: {
                default: 'My Button',
            },
        });
    }
});
