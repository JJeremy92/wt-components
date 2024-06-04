import { WtgChip } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgChip', () => {
    test('it sets the chip label to the label attribute passed in ', () => {
        const wrapper = mountComponent({
            propsData: {
                label: 'My Chip',
            },
        });
        const chiplabel = wrapper.find('span');
        expect(chiplabel.html()).toContain('My Chip');
    });

    test('it shows the close icon to dismiss the chip when isDismissable is set to true', async () => {
        const wrapper = mountComponent({
            propsData: {
                isDismissable: true,
            },
        });
        const closeIcon = wrapper.find('i');
        expect(closeIcon.classes()).toContain('s-icon-close');
    });

    test('it applies the wtg-chip-condensed class when the condensed attribute is set to true', async () => {
        const wrapper = mountComponent({
            propsData: {
                condensed: true,
            },
        });

        const wtgChip = wrapper.find('.wtg-chip');
        expect(wtgChip.classes()).toContain('wtg-chip-condensed');
    });

    test('it applies a prepend icon is the prepent icon is supplied', async () => {
        const wrapper = mountComponent({
            propsData: {
                prependIcon: '$placeholder',
            },
        });

        const wtgChip = wrapper.find('i');
        expect(wtgChip.classes()).toContain('s-icon-placeholder');
    });

    test('it applies the wtg-chip-primary class when the color attribute is set to primary', async () => {
        const wrapper = mountComponent({
            propsData: {
                color: 'primary',
            },
        });

        const wtgChip = wrapper.find('.wtg-chip');
        expect(wtgChip.classes()).toContain('wtg-chip-primary');
    });

    test('it applies the wtg-chip-info class when the color attribute is set to info', async () => {
        const wrapper = mountComponent({
            propsData: {
                color: 'info',
            },
        });

        const wtgChip = wrapper.find('.wtg-chip');
        expect(wtgChip.classes()).toContain('wtg-chip-info');
    });

    test('it applies the wtg-chip-success class when the color attribute is set to success', async () => {
        const wrapper = mountComponent({
            propsData: {
                color: 'success',
            },
        });

        const wtgChip = wrapper.find('.wtg-chip');
        expect(wtgChip.classes()).toContain('wtg-chip-success');
    });

    test('it applies the wtg-chip-warning class when the color attribute is set to warning', async () => {
        const wrapper = mountComponent({
            propsData: {
                color: 'warning',
            },
        });

        const wtgChip = wrapper.find('.wtg-chip');
        expect(wtgChip.classes()).toContain('wtg-chip-warning');
    });

    test('it applies the wtg-chip-error class when the color attribute is set to error', async () => {
        const wrapper = mountComponent({
            propsData: {
                color: 'error',
            },
        });

        const wtgChip = wrapper.find('.wtg-chip');
        expect(wtgChip.classes()).toContain('wtg-chip-error');
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgChip as any, {
            wtgUi,
            propsData,
        });
    }
});
