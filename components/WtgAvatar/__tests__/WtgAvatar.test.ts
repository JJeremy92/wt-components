import { WtgAvatar } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgAvatar', () => {
    test('it sets the image to the avatar when image property is set ', () => {
        const wrapper = mountComponent({
            propsData: {
                image: 'ImagePath',
            },
        });
        const image = wrapper.find('img');
        expect(image.attributes('src')).toContain('ImagePath');
    });

    test('it applies the icon when the icon property is provided', async () => {
        const wrapper = mountComponent({
            propsData: {
                icon: '$user',
            },
        });
        const userIcon = wrapper.find('i');
        expect(userIcon.attributes('class')).toContain('s-icon-user');
    });

    test('it applies the initials when the initials property is provided', async () => {
        const wrapper = mountComponent({
            propsData: {
                initials: 'MA',
            },
        });

        const avatarInitials = wrapper.find('span');
        expect(avatarInitials.text()).toBe('MA');
    });

    test('it applies the size of the avatar when size property is set', async () => {
        const wrapper = mountComponent({
            propsData: {
                initials: 'MA',
                size: 's',
            },
        });

        await wrapper.setProps({ size: 'xl' });

        expect(wrapper.classes()).toContain('wts-avatar-xl');
    });

    test('it applies image,icon and initials in the given order', async () => {
        const wrapper = mountComponent({
            propsData: {
                image: 'ImagePath',
                icon: '$user',
                initials: 'MA',
            },
        });

        const WtgAvatar = wrapper.find('.wts-avatar');
        expect(WtgAvatar.html()).toContain('<img src="ImagePath">');

        await wrapper.setProps({ image: undefined });
        expect(WtgAvatar.html()).not.toContain('<img src="ImagePath">');
        expect(WtgAvatar.html()).toContain('<i aria-hidden="true" class="wts-icon s-icon-user">');

        await wrapper.setProps({ icon: undefined });
        expect(WtgAvatar.html()).not.toContain('<img src="ImagePath">');
        expect(WtgAvatar.html()).not.toContain('<i aria-hidden="true" class="wts-icon s-icon-user">');
        expect(WtgAvatar.html()).toContain('<span class="wts-avatar-initials">MA</span>');
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgAvatar as any, {
            wtgUi,
            propsData,
        });
    }
});
