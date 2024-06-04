import ButtonType from '../ButtonType';

describe('ButtonType', () => {
    describe('when created without information', () => {
        let buttonType: ButtonType;

        beforeEach(() => {
            buttonType = new ButtonType();
        });

        test('it does not define any appearance', () => {
            expect(buttonType.color).toBeUndefined();
            expect(buttonType.dark).toBe(false);
            expect(buttonType.depressed).toBe(false);
            expect(buttonType.light).toBe(false);
            expect(buttonType.rounded).toBe(false);
            expect(buttonType.tile).toBe(false);
        });
    });

    describe('when created from options', () => {
        let buttonType: ButtonType;

        beforeEach(() => {
            const options = {
                color: 'primary',
                dark: true,
                depressed: true,
                light: true,
                rounded: true,
                tile: true
            };
            buttonType = new ButtonType(options, undefined);
        });

        test('it creates a definition for the given options', () => {
            expect(buttonType.color).toBe('primary');
            expect(buttonType.dark).toBe(true);
            expect(buttonType.depressed).toBe(true);
            expect(buttonType.light).toBe(true);
            expect(buttonType.rounded).toBe(true);
            expect(buttonType.tile).toBe(true);
        });
    });

    describe('when created from a base button appearance', () => {
        let buttonType: ButtonType;

        beforeEach(() => {
            const base = new ButtonType({
                color: 'primary',
                dark: true,
                depressed: true,
                light: true,
                rounded: true,
                tile: true
            });
            buttonType = new ButtonType({}, base);
        });

        test('it creates a definition for the given options', () => {
            expect(buttonType.color).toBe('primary');
            expect(buttonType.dark).toBe(true);
            expect(buttonType.depressed).toBe(true);
            expect(buttonType.light).toBe(true);
            expect(buttonType.rounded).toBe(true);
            expect(buttonType.tile).toBe(true);
        });
    });

    describe('when created from options with a fallback of a base button appearance', () => {
        let buttonType: ButtonType;

        beforeEach(() => {
            const options = {
                color: 'secondary',
                dark: false
            };
            const base = new ButtonType({
                color: 'primary',
                dark: true,
                depressed: true,
                rounded: true,
                light: true,
                tile: true
            });
            buttonType = new ButtonType(options, base);
        });

        test('it applies the options on top of the base button appearance', () => {
            expect(buttonType.color).toBe('secondary');
            expect(buttonType.dark).toBe(false);
            expect(buttonType.depressed).toBe(true);
            expect(buttonType.light).toBe(true);
            expect(buttonType.rounded).toBe(true);
            expect(buttonType.tile).toBe(true);
        });
    });
});
