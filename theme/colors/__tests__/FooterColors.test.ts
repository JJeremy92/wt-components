import FooterColors from '../FooterColors';

describe('FooterColors', () => {
    describe('when created without information', () => {
        let footerColors: FooterColors;

        beforeEach(() => {
            footerColors = new FooterColors();
        });

        test('it does not define any color information', () => {
            expect(footerColors.background).toBeUndefined();
            expect(footerColors.dark).toBeUndefined();
        });
    });

    describe('when created from options', () => {
        let footerColors: FooterColors;

        beforeEach(() => {
            const options = {
                background: '#000000',
                dark: true
            };
            footerColors = new FooterColors(options, undefined);
        });

        test('it creates a definition for the given color information', () => {
            expect(footerColors.background).toBe('#000000');
            expect(footerColors.dark).toBe(true);
        });
    });

    describe('when created from a base FooterColors', () => {
        let footerColors: FooterColors;

        beforeEach(() => {
            const base = new FooterColors({
                background: '#000000',
                dark: true
            });
            footerColors = new FooterColors({}, base);
        });

        test('it creates a definition for the given color information', () => {
            expect(footerColors.background).toBe('#000000');
            expect(footerColors.dark).toBe(true);
        });
    });

    describe('when created from options with a fallback of a base FooterColors', () => {
        let footerColors: FooterColors;

        beforeEach(() => {
            const options = {
                background: '#000001'
            };
            const base = new FooterColors({
                background: '#000000',
                dark: true
            });
            footerColors = new FooterColors(options, base);
        });

        test('it applies the options on top of the base FooterColors', () => {
            expect(footerColors.background).toBe('#000001');
            expect(footerColors.dark).toBe(true);
        });
    });
});
