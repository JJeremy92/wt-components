import { WtgSearchField } from '../';
import { createVuetify } from 'vuetify';
import WtgUi from '../../../WtgUi';
import { mount, enableAutoUnmount, flushPromises, DOMWrapper } from '@vue/test-utils';
import CountriesItemProvider from './CountriesItemProvider';
import { SearchFieldDisplayMode, SearchFieldItemProvider } from '../types';

enableAutoUnmount(afterEach);

const wtgUi = new WtgUi();
const vuetify = createVuetify();

class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
}
window.ResizeObserver ??= ResizeObserverStub;

describe('WtgSearchField', () => {
    let itemProvider: SearchFieldItemProvider;
    let el: HTMLElement;

    beforeEach(() => {
        el = document.createElement('div');
        el.setAttribute('data-app', 'true');
        document.body.appendChild(el);

        jest.useFakeTimers();
        itemProvider = new CountriesItemProvider();
    });

    test('it edits its value in WtgTextField component', async () => {
        const wrapper = mountComponent({ propsData: { value: 'US' } });
        await flushPromises();

        const textfield = wrapper.findComponent({ name: 'WtgTextField' });
        expect(textfield.props('value')).toBe('US');
    });

    test('when the display mode is code-only, it hides the description part of the underlying text-field', async () => {
        itemProvider = new CountriesItemProvider({
            displayMode: SearchFieldDisplayMode.CodeOnly,
        });

        const wrapper = mountComponent();
        await flushPromises();

        const textfield = wrapper.findComponent({ name: 'WtgTextField' });
        expect(textfield.props('showDescription')).toBe(false);
    });

    test('when the display mode is description-only, it hides the description part of the underlying text-field', async () => {
        itemProvider = new CountriesItemProvider({
            displayMode: SearchFieldDisplayMode.DescOnly,
        });

        const wrapper = mountComponent();
        await flushPromises();

        const textfield = wrapper.findComponent({ name: 'WtgTextField' });
        expect(textfield.props('showDescription')).toBe(false);
    });

    test('when you commit a change in the search box it emits a change event', async () => {
        const wrapper = mountComponent();
        await flushPromises();

        const textfield = wrapper.findComponent({ name: 'WtgTextField' });
        textfield.vm.$emit('input', 'NL');
        textfield.vm.$emit('change', 'NL');
        await flushPromises();

        const changeEvents = wrapper.emitted('change') ?? [];
        expect(changeEvents.length).toBe(1);
        expect(changeEvents[0]).toEqual(['NL']);
    });

    test('when you enter an invalid value, it does not emit a change event', async () => {
        const wrapper = mountComponent();
        await flushPromises();

        const textfield = wrapper.findComponent({ name: 'WtgTextField' });
        textfield.vm.$emit('input', 'N');
        textfield.vm.$emit('change', 'N');
        await flushPromises();

        const changeEvents = wrapper.emitted('change') ?? [];
        expect(changeEvents.length).toBe(0);
    });

    test('it brings up a menu when the trailing icon is clicked', async () => {
        const wrapper = mountComponent({});
        await flushPromises();

        const menu = wrapper.findComponent({ name: 'WtgPopover' });
        expect(menu.props('modelValue')).toBe(false);

        const trailingIcon = wrapper.findAllComponents({ name: 'WtgIcon' })[1];
        trailingIcon.vm.$emit('click');
        await flushPromises();

        expect(menu.props('modelValue')).toBe(true);
    });

    test('when given a value, it calls the item provider to provide a description', async () => {
        jest.spyOn(itemProvider, 'getItemForValueAsync');

        const wrapper = mountComponent({ propsData: { value: 'AF' } });
        const textfield = wrapper.findComponent({ name: 'WtgTextField' });
        await flushPromises();

        expect(itemProvider.getItemForValueAsync).toHaveBeenCalledWith('AF');
        expect(textfield.props('value')).toBe('AF');
        expect(textfield.props('description')).toBe('Afghanistan');
    });

    test('when the menu appears, it calls the item provider to provide the first set of suggestions', async () => {
        jest.spyOn(itemProvider, 'getItemsAsync');

        const wrapper = mountComponent();
        await flushPromises();

        expect(itemProvider.getItemsAsync).not.toHaveBeenCalled();
        const trailingIcon = wrapper.findAllComponents({ name: 'WtgIcon' })[1];
        trailingIcon.vm.$emit('click');
        await flushPromises();

        expect(itemProvider.getItemsAsync).toHaveBeenCalledWith('', 0);

        const listitems = new DOMWrapper(document.body).findAll('.wts-search-field-result');
        expect(listitems.length).toBe(20);
        expect(listitems.at(0).text()).toBe('AF - Afghanistan');
        expect(listitems.at(1).text()).toBe('AL - Albania');
        expect(listitems.at(19).text()).toBe('BY - Belarus');
    });

    test.each([
        { displayMode: SearchFieldDisplayMode.DescOnly, expectedDisplayValue: 'Afghanistan' },
        { displayMode: SearchFieldDisplayMode.CodeOnly, expectedDisplayValue: 'AF' },
        {
            displayMode: SearchFieldDisplayMode.CodeDesc,
            expectedDisplayValue: 'AF - Afghanistan',
        },
    ])(
        'when the search results display mode is $displayMode, it formats the results correctly',
        async ({ displayMode, expectedDisplayValue }) => {
            const wrapper = mountComponent({
                propsData: {
                    itemProvider: new CountriesItemProvider({
                        searchResultsDisplayMode: displayMode,
                    }),
                },
            });
            const trailingIcon = wrapper.findAllComponents({ name: 'WtgIcon' })[1];
            trailingIcon.vm.$emit('click');
            await flushPromises();
            const listitems = new DOMWrapper(document.body).findAll('.wts-search-field-result');
            expect(listitems.at(0).text()).toBe(expectedDisplayValue);
        }
    );

    test('when the menu appears, and the show more button is pressed, it calls the item provider again to provide the second set of suggestions', async () => {
        jest.spyOn(itemProvider, 'getItemsAsync');

        const wrapper = mountComponent();
        await flushPromises();

        expect(itemProvider.getItemsAsync).not.toHaveBeenCalled();
        const trailingIcon = wrapper.findAllComponents({ name: 'WtgIcon' })[1];
        trailingIcon.vm.$emit('click');
        await flushPromises();

        expect(itemProvider.getItemsAsync).toHaveBeenCalledWith('', 0);
        let listitems = new DOMWrapper(document.body).findAll('.wts-search-field-result');
        expect(listitems.length).toBe(20);

        const button = wrapper.findComponent({ name: 'WtgButton' });
        expect(button.text()).toBe('Show More');
        await button.trigger('click');
        await flushPromises();

        expect(itemProvider.getItemsAsync).toHaveBeenCalledWith('', 20);
        listitems = new DOMWrapper(document.body).findAll('.wts-search-field-result');
        expect(listitems.length).toBe(40);

        expect(listitems.at(0).text()).toBe('AF - Afghanistan');
        expect(listitems.at(19).text()).toBe('BY - Belarus');
        expect(listitems.at(20).text()).toBe('BE - Belgium');
        expect(listitems.at(39).text()).toBe('CA - Canada');
    });

    test('when the user types a search term into the textfield, it starts a timer to perform the the corresponding search once the user has stopped typing', async () => {
        jest.spyOn(itemProvider, 'getItemsAsync');

        const wrapper = mountComponent();
        const textfield = wrapper.findComponent({ name: 'WtgTextField' });
        await flushPromises();

        textfield.vm.$emit('input', 'Is');
        textfield.vm.$emit('input', 'Isla');
        textfield.vm.$emit('input', 'Island');
        jest.advanceTimersByTime(200);
        await flushPromises();

        expect(itemProvider.getItemsAsync).toHaveBeenCalledTimes(1);
        expect(itemProvider.getItemsAsync).toHaveBeenLastCalledWith('Island', 0);
    });

    test('it displays the search results in a menu', async () => {
        const wrapper = mountComponent();
        const textfield = wrapper.findComponent({ name: 'WtgTextField' });
        await flushPromises();

        const menu = wrapper.findComponent({ name: 'WtgPopover' });
        expect(menu.props('modelValue')).toBe(false);

        textfield.vm.$emit('input', 'Island');
        jest.runAllTimers();
        await flushPromises();

        expect(menu.props('modelValue')).toBe(true);
        const listitems = new DOMWrapper(document.body).findAll('.wts-search-field-result');
        expect(listitems.length).toBe(17);
        expect(listitems.at(0).text()).toBe('BV - Bouvet Island');
        expect(listitems.at(16).text()).toBe('VI - Virgin Islands (U.S.)');
    });

    test('when you search for a non-existent string it displays a NO RESULTS FOUND message in the correct language', async () => {
        const wrapper = mountComponent();
        const textfield = wrapper.findComponent({ name: 'WtgTextField' });
        await flushPromises();

        const menu = wrapper.findComponent({ name: 'WtgPopover' });
        expect(menu.props('modelValue')).toBe(false);

        textfield.vm.$emit('input', 'Utopia');
        jest.runAllTimers();
        await flushPromises();

        expect(menu.props('modelValue')).toBe(true);
        const list = new DOMWrapper(document.body).find('.wts-search-field-no-results-caption');
        expect(list.text()).toBe('No items found');
    });

    test('it ensures the menu positions itself correctly and never covers the input', async () => {
        const wrapper = mountComponent();
        await flushPromises();

        const menu = wrapper.findComponent({ name: 'WtgPopover' });
        expect(menu.props('transition')).toBe(false);
    });

    test('when you click on a search result it selects it', async () => {
        const wrapper = mountComponent();
        const textfield = wrapper.findComponent({ name: 'WtgTextField' });
        await flushPromises();

        textfield.vm.$emit('input', 'Island');
        jest.runAllTimers();
        await flushPromises();

        const listitems = new DOMWrapper(document.body).findAll('.wts-search-field-result');
        expect(listitems.at(16).text()).toBe('VI - Virgin Islands (U.S.)');

        await listitems.at(16).trigger('click');
        await flushPromises();

        expect(textfield.props('value')).toBe('VI');
        expect(textfield.props('description')).toBe('Virgin Islands (U.S.)');
    });

    test('when you click on a search result it emits a change event', async () => {
        const wrapper = mountComponent();
        const textfield = wrapper.findComponent({ name: 'WtgTextField' });
        await flushPromises();

        textfield.vm.$emit('input', 'Island');
        jest.runAllTimers();
        await flushPromises();

        const listitems = new DOMWrapper(document.body).findAll('.wts-search-field-result');
        expect(listitems.at(16).text()).toBe('VI - Virgin Islands (U.S.)');

        await listitems.at(16).trigger('click');
        await flushPromises();

        const changeEvents = wrapper.emitted('change') ?? [];
        expect(changeEvents.length).toBe(1);

        const changeEvent = changeEvents[0];
        const code = changeEvent[0];
        expect(code).toEqual('VI');
    });

    test('when description-only and selecting a search result it applies the description', async () => {
        const wrapper = mountComponent({
            propsData: {
                itemProvider: new CountriesItemProvider({
                    displayMode: SearchFieldDisplayMode.DescOnly,
                }),
            },
        });
        const textfield = wrapper.findComponent({ name: 'WtgTextField' });
        await flushPromises();

        textfield.vm.$emit('input', 'Island');
        jest.runAllTimers();
        await flushPromises();

        const listitems = new DOMWrapper(document.body).findAll('.wts-search-field-result');
        expect(listitems.at(16).text()).toBe('VI - Virgin Islands (U.S.)');

        await listitems.at(16).trigger('click');
        await flushPromises();

        expect(textfield.props('value')).toBe('Virgin Islands (U.S.)');
    });

    describe('when readonly is true', () => {
        let wrapper, textfield;

        beforeEach(() => {
            wrapper = mountComponent({
                propsData: {
                    itemProvider,
                    itemText: 'name',
                    itemValue: 'code',
                    isReadOnly: true,
                },
            });
            textfield = wrapper.findComponent({ name: 'WtgTextField' });
        });

        test('it does not bring up a menu when the append-icon is clicked', async () => {
            const menu = wrapper.findComponent({ name: 'WtgPopover' });
            expect(menu.props('modelValue')).toBe(false);

            const trailingIcon = wrapper.findAllComponents({ name: 'WtgIcon' })[1];
            trailingIcon.vm.$emit('click');
            await flushPromises();
            expect(menu.props('modelValue')).toBe(false);
        });

        test('it does not bring up a menu when down key is pressed', async () => {
            const menu = wrapper.findComponent({ name: 'WtgPopover' });
            expect(menu.props('modelValue')).toBe(false);

            const trailingIcon = wrapper.findAllComponents({ name: 'WtgIcon' })[1];
            trailingIcon.vm.$emit('click');
            await flushPromises();
            expect(menu.props('modelValue')).toBe(false);
        });

        test('it does not bring up a menu on input event', async () => {
            const menu = wrapper.findComponent({ name: 'WtgPopover' });
            expect(menu.props('modelValue')).toBe(false);

            textfield.vm.$emit('input', 'text');
            jest.runAllTimers();
            await wrapper.vm.$nextTick();
            expect(menu.props('modelValue')).toBe(false);
        });
    });

    test('when the menu appears, it selects the current value if it is in the list', async () => {
        const wrapper = mountComponent({ propsData: { value: 'AU' } });
        await flushPromises();

        const trailingIcon = wrapper.findAllComponents({ name: 'WtgIcon' })[1];
        trailingIcon.vm.$emit('click');
        await flushPromises();

        expect(wrapper.vm.listIndex).toBe(12);
    });

    test('when the menu appears, it selects the first item if the current value is NOT in the list', async () => {
        const wrapper = mountComponent({ propsData: { value: 'US' } });
        await flushPromises();

        const trailingIcon = wrapper.findAllComponents({ name: 'WtgIcon' })[1];
        trailingIcon.vm.$emit('click');
        await flushPromises();

        expect(wrapper.vm.listIndex).toBe(0);
    });

    test('when the control gets destroyed with un-commited changes it emits a commit-pending event', async () => {
        const wrapper = mountComponent();
        await flushPromises();

        const textfield = wrapper.findComponent({ name: 'WtgTextField' });
        textfield.vm.$emit('input', 'NL');

        wrapper.unmount();
        expect(wrapper.emitted('commit-pending').length).toBe(1);
        expect(wrapper.emitted('commit-pending')[0][0]).toBe('NL');
    });

    test('when the control gets destroyed BUT no changes have been made, it does NOT emit a commit-pending event', async () => {
        const wrapper = mountComponent();
        await flushPromises();

        wrapper.unmount();
        expect(wrapper.emitted('commit-pending')).toBe(undefined);
    });

    test('When allow free text entry and cannot resolve item, when click on cell, it should show intial value', async () => {
        const wrapper = mountComponent({
            propsData: {
                allowFreeTextEntry: true,
                value: 'Initial Value',
            },
            data: {
                displayValue: 'Initial Display Value',
            },
        });
        await flushPromises();

        const textfield = wrapper.findComponent({ name: 'WtgTextField' });
        textfield.vm.$emit('change', 'Random Value');
        await flushPromises();

        expect(wrapper.vm.displayValue).toBe('Initial Value');
    });

    test('When allow free text entry and cannot resolve guid item, when click on cell, it should show NOT AVAILABLE', async () => {
        const wrapper = mountComponent({
            propsData: {
                allowFreeTextEntry: true,
                value: 'CB9EDB98-4976-45F0-A0C2-4622CEB7470C',
            },
            data: {
                displayValue: 'Initial Display Value',
            },
        });
        await flushPromises();

        const textfield = wrapper.findComponent({ name: 'WtgTextField' });
        textfield.vm.$emit('change', '295fef9b-7ce2-4669-8c7c-7c67b6a4656d');
        await flushPromises();

        expect(wrapper.vm.displayValue).toBe('NOT AVAILABLE');
    });

    function mountComponent({ propsData = {}, listeners = {}, data = {} } = {}) {
        return mount(WtgSearchField as any, {
            attachTo: document.body,
            data() {
                return data;
            },
            wtgUi,
            propsData: {
                itemProvider,
                ...propsData,
            },
            slots: {
                default: 'My Button',
            },
            global: {
                plugins: [vuetify],
            },
            listeners,
        });
    }
});
