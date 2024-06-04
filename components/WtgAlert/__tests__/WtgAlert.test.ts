import { WtgAlert } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgAlert', () => {
    test('it sets alert title text to the titleText property passes in', () => {
        const wrapper = mountComponent({
            propsData: {
                title: true,
                state: 'info',
                titleText: 'My Alert Title',
            },
        });
        const wtgAlert = wrapper.find('.wts-alert');
        expect(wtgAlert.html()).toContain('My Alert Title');
    });

    test('it sets alert title description to the description property passes in', () => {
        const wrapper = mountComponent({
            propsData: {
                title: true,
                color: 'info',
                description: 'My Alert Description',
            },
        });
        const wtgAlert = wrapper.find('.wts-alert');
        expect(wtgAlert.html()).toContain('My Alert Description');
    });

    test('it applies correct styles and classes when the Alert is of type title and state info ', () => {
        const wrapper = mountComponent({
            propsData: {
                title: true,
                color: 'info',
            },
        });
        const wtgAlert = wrapper.find('.wts-alert');
        expect(wtgAlert.html()).toContain('wts-alert-title');
        expect(wtgAlert.classes()).toContain('wts-alert-info');
    });

    test('it applies correct styles and classes when the Alert is of type title and state success ', () => {
        const wrapper = mountComponent({
            propsData: {
                title: true,
                color: 'success',
            },
        });
        const wtgAlert = wrapper.find('.wts-alert');
        expect(wtgAlert.html()).toContain('wts-alert-title');
        expect(wtgAlert.classes()).toContain('wts-alert-success');
    });

    test('it applies correct styles and classes when the Alert is of type title and state warning ', () => {
        const wrapper = mountComponent({
            propsData: {
                title: true,
                color: 'warning',
            },
        });
        const wtgAlert = wrapper.find('.wts-alert');
        expect(wtgAlert.html()).toContain('wts-alert-title');
        expect(wtgAlert.classes()).toContain('wts-alert-warning');
    });

    test('it applies correct styles and classes when the Alert is of type title and state error ', () => {
        const wrapper = mountComponent({
            propsData: {
                title: true,
                color: 'error',
            },
        });
        const wtgAlert = wrapper.find('.wts-alert');
        expect(wtgAlert.html()).toContain('wts-alert-title');
        expect(wtgAlert.classes()).toContain('wts-alert-error');
    });
    //
    test('it applies correct styles and classes when the Alert is of variant inline and color info ', () => {
        const wrapper = mountComponent({
            propsData: {
                title: false,
                color: 'info',
                variant: 'inline',
            },
        });
        const wtgAlert = wrapper.find('.wts-alert');
        expect(wtgAlert.html()).not.toContain('wts-alert-title');
        expect(wtgAlert.html()).not.toContain('style="width: 365px;"');
        expect(wtgAlert.classes()).toContain('wts-alert-info');
    });

    test('it applies correct styles and classes when the Alert is of variant inline and color success ', () => {
        const wrapper = mountComponent({
            propsData: {
                title: false,
                color: 'success',
                variant: 'inline',
            },
        });
        const wtgAlert = wrapper.find('.wts-alert');
        expect(wtgAlert.html()).not.toContain('wts-alert-title');
        expect(wtgAlert.html()).not.toContain('style="width: 365px;"');
        expect(wtgAlert.classes()).toContain('wts-alert-success');
    });

    test('it applies correct styles and classes when the Alert is of variant inline and color warning ', () => {
        const wrapper = mountComponent({
            propsData: {
                title: false,
                color: 'warning',
                variant: 'inline',
            },
        });
        const wtgAlert = wrapper.find('.wts-alert');
        expect(wtgAlert.html()).not.toContain('wts-alert-title');
        expect(wtgAlert.html()).not.toContain('style="width: 365px;"');
        expect(wtgAlert.classes()).toContain('wts-alert-warning');
    });

    test('it applies correct styles and classes when the Alert is of variant inline and color error ', () => {
        const wrapper = mountComponent({
            propsData: {
                title: false,
                color: 'error',
                variant: 'inline',
            },
        });
        const wtgAlert = wrapper.find('.wts-alert');
        expect(wtgAlert.html()).not.toContain('wts-alert-title');
        expect(wtgAlert.html()).not.toContain('style="width: 365px;"');
        expect(wtgAlert.classes()).toContain('wts-alert-error');
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgAlert as any, {
            wtgUi,
            propsData,
        });
    }
});
