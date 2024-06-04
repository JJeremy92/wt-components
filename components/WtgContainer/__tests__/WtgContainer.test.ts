import { WtgContainer } from '../';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('WtgContainer', () => {
    test('it renders a <div> component', () => {
        const wrapper = mountComponent();
        expect(wrapper.element.tagName).toBe('DIV');
    });

    test('it passes the default slot to the <div>', () => {
        const wrapper = mountComponent();
        expect(wrapper.text()).toBe('Some Content');
    });

    test('it passes measurable styles to div element', () => {
        const [height, minHeight, minWidth, maxHeight, maxWidth, width] = [
            '100px',
            '50px',
            '25px',
            '200px',
            '250px',
            '150px',
        ];
        const wrapper = mountComponent({
            propsData: {
                height,
                minHeight,
                minWidth,
                maxHeight,
                maxWidth,
                width,
            },
        });
        expect((wrapper.element as HTMLElement).style.height).toBe(height);
        expect((wrapper.element as HTMLElement).style.minHeight).toBe(minHeight);
        expect((wrapper.element as HTMLElement).style.minWidth).toBe(minWidth);
        expect((wrapper.element as HTMLElement).style.maxHeight).toBe(maxHeight);
        expect((wrapper.element as HTMLElement).style.maxWidth).toBe(maxWidth);
        expect((wrapper.element as HTMLElement).style.width).toBe(width);
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgContainer as any, {
            wtgUi,
            propsData,
            slots: {
                default: 'Some Content',
            },
        });
    }
});
