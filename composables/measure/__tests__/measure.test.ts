import { defineComponent } from 'vue';
import { measureProps, useMeasure } from '../measure';
import { mount, enableAutoUnmount } from '@vue/test-utils';
import WtgUi from '../../../WtgUi';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('measure', () => {
    let wrapper;
    let propsData: {};

    beforeEach(() => {
        propsData = {
            height: 250,
            maxHeight: 500,
            maxWidth: 1920,
            minHeight: 100,
            minWidth: 320,
            width: 1024,
        };
        wrapper = mountComponent({ propsData });
    });

    describe('measureProps', () => {
        it('adds a property called height to a component that allows you to specify its height', () => {
            expect(wrapper.props('height')).toBe(250);
        });

        it('adds a property called maxHeight to a component that allows you to specify its maximum height', () => {
            expect(wrapper.props('maxHeight')).toBe(500);
        });

        it('adds a property called maxWidth to a component that allows you to specify its maximum width', () => {
            expect(wrapper.props('maxWidth')).toBe(1920);
        });

        it('adds a property called minHeight to a component that allows you to specify its minimum height', () => {
            expect(wrapper.props('minHeight')).toBe(100);
        });

        it('adds a property called minWidth to a component that allows you to specify its minimum width', () => {
            expect(wrapper.props('minWidth')).toBe(320);
        });

        it('adds a property called width to a component that allows you to specify its width', () => {
            expect(wrapper.props('width')).toBe(1024);
        });
    });

    describe('useMeasure', () => {
        it('has a computed prop measureStyles that returns a style object made from the props when used', () => {
            const measurableStyles = {
                height: '250px',
                maxHeight: '500px',
                maxWidth: '1920px',
                minHeight: '100px',
                minWidth: '320px',
                width: '1024px',
            };
            expect(wrapper.vm.measurableStyles).toStrictEqual(measurableStyles);
        });
    });

    function mountComponent({ propsData = {} } = {}) {
        const component = defineComponent({
            name: 'MeasureComponent',
            props: measureProps,
            setup(props) {
                const { measurableStyles } = useMeasure(props);
                return { measurableStyles };
            },
            template: '<div>Measure Component</div>',
        });

        return mount(component as any, {
            wtgUi,
            propsData,
        });
    }
});
