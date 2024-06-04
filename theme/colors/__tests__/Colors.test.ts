import Colors from '../Colors';

describe('Colors', () => {
    describe('when created without information', () => {
        let colors: Colors;

        beforeEach(() => {
            colors = new Colors();
        });

        test('it has light variant that is empty', () => {
            expect(colors.light.primary).toBe('');
        });

        test('it has a dark variant that is empty', () => {
            expect(colors.dark.primary).toBe('');
        });

        test('it can serialize its state into Vuetify theme options', () => {
            expect(colors.toVuetifyOptions()).toEqual({
                dark: {
                    colors: {
                        accent: '',
                        error: '',
                        info: '',
                        messageError: '',
                        primary: '',
                        secondary: '',
                        success: '',
                        warning: '',
                    },
                },
                light: {
                    colors: {
                        accent: '',
                        error: '',
                        info: '',
                        messageError: '',
                        primary: '',
                        secondary: '',
                        success: '',
                        warning: '',
                    },
                },
            });
        });
    });

    describe('when created from options', () => {
        let colors: Colors;

        beforeEach(() => {
            const options = {
                light: {
                    primary: '#000000',
                },
                dark: {
                    primary: '#FFFFFF',
                },
            };
            colors = new Colors(options);
        });

        test('it passes the light options to the light variant', () => {
            expect(colors.light.primary).toBe('#000000');
        });

        test('it passes the dark options to the dark variant', () => {
            expect(colors.dark.primary).toBe('#FFFFFF');
        });

        test('it can serialize its state into Vuetify theme options', () => {
            expect(colors.toVuetifyOptions()).toEqual({
                dark: {
                    colors: {
                        accent: '',
                        error: '',
                        info: '',
                        messageError: '',
                        primary: '#FFFFFF',
                        secondary: '',
                        success: '',
                        warning: '',
                    },
                },
                light: {
                    colors: {
                        accent: '',
                        error: '',
                        info: '',
                        messageError: '',
                        primary: '#000000',
                        secondary: '',
                        success: '',
                        warning: '',
                    },
                },
            });
        });
    });

    describe('when created from a base color', () => {
        let colors: Colors;

        beforeEach(() => {
            const base = new Colors({
                light: {
                    primary: '#000000',
                },
                dark: {
                    primary: '#FFFFFF',
                },
            });
            colors = new Colors({}, base);
        });

        test('it uses the base light variant to construct the light variant', () => {
            expect(colors.light.primary).toBe('#000000');
        });

        test('it uses the base dark variant to construct the dark variant', () => {
            expect(colors.dark.primary).toBe('#FFFFFF');
        });

        test('it can serialize its state into Vuetify theme options', () => {
            expect(colors.toVuetifyOptions()).toEqual({
                dark: {
                    colors: {
                        accent: '',
                        error: '',
                        info: '',
                        messageError: '',
                        primary: '#FFFFFF',
                        secondary: '',
                        success: '',
                        warning: '',
                    },
                },
                light: {
                    colors: {
                        accent: '',
                        error: '',
                        info: '',
                        messageError: '',
                        primary: '#000000',
                        secondary: '',
                        success: '',
                        warning: '',
                    },
                },
            });
        });
    });

    describe('when created from options with a fallback of a base color', () => {
        let colors: Colors;

        beforeEach(() => {
            const options = {
                light: {
                    primary: '#000000',
                },
                dark: {
                    primary: '#FFFFFF',
                },
            };
            const base = new Colors({
                light: {
                    primary: '#000001',
                },
                dark: {
                    primary: '#FFFFFE',
                },
            });
            colors = new Colors(options, base);
        });

        test('it constructs the light variant by applying the light options on top of the light base variant', () => {
            expect(colors.light.primary).toBe('#000000');
        });

        test('it constructs the dark variant by applying the dark options on top of the dark base variant', () => {
            expect(colors.dark.primary).toBe('#FFFFFF');
        });

        test('it can serialize its state into Vuetify theme options', () => {
            expect(colors.toVuetifyOptions()).toEqual({
                dark: {
                    colors: {
                        accent: '',
                        error: '',
                        info: '',
                        messageError: '',
                        primary: '#FFFFFF',
                        secondary: '',
                        success: '',
                        warning: '',
                    },
                },
                light: {
                    colors: {
                        accent: '',
                        error: '',
                        info: '',
                        messageError: '',
                        primary: '#000000',
                        secondary: '',
                        success: '',
                        warning: '',
                    },
                },
            });
        });
    });
});
