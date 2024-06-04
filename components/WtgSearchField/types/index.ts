export type SearchFieldItem = {
    value?: string;
    code: string;
    description: string;
    [key: string]: any;
};

export enum SearchFieldDisplayMode {
    CodeOnly = 'CodeOnly',
    DescOnly = 'DescOnly',
    CodeDesc = 'CodeDesc',
}

export interface SearchFieldItemProvider {
    getDisplayModeAsync(context?: any): Promise<SearchFieldDisplayMode>;
    getSearchResultsDisplayModeAsync(context?: any): Promise<SearchFieldDisplayMode>;
    getDisplayStringAsync(value: string, context?: any): Promise<string>;
    getEmptyValueAsync(context?: any): Promise<string>;
    getItemAsync(search: string, context?: any): Promise<SearchFieldItem | undefined>;
    getItemsAsync(
        search: string,
        skip?: number,
        context?: any
    ): Promise<{
        items: SearchFieldItem[];
        total: number;
    }>;
    getItemForValueAsync(value: string, context?: any): Promise<SearchFieldItem | undefined>;
    validateAsync(displayValue: string, item?: SearchFieldItem, context?: any): Promise<boolean>;
}
