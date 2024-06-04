import WtgBreadcrumbs from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgBreadcrumbs', () => {
    describe('with one item', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = mountComponent({
                propsData: {
                    items: [{ caption: 'Portal name' }],
                },
            });
        });
        test('the first item has the correct item name and classes applied', () => {
            const firstItem = wrapper.find('span');

            expect(firstItem.html()).toContain('Portal name');
            expect(firstItem.classes()).toStrictEqual([
                'wts-breadcrumbs-item',
                'wts-breadcrumbs-item-inactive',
                'wts-breadcrumbs-item-font-body-strong',
            ]);
        });

        test('there is no forward slash', () => {
            const forwardSlashIcon = wrapper.findComponent({ name: 'WtgIcon' });
            expect(forwardSlashIcon.exists()).toBe(false);
        });
    });

    describe('with two items', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mountComponent({
                propsData: {
                    items: [{ caption: 'Portal name' }, { caption: 'Page one' }],
                },
            });
        });

        test('the second item has the correct item name and classes applied', () => {
            const secondItem = wrapper.findAll('span').at(2);

            expect(secondItem.html()).toContain('Page one');
            expect(secondItem.classes()).toStrictEqual([
                'wts-breadcrumbs-item-active',
                'wts-breadcrumbs-item-font-body',
            ]);
        });

        test('there is exactly one forward slash', () => {
            const forwardSlashIcons = wrapper.findAllComponents({ name: 'WtgIcon' });
            expect(forwardSlashIcons.length).toBe(1);
        });
    });

    describe('with three items', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mountComponent({
                propsData: {
                    items: [{ caption: 'Portal name' }, { caption: 'Page one' }, { caption: 'Page two' }],
                },
            });
        });

        test('the second item has the correct item name and classes applied', () => {
            const secondItem = wrapper.findAll('span').at(2);

            expect(secondItem.html()).toContain('Page one');
            expect(secondItem.classes()).toStrictEqual([
                'wts-breadcrumbs-item',
                'wts-breadcrumbs-item-inactive',
                'wts-breadcrumbs-item-font-body',
            ]);
        });

        test('the third item has the correct item name and classes applied', () => {
            const secondItem = wrapper.findAll('span').at(4);

            expect(secondItem.html()).toContain('Page two');
            expect(secondItem.classes()).toStrictEqual([
                'wts-breadcrumbs-item-active',
                'wts-breadcrumbs-item-font-body',
            ]);
        });

        test('there are exactly two forward slashes', () => {
            const forwardSlashIcons = wrapper.findAllComponents({ name: 'WtgIcon' });
            expect(forwardSlashIcons.length).toBe(2);
        });
    });

    describe('with more than three items', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mountComponent({
                propsData: {
                    items: [
                        { caption: 'Portal name' },
                        { caption: 'Page one' },
                        { caption: 'Page two' },
                        { caption: 'Page three' },
                    ],
                },
            });
        });

        test('the second item has ... as its content', () => {
            const secondItem = wrapper.findAll('span').at(2);

            expect(secondItem.html()).toContain('...');
            expect(secondItem.classes()).toStrictEqual([
                'wts-breadcrumbs-item',
                'wts-breadcrumbs-item-inactive',
                'wts-breadcrumbs-item-font-body',
                'wts-breadcrumbs-item-overflow',
            ]);
        });

        test('the second item opens a dropdown when clicked', async () => {
            const secondItem = wrapper.findAll('span').at(2);
            await secondItem.trigger('click');

            expect(wrapper.vm.isOpen).toBe(true);

            const dropdownPanel = secondItem.find('div');
            expect(dropdownPanel.classes()).toStrictEqual(['wts-overflow-dropdown']);
        });

        test('the third item has the correct item name and classes applied', () => {
            const secondItem = wrapper.findAll('span').at(3);

            expect(secondItem.html()).toContain('Page three');
            expect(secondItem.classes()).toStrictEqual([
                'wts-breadcrumbs-item-active',
                'wts-breadcrumbs-item-font-body',
            ]);
        });

        test('there are exactly two forward slashes', () => {
            const forwardSlashIcons = wrapper.findAllComponents({ name: 'WtgIcon' });
            expect(forwardSlashIcons.length).toBe(2);
        });
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgBreadcrumbs as any, {
            wtgUi,
            propsData,
        });
    }
});
