import { defineComponent } from 'vue';
import { layoutGridColumnProps, useLayoutGridColumn } from '../layoutGridColumn';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';
import { layoutGridColumnKey } from '../../../components/WtgLayoutGrid/keys';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();

describe('layoutGridColumn', () => {
    let layoutGridColumn: any;

    beforeEach(() => {
        layoutGridColumn = {
            updateColumns: jest.fn(),
        };
    });

    describe('layoutGridColumnProps, useLayoutGridColumn', () => {
        let propsData: any;

        beforeEach(() => {
            propsData = {
                columns: 'col-12 col-md-4',
            };
        });

        test('it adds a property called columns to a component definition that allows it to be used inside a wtg-layout-grid', () => {
            const wrapper = mountComponent({ propsData });
            expect(wrapper.props('columns')).toBe('col-12 col-md-4');
        });

        test('it defines a validator for the columns property to check the format', () => {
            const wrapper = mountComponent();
            const props = wrapper.vm.$options.props as any;
            const validator = props.columns.validator;

            expect(validator('bla')).toBe(false);
            expect(validator('col')).toBe(false);
            expect(validator('col-sm-1-bla')).toBe(false);
            expect(validator('col-0')).toBe(false);
            expect(validator('col-13')).toBe(false);
            expect(validator('Col-1')).toBe(false);
            expect(validator('col-xx-1')).toBe(false);
            expect(validator('col-sm-0')).toBe(false);
            expect(validator('col-sm-13')).toBe(false);
            expect(validator('col-Sm-1')).toBe(false);
            expect(validator('Col-sm-1')).toBe(false);
            expect(validator('col-md-x')).toBe(false);
            expect(validator('col-md-01')).toBe(false);
            expect(validator('col-lg-012')).toBe(false);

            expect(validator('col-1')).toBe(true);
            expect(validator('col-6')).toBe(true);
            expect(validator('col-12')).toBe(true);
            expect(validator('col-sm-1')).toBe(true);
            expect(validator('col-sm-6')).toBe(true);
            expect(validator('col-sm-12')).toBe(true);
            expect(validator('col-md-1')).toBe(true);
            expect(validator('col-md-6')).toBe(true);
            expect(validator('col-md-12')).toBe(true);
            expect(validator('col-lg-1')).toBe(true);
            expect(validator('col-lg-6')).toBe(true);
            expect(validator('col-lg-12')).toBe(true);
            expect(validator('col-xl-1')).toBe(true);
            expect(validator('col-xl-6')).toBe(true);
            expect(validator('col-xl-12')).toBe(true);
        });

        test('it passes the column information on to the (injected) Layout Grid Column', async () => {
            const wrapper = mountComponent({ propsData });
            expect(layoutGridColumn.updateColumns).toHaveBeenLastCalledWith('col-12 col-md-4');

            await wrapper.setProps({ columns: 'col-xl-1' });
            expect(layoutGridColumn.updateColumns).toHaveBeenLastCalledWith('col-xl-1');
        });
    });

    function mountComponent({ propsData = {}, slots = {} } = {}) {
        const component = defineComponent({
            props: layoutGridColumnProps,
            setup(props) {
                useLayoutGridColumn(props);
            },
            template: '<div />',
        });
        return mount(component as any, {
            wtgUi,
            propsData,
            global: {
                provide: {
                    [layoutGridColumnKey]: layoutGridColumn,
                },
            },
            slots,
        });
    }
});
