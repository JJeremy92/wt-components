import { nextTick } from 'vue';
import { createVuetify } from 'vuetify';
import { VCol } from 'vuetify/components/VGrid';
// import WtgBox from '../../WtgBox';
import WtgLayoutGridColumn from '../WtgLayoutGridColumn';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();
const vuetify = createVuetify();

describe('WtgLayoutGridColumn', () => {
    test('it renders a VCol component', () => {
        const wrapper = mountComponent();
        expect(wrapper.classes()).toContain('v-col');
    });

    test('it sets the cols property of the inner VCol to 12 by default, so that child components take up the full row unless specifically told otherwise', () => {
        const wrapper = mountComponent();
        const col = wrapper.findComponent(VCol);
        expect(col.props('cols')).toBe(12);
    });

    test('it lets you specify the number of columns to take up on extra small devices', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('col-10');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('cols')).toBe(10);
    });

    test('it lets you specify the number of columns to take up on small devices', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('col-sm-8');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('cols')).toBe(12);
        expect(col.props('sm')).toBe(8);
    });

    test('it lets you specify the number of columns to take up on medium devices', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('col-md-6');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('cols')).toBe(12);
        expect(col.props('md')).toBe(6);
    });

    test('it lets you specify the number of columns to take up on large devices', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('col-lg-4');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('cols')).toBe(12);
        expect(col.props('lg')).toBe(4);
    });

    test('it lets you specify the number of columns to take up on extra large devices', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('col-xl-2');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('cols')).toBe(12);
        expect(col.props('xl')).toBe(2);
    });

    test('it lets you specify the number of columns for multiple devices in a single property', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('col-sm-10 col-md-6 col-lg-4 col-xl-2');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('cols')).toBe(12);
        expect(col.props('sm')).toBe(10);
        expect(col.props('md')).toBe(6);
        expect(col.props('lg')).toBe(4);
        expect(col.props('xl')).toBe(2);
    });

    test('it ignores column values outside of the 1-12 range', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('col-sm-0 col-md-13 col-lg-4 col-xl-2');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('cols')).toBe(12);
        expect(col.props('sm')).toBe(false);
        expect(col.props('md')).toBe(false);
        expect(col.props('lg')).toBe(4);
        expect(col.props('xl')).toBe(2);
    });

    test('it ignores device size other than sm, md, lg, xl', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('col-sl-10 col-MD-8 col-lgr-4 col-xl-2');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('cols')).toBe(12);
        expect(col.props('sm')).toBe(false);
        expect(col.props('md')).toBe(false);
        expect(col.props('lg')).toBe(false);
        expect(col.props('xl')).toBe(2);
    });

    test('it ignores tokens without the col- prefix', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('coL-sl-10 cols-md-8 bol-lg-4 col-xl-2');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('cols')).toBe(12);
        expect(col.props('sm')).toBe(false);
        expect(col.props('md')).toBe(false);
        expect(col.props('lg')).toBe(false);
        expect(col.props('xl')).toBe(2);
    });

    test('it lets you specify the order in which items are laid out', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('order-8');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('order')).toBe(8);
    });

    test('it lets you specify the order on small devices', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('order-sm-8');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('orderSm')).toBe(8);
    });

    test('it lets you specify order on medium devices', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('order-md-6');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('orderMd')).toBe(6);
    });

    test('it lets you specify order on large devices', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('order-lg-4');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('orderLg')).toBe(4);
    });

    test('it lets you specify order on extra large devices', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('order-xl-2');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('orderXl')).toBe(2);
    });

    test('it lets you specify the columns and the order for multiple devices in a single property', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns(
            'col-sm-10 col-md-6 col-lg-4 col-xl-2 order-1 order-sm-2 order-md-3 order-lg-4 order-xl-5'
        );
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('cols')).toBe(12);
        expect(col.props('sm')).toBe(10);
        expect(col.props('md')).toBe(6);
        expect(col.props('lg')).toBe(4);
        expect(col.props('xl')).toBe(2);
        expect(col.props('order')).toBe(1);
        expect(col.props('orderSm')).toBe(2);
        expect(col.props('orderMd')).toBe(3);
        expect(col.props('orderLg')).toBe(4);
        expect(col.props('orderXl')).toBe(5);
    });

    test('it ignores column values outside of the 1-12 range', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('col-sm-0 col-md-13 col-lg-4 col-xl-2');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('cols')).toBe(12);
        expect(col.props('sm')).toBe(false);
        expect(col.props('md')).toBe(false);
        expect(col.props('lg')).toBe(4);
        expect(col.props('xl')).toBe(2);
    });

    test('it ignores device size other than sm, md, lg, xl', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('col-sl-10 col-MD-8 col-lgr-4 col-xl-2');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('cols')).toBe(12);
        expect(col.props('sm')).toBe(false);
        expect(col.props('md')).toBe(false);
        expect(col.props('lg')).toBe(false);
        expect(col.props('xl')).toBe(2);
    });

    test('it ignores tokens without the col- prefix', async () => {
        const wrapper = mountComponent();
        wrapper.vm.updateColumns('coL-sl-10 cols-md-8 bol-lg-4 col-xl-2');
        await nextTick();

        const col = wrapper.findComponent(VCol);
        expect(col.props('cols')).toBe(12);
        expect(col.props('sm')).toBe(false);
        expect(col.props('md')).toBe(false);
        expect(col.props('lg')).toBe(false);
        expect(col.props('xl')).toBe(2);
    });

    test('it passes the default slot to the VCol component', () => {
        const wrapper = mountComponent({
            slots: {
                default: '<div class="my-div">Some Text</div>',
            },
        });
        expect(wrapper.find('.my-div').text()).toBe('Some Text');
    });

    // test('it provides itself to the columnable child such that it has access to its methods and can apply its column definition to the outer VCol', async () => {
    //     const wrapper = mountComponent({
    //         slots: {
    //             default: '<wtg-box columns="col-sm-6 col-md-4" />',
    //         },
    //         components: {
    //             WtgBox,
    //         },
    //     });
    //     const box = wrapper.findComponent(WtgBox);
    //     expect(box.props('columns')).toBe('col-sm-6 col-md-4');
    //     await nextTick();

    //     const col = wrapper.findComponent(VCol);
    //     expect(col.props('cols')).toBe(12);
    //     expect(col.props('sm')).toBe(6);
    //     expect(col.props('md')).toBe(4);
    // });

    function mountComponent({ propsData = {}, slots = {}, components = {} } = {}) {
        return mount(WtgLayoutGridColumn as any, {
            wtgUi,
            propsData,
            slots,
            components,
            global: {
                plugins: [vuetify],
            },
        });
    }
});
