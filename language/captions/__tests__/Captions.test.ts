import Captions, { defaultCaptionProvider } from '../Captions';
import { ref, Ref } from 'vue';

describe('defaultCaptionProvider', () => {
    test('it can retrieve a caption in a supported language code', () => {
        expect(defaultCaptionProvider(ref('en'), 'dateField.today')).toBe('Today');
        expect(defaultCaptionProvider(ref('nl'), 'dateField.today')).toBe('Vandaag');
    });

    test('it can retrieve a caption in an unsupported regional code for a supported language', () => {
        expect(defaultCaptionProvider(ref('en-CA'), 'dateField.today')).toBe('Today');
        expect(defaultCaptionProvider(ref('nl-BE'), 'dateField.today')).toBe('Vandaag');
    });

    test('it does NOT require the language code to be the correct casing (GLOW uses all uppercase)', () => {
        expect(defaultCaptionProvider(ref('En'), 'dateField.today')).toBe('Today');
        expect(defaultCaptionProvider(ref('NL'), 'dateField.today')).toBe('Vandaag');
    });

    test('it formats a parameterized caption using the given parameter array, parameters can be numbers or strings', () => {
        expect(defaultCaptionProvider(ref('en'), 'searchList.items', [123])).toBe('123 items');
        expect(defaultCaptionProvider(ref('en'), 'searchList.items', ['some'])).toBe('some items');
    });

    test("when it can't find the caption in the required language it returns the english caption by default", () => {
        expect(defaultCaptionProvider(ref('xxx'), 'dateField.today')).toBe('Today');
    });

    test("when it can't find any caption at all it returns undefined", () => {
        expect(defaultCaptionProvider(ref('xxx'), 'yyy')).toBeUndefined();
    });
});

describe('Captions', () => {
    describe('When created without a plugin caption provider', () => {
        let captions: Captions;

        beforeEach(() => {
            captions = new Captions();
        });

        test('it uses the default caption provider', () => {
            expect(captions.provider).toBe(defaultCaptionProvider);
        });
    });

    describe('When created with a plugin caption provider', () => {
        let captions: Captions;

        beforeEach(() => {
            function captionProvider(languageCode: Ref<string>, key: string): string | undefined {
                let caption;
                if (languageCode.value === 'de' && key === 'dateField.today') {
                    caption = 'Heute';
                }
                return caption;
            }
            captions = new Captions(captionProvider);
        });

        test('it tries the plugged in caption provider first, but falls back on the default provider if it returns undefined', () => {
            expect(captions.provider(ref('de'), 'dateField.today')).toBe('Heute');
            expect(captions.provider(ref('en'), 'dateField.today')).toBe('Today');
        });
    });
});
