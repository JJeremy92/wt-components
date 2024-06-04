import { SearchFieldItemProvider, SearchFieldItem, SearchFieldDisplayMode } from '../types';
import countries from './countries';

class CountriesItemProvider implements SearchFieldItemProvider {
    private displayMode: SearchFieldDisplayMode;
    private searchResultsDisplayMode: SearchFieldDisplayMode;

    constructor({
        displayMode = SearchFieldDisplayMode.CodeDesc,
        searchResultsDisplayMode = SearchFieldDisplayMode.CodeDesc,
    } = {}) {
        this.displayMode = displayMode;
        this.searchResultsDisplayMode = searchResultsDisplayMode;
    }

    getDisplayModeAsync(): Promise<SearchFieldDisplayMode> {
        return Promise.resolve(this.displayMode);
    }

    getSearchResultsDisplayModeAsync(): Promise<SearchFieldDisplayMode> {
        return Promise.resolve(this.searchResultsDisplayMode);
    }

    getDisplayStringAsync(value: string): Promise<string> {
        return this.getItemForValueAsync(value).then((item) => {
            let displayString = '';
            if (item) {
                switch (this.displayMode) {
                    case SearchFieldDisplayMode.CodeOnly:
                        displayString = item.code;
                        break;
                    case SearchFieldDisplayMode.DescOnly:
                        displayString = item.description;
                        break;
                    default:
                        displayString = item.code + ' - ' + item.description;
                        break;
                }
            }
            return displayString;
        });
    }

    getEmptyValueAsync(): Promise<string> {
        return Promise.resolve('');
    }

    getItemAsync(search: string): Promise<SearchFieldItem | undefined> {
        return Promise.resolve(countries.find((country) => country.code === search));
    }

    getItemsAsync(
        search: string,
        skip: number
    ): Promise<{
        items: SearchFieldItem[];
        total: number;
    }> {
        const allItems = search
            ? countries.filter((country) =>
                  country.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
              )
            : countries;
        const items = allItems.slice(skip, skip + 20);

        return Promise.resolve({
            items,
            total: allItems.length,
        });
    }

    getItemForValueAsync(value: string): Promise<SearchFieldItem | undefined> {
        return Promise.resolve(countries.find((country) => country.code === value));
    }

    validateAsync(displayValue: string, item?: SearchFieldItem): Promise<boolean> {
        return Promise.resolve(!displayValue || !!(item || countries.find((country) => country.code === displayValue)));
    }
}

export default CountriesItemProvider;
