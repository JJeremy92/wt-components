import { Ref } from 'vue';

export type CaptionProvider = (
    languageCode: Ref<string>,
    key: string,
    params?: Array<string | number>
) => string | undefined;
