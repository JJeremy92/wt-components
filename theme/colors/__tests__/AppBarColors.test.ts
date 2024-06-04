import AppBarColors from '../AppBarColors';

describe('AppBarColors', () => {
    describe('when created without information', () => {
        let appBarColors: AppBarColors;

        beforeEach(() => {
            appBarColors = new AppBarColors();
        });

        test('it does not define any color information', () => {
            expect(appBarColors.background).toBeUndefined();
            expect(appBarColors.dark).toBeUndefined();
        });
    });

    describe('when created from options', () => {
        let appBarColors: AppBarColors;

        beforeEach(() => {
            const options = {
                background: '#000000',
                dark: true
            };
            appBarColors = new AppBarColors(options, undefined);
        });

        test('it creates a definition for the given color information', () => {
            expect(appBarColors.background).toBe('#000000');
            expect(appBarColors.dark).toBe(true);
        });
    });

    describe('when created from a base AppBarColors', () => {
        let appBarColors: AppBarColors;

        beforeEach(() => {
            const base = new AppBarColors({
                background: '#000000',
                dark: true
            });
            appBarColors = new AppBarColors({}, base);
        });

        test('it creates a definition for the given color information', () => {
            expect(appBarColors.background).toBe('#000000');
            expect(appBarColors.dark).toBe(true);
        });
    });

    describe('when created from options with a fallback of a base AppBarColors', () => {
        let appBarColors: AppBarColors;

        beforeEach(() => {
            const options = {
                background: '#000001'
            };
            const base = new AppBarColors({
                background: '#000000',
                dark: true
            });
            appBarColors = new AppBarColors(options, base);
        });

        test('it applies the options on top of the base AppBarColors', () => {
            expect(appBarColors.background).toBe('#000001');
            expect(appBarColors.dark).toBe(true);
        });
    });
});
