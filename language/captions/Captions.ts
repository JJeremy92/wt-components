import en from './en';
import nl from './nl';
import { CaptionProvider } from './types';
import { Ref } from 'vue';

const captions = { en, nl } as Record<string, object>;

function languageFromCode(code: string): string {
    const i = code.indexOf('-');
    return i >= 0 ? code.substr(0, i) : code;
}

function captionsForLanguage(languageCode: Ref<string>): Record<string, any> {
    const code = languageCode.value.toLowerCase();
    return captions[code] ?? captions[languageFromCode(code)] ?? captions.en;
}

function applyParameters(caption: string, params?: Array<string | number>): string {
    return params && params.length > 0
        ? caption.replace(/\{(\d+)\}/g, (match: string, index: string) => {
              return String(params[+index]);
          })
        : caption;
}

function install(captionProvider: CaptionProvider): CaptionProvider {
    return (language: Ref<string>, key: string, params?: Array<string | number>): string | undefined => {
        let caption = captionProvider(language, key, params);
        if (caption === undefined) {
            caption = defaultCaptionProvider(language, key, params);
        }
        return caption;
    };
}

function defaultCaptionProvider(
    languageCode: Ref<string>,
    key: string,
    params?: Array<string | number>
): string | undefined {
    let node, part;
    if (key) {
        const path = key.split('.');
        node = captionsForLanguage(languageCode);
        while (node && (part = path.shift())) {
            node = node[part];
        }
    }
    return node && applyParameters(node, params);
}

class Captions {
    public readonly provider: CaptionProvider;

    constructor(captionProvider?: CaptionProvider) {
        this.provider = captionProvider ? install(captionProvider) : defaultCaptionProvider;
    }
}

export { defaultCaptionProvider };
export default Captions;
