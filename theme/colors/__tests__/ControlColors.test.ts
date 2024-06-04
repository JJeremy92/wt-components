import ControlColors from '../ControlColors';

describe('ControlColors', () => {
    describe('when created without information', () => {
        let colors: ControlColors;

        beforeEach(() => {
            colors = new ControlColors();
        });

        test('it has icon color information that is empty', () => {
            expect(colors.icon.color).toBeUndefined();
        });

        test('it has data-table color information that is empty', () => {
            expect(colors.dataTable.zebraStripeBackground).toBeUndefined();
        });

        test('it has panel color information that is empty', () => {
            expect(colors.panel.caption).toBeUndefined();
        });
    });

    describe('when created from options', () => {
        let colors: ControlColors;

        beforeEach(() => {
            const options = {
                icon: {
                    color: '#000001',
                },
                dataTable: {
                    zebraStripeBackground: '#100001',
                },
                panel: {
                    caption: '#200002',
                },
            };
            colors = new ControlColors(options);
        });

        test('it passes the color options to the color information', () => {
            expect(colors.icon.color).toBe('#000001');
            expect(colors.dataTable.zebraStripeBackground).toBe('#100001');
            expect(colors.panel.caption).toBe('#200002');
        });
    });

    describe('when created from base control color information', () => {
        let colors: ControlColors;

        beforeEach(() => {
            const base = new ControlColors({
                icon: {
                    color: '#000001',
                },
                dataTable: {
                    zebraStripeBackground: '#100001',
                },
                panel: {
                    caption: '#200002',
                },
            });
            colors = new ControlColors({}, base);
        });

        test('it uses the base color information to construct the color information', () => {
            expect(colors.icon.color).toBe('#000001');
            expect(colors.dataTable.zebraStripeBackground).toBe('#100001');
            expect(colors.panel.caption).toBe('#200002');
        });
    });

    describe('when created from options with a fallback of base control color information', () => {
        let colors: ControlColors;

        beforeEach(() => {
            const options = {
                icon: {
                    color: '#000001',
                },
                dataTable: {
                    zebraStripeBackground: '#100001',
                },
                panel: {
                    caption: '#200002',
                },
            };
            const base = new ControlColors({
                icon: {
                    color: '#A00001',
                },
                dataTable: {
                    zebraStripeBackground: '#A00001',
                },
                panel: {
                    caption: '#B00001',
                },
            });
            colors = new ControlColors(options, base);
        });

        test('it constructs the color information by applying the options on top of the base color information', () => {
            expect(colors.icon.color).toBe('#000001');
            expect(colors.dataTable.zebraStripeBackground).toBe('#100001');
            expect(colors.panel.caption).toBe('#200002');
        });
    });
});
