import { WtgBadge } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgBadge', () => {
    test('it applies the wtg-badge-notification class when the type attribute is set to notification', async () => {
        const wrapper = mountComponent({
            propsData: {
                type: 'notification',
            },
        });

        const wtgBadge = wrapper.find('.wtg-badge');
        expect(wtgBadge.classes()).toContain('wtg-badge-notification');
    });

    test('it applies the wtg-badge-error class and icon when the type attribute is set to error', async () => {
        const wrapper = mountComponent({
            propsData: {
                type: 'error',
            },
        });

        const wtgBadge = wrapper.find('.wtg-badge');
        const wtgBadgeIcon = wtgBadge.find('i');
        expect(wtgBadgeIcon.classes()).toContain('s-icon-status-critical');
        expect(wtgBadge.classes()).toContain('wtg-badge-error');
    });

    test('it applies the wtg-badge-warning class and icon when the type attribute is set to warning', async () => {
        const wrapper = mountComponent({
            propsData: {
                type: 'warning',
            },
        });

        const wtgBadge = wrapper.find('.wtg-badge');
        const wtgBadgeIcon = wtgBadge.find('i');
        expect(wtgBadgeIcon.classes()).toContain('s-icon-status-warning');
        expect(wtgBadge.classes()).toContain('wtg-badge-warning');
    });

    test('it applies the wtg-badge-success class and icon when the type attribute is set to success', async () => {
        const wrapper = mountComponent({
            propsData: {
                type: 'success',
            },
        });

        const wtgBadge = wrapper.find('.wtg-badge');
        const wtgBadgeIcon = wtgBadge.find('i');
        expect(wtgBadgeIcon.classes()).toContain('s-icon-status-success');
        expect(wtgBadge.classes()).toContain('wtg-badge-success');
    });

    test('it applies the wtg-badge-info class and icon when the type attribute is set to info', async () => {
        const wrapper = mountComponent({
            propsData: {
                type: 'info',
            },
        });

        const wtgBadge = wrapper.find('.wtg-badge');
        const wtgBadgeIcon = wtgBadge.find('i');
        expect(wtgBadgeIcon.classes()).toContain('s-icon-info-circle');
        expect(wtgBadge.classes()).toContain('wtg-badge-info');
    });

    test('it applies the wtg-badge-custom class and shows ustom icon provided when the type attribute is set to custom', async () => {
        const wrapper = mountComponent({
            propsData: {
                type: 'custom',
                customIcon: '$placeholder',
            },
        });

        const wtgBadge = wrapper.find('.wtg-badge');
        const wtgBadgeIcon = wtgBadge.find('i');
        expect(wtgBadgeIcon.classes()).toContain('s-icon-placeholder');
        expect(wtgBadge.classes()).toContain('wtg-badge-custom');
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgBadge as any, {
            wtgUi,
            propsData,
        });
    }
});
