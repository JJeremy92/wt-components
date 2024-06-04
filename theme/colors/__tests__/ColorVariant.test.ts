import ColorVariant from '../ColorVariant';

const options = {
    primary: '#000000',
    secondary: '#000001',
    accent: '#000002',
    critical: '#000003',
    info: '#000004',
    success: '#000005',
    warning: '#000006',
    messageError: '#000007',
    app: {
        background: '#000007',
        contentBackground: '#000008',
        appBar: {
            background: '#000009',
        },
    },
    controls: {
        icon: {
            color: '#00000A',
        },
        panel: {
            caption: '#00000B',
        },
    },
};

describe('ColorVariant', () => {
    describe('when created without information', () => {
        let variant: ColorVariant;

        beforeEach(() => {
            variant = new ColorVariant();
        });

        test('it does not define any colors', () => {
            expect(variant.primary).toBe('');
            expect(variant.secondary).toBe('');
            expect(variant.accent).toBe('');
            expect(variant.error).toBe('');
            expect(variant.info).toBe('');
            expect(variant.success).toBe('');
            expect(variant.warning).toBe('');
        });

        test('it has app color information that is empty', () => {
            expect(variant.app.background).toBeUndefined();
            expect(variant.app.contentBackground).toBeUndefined();
        });

        test('it has appBar color information that is empty', () => {
            expect(variant.app.appBar.background).toBeUndefined();
        });

        test('it has control color information that is empty', () => {
            expect(variant.controls.icon.color).toBeUndefined();
        });

        test('it can serialize its colors into Vuetify theme color variant options', () => {
            expect(variant.toVuetifyOptions()).toEqual({
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
            });
        });
    });

    describe('when created from options', () => {
        let variant: ColorVariant;

        beforeEach(() => {
            variant = new ColorVariant(options, undefined);
        });

        test('it creates a definition for the given colors', () => {
            expect(variant.primary).toBe('#000000');
            expect(variant.secondary).toBe('#000001');
            expect(variant.accent).toBe('#000002');
            expect(variant.error).toBe('#000003');
            expect(variant.info).toBe('#000004');
            expect(variant.success).toBe('#000005');
            expect(variant.warning).toBe('#000006');
        });

        test('it passes the app options to the app color information', () => {
            expect(variant.app.background).toBe('#000007');
            expect(variant.app.contentBackground).toBe('#000008');
        });

        test('it passes the appBar options to the appBar color information', () => {
            expect(variant.app.appBar.background).toBe('#000009');
        });

        test('it passes the control options to the controls color information', () => {
            expect(variant.controls.icon.color).toBe('#00000A');
        });

        test('it can serialize its colors into Vuetify theme color variant options', () => {
            expect(variant.toVuetifyOptions()).toEqual({
                colors: {
                    primary: '#000000',
                    secondary: '#000001',
                    accent: '#000002',
                    error: '#000003',
                    info: '#000004',
                    success: '#000005',
                    warning: '#000006',
                    messageError: '#000006',
                },
            });
        });
    });

    describe('when created from a base color variant', () => {
        let variant: ColorVariant;

        beforeEach(() => {
            const base = new ColorVariant({
                primary: '#000000',
                secondary: '#000001',
                accent: '#000002',
                critical: '#000003',
                info: '#000004',
                success: '#000005',
                warning: '#000006',
                messageError: '#000007',

                app: {
                    background: '#000007',
                    contentBackground: '#000008',
                    appBar: {
                        background: '#000009',
                    },
                },
                controls: {
                    icon: {
                        color: '#00000A',
                    },
                },
            });
            variant = new ColorVariant({}, base);
        });

        test('it creates a definition for the given colors', () => {
            expect(variant.primary).toBe('#000000');
            expect(variant.secondary).toBe('#000001');
            expect(variant.accent).toBe('#000002');
            expect(variant.error).toBe('#000003');
            expect(variant.info).toBe('#000004');
            expect(variant.success).toBe('#000005');
            expect(variant.warning).toBe('#000006');
        });

        test('it passes the app options to the app color information', () => {
            expect(variant.app.background).toBe('#000007');
            expect(variant.app.contentBackground).toBe('#000008');
        });

        test('it passes the appBar options to the app color information', () => {
            expect(variant.app.appBar.background).toBe('#000009');
        });

        test('it passes the control options to the controls color information', () => {
            expect(variant.controls.icon.color).toBe('#00000A');
        });

        test('it can serialize its colors into Vuetify theme color variant options', () => {
            expect(variant.toVuetifyOptions()).toEqual({
                colors: {
                    primary: '#000000',
                    secondary: '#000001',
                    accent: '#000002',
                    error: '#000003',
                    info: '#000004',
                    success: '#000005',
                    warning: '#000006',
                    messageError: '#000006',
                },
            });
        });
    });

    describe('when created from options with a fallback of a base color variant', () => {
        let variant: ColorVariant;

        beforeEach(() => {
            const options = {
                primary: '#EEE000',
                critical: '#EEE003',
                warning: '#EEE006',
                messageError: '#EEE00B',

                app: {
                    background: '#EEE007',
                    contentBackground: '#EEE008',
                    appBar: {
                        background: '#EEE009',
                    },
                },
                controls: {
                    icon: {
                        color: '#EEE00A',
                    },
                },
            };
            const base = new ColorVariant({
                primary: '#DDD000',
                secondary: '#DDD001',
                accent: '#DDD002',
                critical: '#DDD003',
                info: '#DDD004',
                success: '#DDD005',
                warning: '#DDD006',
                messageError: '#DDD00C',

                app: {
                    background: '#DDD007',
                    contentBackground: '#DDD008',
                    appBar: {
                        background: '#DDD009',
                    },
                    navigationDrawer: {
                        background: '#DDD00A',
                    },
                },
                controls: {
                    icon: {
                        color: '#DDD00B',
                    },
                },
            });
            variant = new ColorVariant(options, base);
        });

        test('it applies the options on top of the base color variant', () => {
            expect(variant.primary).toBe('#EEE000');
            expect(variant.secondary).toBe('#DDD001');
            expect(variant.accent).toBe('#DDD002');
            expect(variant.error).toBe('#EEE003');
            expect(variant.info).toBe('#DDD004');
            expect(variant.success).toBe('#DDD005');
            expect(variant.warning).toBe('#EEE006');
        });

        test('it constructs the app color information by applying the app options on top of the base app color information', () => {
            expect(variant.app.appBar.background).toBe('#EEE009');
            expect(variant.app.navigationDrawer.background).toBe('#DDD00A');
        });

        test('it constructs the controls color information by applying the control options on top of the base control color information', () => {
            expect(variant.controls.icon.color).toBe('#EEE00A');
        });

        test('it can serialize its colors into Vuetify theme color variant options', () => {
            expect(variant.toVuetifyOptions()).toEqual({
                colors: {
                    primary: '#EEE000',
                    secondary: '#DDD001',
                    accent: '#DDD002',
                    error: '#EEE003',
                    info: '#DDD004',
                    messageError: '#EEE006',
                    success: '#DDD005',
                    warning: '#EEE006',
                },
            });
        });
    });
});
