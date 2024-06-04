import Theme from '../Theme';
import { ThemeOptions } from '../types';

describe('Theme', () => {
    describe('when created without information', () => {
        let theme: Theme;

        beforeEach(() => {
            theme = new Theme();
        });

        test('it has an options object that is empty', () => {
            expect(theme.options).toStrictEqual({});
        });

        test('it has a colors object that is empty', () => {
            expect(theme.colors.light.primary).toBe('');
        });

        test('it has logo properties that are empty', () => {
            expect(theme.logoLightImage).toBe('');
            expect(theme.logoDarkImage).toBe('');
        });

        test('it has a supply version which defaultd to 0', () => {
            expect(theme.supplyVersion).toBe(0);
        });

        test('it can serialize its state into Vuetify theme options', () => {
            expect(theme.toVuetifyOptions()).toEqual({
                themes: {
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
                },
            });
        });
    });

    describe('when created from options', () => {
        let theme: Theme;
        let options: ThemeOptions;

        beforeEach(() => {
            options = {
                supplyVersion: 0.5,
                logoLightImage: 'dummyLightLogo',
                logoDarkImage: 'dummyDarkLogo',
                colors: {
                    light: {
                        primary: '#000001',
                    },
                    dark: {
                        primary: '#FFFFFE',
                    },
                },
            };
            theme = new Theme(options);
        });

        test('it has an options object that contains the original passed in options', () => {
            expect(theme.options).toStrictEqual(options);
        });

        test('it has applied the color options', () => {
            expect(theme.colors.light.primary).toBe('#000001');
            expect(theme.colors.dark.primary).toBe('#FFFFFE');
        });

        test('it has applied the logo options', () => {
            expect(theme.logoLightImage).toBe('dummyLightLogo');
            expect(theme.logoDarkImage).toBe('dummyDarkLogo');
        });

        test('it has applied the supply version options', () => {
            expect(theme.supplyVersion).toBe(0.5);
        });

        test('it can serialize its state into Vuetify theme options', () => {
            expect(theme.toVuetifyOptions()).toEqual({
                themes: {
                    dark: {
                        colors: {
                            accent: '',
                            error: '',
                            info: '',
                            messageError: '',
                            primary: '#FFFFFE',
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
                            primary: '#000001',
                            secondary: '',
                            success: '',
                            warning: '',
                        },
                    },
                },
            });
        });
    });

    describe('when created from a base theme', () => {
        let theme: Theme;

        beforeEach(() => {
            const base = new Theme({
                supplyVersion: 0.5,
                logoLightImage: 'dummyLightLogo',
                logoDarkImage: 'dummyDarkLogo',
                colors: {
                    light: {
                        primary: '#000001',
                    },
                    dark: {
                        primary: '#FFFFFE',
                    },
                },
            });
            theme = new Theme({}, base);
        });

        test('it has applied the color options', () => {
            expect(theme.colors.light.primary).toBe('#000001');
            expect(theme.colors.dark.primary).toBe('#FFFFFE');
        });

        test('it has applied the logo options', () => {
            expect(theme.logoLightImage).toBe('dummyLightLogo');
            expect(theme.logoDarkImage).toBe('dummyDarkLogo');
        });

        test('it has applied the supply version options', () => {
            expect(theme.supplyVersion).toBe(0.5);
        });

        test('it can serialize its state into Vuetify theme options', () => {
            expect(theme.toVuetifyOptions()).toEqual({
                themes: {
                    dark: {
                        colors: {
                            accent: '',
                            error: '',
                            info: '',
                            messageError: '',
                            primary: '#FFFFFE',
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
                            primary: '#000001',
                            secondary: '',
                            success: '',
                            warning: '',
                        },
                    },
                },
            });
        });
    });

    describe('when created from options with a fallback of a base theme', () => {
        let theme: Theme;

        beforeEach(() => {
            const options = {
                supplyVersion: 0.5,
                logoLightImage: 'dummyLightLogo',
                logoDarkImage: 'dummyDarkLogo',
                colors: {
                    light: {
                        primary: '#000011',
                    },
                    dark: {
                        primary: '#FFFFEE',
                    },
                },
            };
            const base = new Theme({
                supplyVersion: 0,
                logoLightImage: 'baseDummyLightLogo',
                logoDarkImage: 'baseDummyDarkLogo',
                colors: {
                    light: {
                        primary: '#000001',
                        secondary: '#000002',
                    },
                    dark: {
                        primary: '#FFFFFE',
                        secondary: '#FFFFFD',
                    },
                },
            });
            theme = new Theme(options, base);
        });

        test('it has applied the color options on top of the base color options', () => {
            expect(theme.colors.light.primary).toBe('#000011');
            expect(theme.colors.light.secondary).toBe('#000002');
            expect(theme.colors.dark.primary).toBe('#FFFFEE');
            expect(theme.colors.dark.secondary).toBe('#FFFFFD');
        });

        test('it has applied the logo options on top of the base logo options', () => {
            expect(theme.logoLightImage).toBe('dummyLightLogo');
            expect(theme.logoDarkImage).toBe('dummyDarkLogo');
        });

        test('it has applied the supply version options on top of the base supply version options', () => {
            expect(theme.supplyVersion).toBe(0.5);
        });

        test('it can serialize its state into Vuetify theme options', () => {
            expect(theme.toVuetifyOptions()).toEqual({
                themes: {
                    dark: {
                        colors: {
                            accent: '',
                            error: '',
                            info: '',
                            messageError: '',
                            primary: '#FFFFEE',
                            secondary: '#FFFFFD',
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
                            primary: '#000011',
                            secondary: '#000002',
                            success: '',
                            warning: '',
                        },
                    },
                },
            });
        });
    });
});
