import IconColors from '../IconColors';

describe('IconColors', () => {
    describe('when created without information', () => {
        let iconColors: IconColors;

        beforeEach(() => {
            iconColors = new IconColors();
        });

        test('it does not define any color information', () => {
            expect(iconColors.color).toBeUndefined();
        });
    });

    describe('when created from options', () => {
        let iconColors: IconColors;

        beforeEach(() => {
            const options = {
                color: '#000000'
            };
            iconColors = new IconColors(options, undefined);
        });

        test('it creates a definition for the given color information', () => {
            expect(iconColors.color).toBe('#000000');
        });
    });

    describe('when created from a base IconColors', () => {
        let iconColors: IconColors;

        beforeEach(() => {
            const base = new IconColors({
                color: '#000000'
            });
            iconColors = new IconColors({}, base);
        });

        test('it creates a definition for the given color information', () => {
            expect(iconColors.color).toBe('#000000');
        });
    });

    describe('when created from options with a fallback of a base IconColors', () => {
        let iconColors: IconColors;

        beforeEach(() => {
            const options = {
                color: '#000001'
            };
            const base = new IconColors({
                color: '#000000'
            });
            iconColors = new IconColors(options, base);
        });

        test('it applies the options on top of the base IconColors', () => {
            expect(iconColors.color).toBe('#000001');
        });
    });
});
