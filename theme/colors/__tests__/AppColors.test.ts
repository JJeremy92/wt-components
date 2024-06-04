import AppColors from '../AppColors';

describe('AppColors', () => {
    describe('when created without information', () => {
        let colors: AppColors;

        beforeEach(() => {
            colors = new AppColors();
        });

        test('it does not define a background color', () => {
            expect(colors.background).toBeUndefined();
        });

        test('it does not define a contentBackground color', () => {
            expect(colors.contentBackground).toBeUndefined();
        });

        test('it does not define a color', () => {
            expect(colors.color).toBeUndefined();
        });

        test('it has app-bar color information that is empty', () => {
            expect(colors.appBar.background).toBeUndefined();
        });

        test('it has footer color information that is empty', () => {
            expect(colors.footer.background).toBeUndefined();
        });

        test('it has navigation-drawer color information that is empty', () => {
            expect(colors.navigationDrawer.background).toBeUndefined();
        });
    });

    describe('when created from options', () => {
        let colors: AppColors;

        beforeEach(() => {
            const options = {
                background: '#FEFEFE',
                contentBackground: '#EFEFEF',
                color: '#EEEEEE',
                appBar: {
                    background: '#000000',
                },
                footer: {
                    background: '#100000',
                },
                navigationDrawer: {
                    background: '#FFFFFF',
                },
            };
            colors = new AppColors(options);
        });

        test('it takes the background color from the options', () => {
            expect(colors.background).toBe('#FEFEFE');
        });

        test('it takes the contentBackground color from the options', () => {
            expect(colors.contentBackground).toBe('#EFEFEF');
        });

        test('it takes the color from the options', () => {
            expect(colors.color).toBe('#EEEEEE');
        });

        test('it passes the appBar options to the app-bar color information', () => {
            expect(colors.appBar.background).toBe('#000000');
        });

        test('it passes the footer options to the footer color information', () => {
            expect(colors.footer.background).toBe('#100000');
        });

        test('it passes the navigationDrawer options to the navigation-drawer color information', () => {
            expect(colors.navigationDrawer.background).toBe('#FFFFFF');
        });
    });

    describe('when created from base app color information', () => {
        let colors: AppColors;

        beforeEach(() => {
            const base = new AppColors({
                background: '#FEFEFE',
                contentBackground: '#EFEFEF',
                color: '#EEEEEE',
                appBar: {
                    background: '#000000',
                },
                footer: {
                    background: '#100000',
                },
                navigationDrawer: {
                    background: '#FFFFFF',
                },
            });
            colors = new AppColors({}, base);
        });

        test('it takes the background color from the base colors', () => {
            expect(colors.background).toBe('#FEFEFE');
        });

        test('it takes the contentBackground color from the base colors', () => {
            expect(colors.contentBackground).toBe('#EFEFEF');
        });

        test('it takes the color from the base colors', () => {
            expect(colors.color).toBe('#EEEEEE');
        });

        test('it uses the base app-bar color information to construct the app-bar color information', () => {
            expect(colors.appBar.background).toBe('#000000');
        });

        test('it uses the base footer color information to construct the footer color information', () => {
            expect(colors.footer.background).toBe('#100000');
        });

        test('it uses the base navigation-drawer color information to construct the navigation-drawer color information', () => {
            expect(colors.navigationDrawer.background).toBe('#FFFFFF');
        });
    });

    describe('when created from options with a fallback of base app color information', () => {
        let colors: AppColors;

        beforeEach(() => {
            const options = {
                background: '#FEFEFE',
                contentBackground: '#EFEFEF',
                color: '#EEEEEE',
                appBar: {
                    background: '#000000',
                },
                footer: {
                    background: '#100000',
                },
                navigationDrawer: {
                    background: '#FFFFFF',
                },
            };
            const base = new AppColors({
                background: '#FDFDFD',
                contentBackground: '#DFDFDF',
                color: '#DDDDDD',
                appBar: {
                    background: '#000001',
                    dark: true,
                },
                footer: {
                    background: '#100001',
                    dark: true,
                },
                navigationDrawer: {
                    background: '#FFFFFE',
                    dark: false,
                },
            });
            colors = new AppColors(options, base);
        });

        test('it takes the background color from the options over the background from base colors', () => {
            expect(colors.background).toBe('#FEFEFE');
        });

        test('it takes the contentBackground color from the options over the contentBackground from base colors', () => {
            expect(colors.contentBackground).toBe('#EFEFEF');
        });

        test('it takes the color from the options over the from base colors', () => {
            expect(colors.color).toBe('#EEEEEE');
        });

        test('it constructs the app-bar color information by applying the appBar options on top of the base app-bar color information', () => {
            expect(colors.appBar.background).toBe('#000000');
            expect(colors.appBar.dark).toBe(true);
        });

        test('it constructs the footer color information by applying the footer options on top of the base footer color information', () => {
            expect(colors.footer.background).toBe('#100000');
            expect(colors.footer.dark).toBe(true);
        });

        test('it constructs the navigation-drawer color information by applying the navigationDrawer options on top of the base navigation-drawer color information', () => {
            expect(colors.navigationDrawer.background).toBe('#FFFFFF');
            expect(colors.navigationDrawer.dark).toBe(false);
        });
    });
});
