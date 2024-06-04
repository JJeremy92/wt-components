import { WtgPanel } from '../';
import WtgUi from '../../../WtgUi';
import { createVuetify } from 'vuetify';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();
const vuetify = createVuetify();

describe('WtgPanel', () => {
    test('it renders a <div> component', () => {
        const wrapper = mountComponent();
        expect(wrapper.element.tagName).toBe('DIV');
    });

    test('it passes the default slot to the <div>', () => {
        const wrapper = mountComponent();
        expect(wrapper.text()).toBe('Some Content');
    });

    test('when the caption property is set, it renders the caption as the panel title', () => {
        const wrapper = mountComponent({
            propsData: { caption: 'Some caption' },
        });
        const caption = wrapper.findAll('div').at(1);
        expect(caption?.text()).toBe('Some caption');
        expect(caption?.classes()).toContain('wts-panel-caption');
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

    test('it applies the wtg-grid-layout when the layout type is grid', async () => {
        const wrapper = mountComponent({ propsData: { layout: 'grid' } });
        expect(wrapper.html()).toContain('v-col v-col-12');
    });

    function mountComponent({ propsData = {} } = {}) {
        return mount(WtgPanel as any, {
            wtgUi,
            propsData,
            slots: {
                default: 'Some Content',
            },
            global: {
                plugins: [vuetify],
            },
        });
    }
});
