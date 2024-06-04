import NavigationDrawerColors from '../NavigationDrawerColors';

describe('NavigationDrawerColors', () => {
    describe('when created without information', () => {
        let navigationDrawerColors: NavigationDrawerColors;

        beforeEach(() => {
            navigationDrawerColors = new NavigationDrawerColors();
        });

        test('it does not define any color information', () => {
            expect(navigationDrawerColors.background).toBeUndefined();
            expect(navigationDrawerColors.dark).toBeUndefined();
        });
    });

    describe('when created from options', () => {
        let navigationDrawerColors: NavigationDrawerColors;

        beforeEach(() => {
            const options = {
                background: '#000000',
                dark: true
            };
            navigationDrawerColors = new NavigationDrawerColors(options, undefined);
        });

        test('it creates a definition for the given color information', () => {
            expect(navigationDrawerColors.background).toBe('#000000');
            expect(navigationDrawerColors.dark).toBe(true);
        });
    });

    describe('when created from a base NavigationDrawerColors', () => {
        let navigationDrawerColors: NavigationDrawerColors;

        beforeEach(() => {
            const base = new NavigationDrawerColors({
                background: '#000000',
                dark: true
            });
            navigationDrawerColors = new NavigationDrawerColors({}, base);
        });

        test('it creates a definition for the given color information', () => {
            expect(navigationDrawerColors.background).toBe('#000000');
            expect(navigationDrawerColors.dark).toBe(true);
        });
    });

    describe('when created from options with a fallback of a base NavigationDrawerColors', () => {
        let navigationDrawerColors: NavigationDrawerColors;

        beforeEach(() => {
            const options = {
                background: '#000001'
            };
            const base = new NavigationDrawerColors({
                background: '#000000',
                dark: true
            });
            navigationDrawerColors = new NavigationDrawerColors(options, base);
        });

        test('it applies the options on top of the base NavigationDrawerColors', () => {
            expect(navigationDrawerColors.background).toBe('#000001');
            expect(navigationDrawerColors.dark).toBe(true);
        });
    });
});
