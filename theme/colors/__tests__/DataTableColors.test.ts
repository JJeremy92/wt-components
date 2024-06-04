import DataTableColors from '../DataTableColors';

describe('DataTableColors', () => {
    describe('when created without information', () => {
        let dataTableColors: DataTableColors;

        beforeEach(() => {
            dataTableColors = new DataTableColors();
        });

        test('it does not define any color information', () => {
            expect(dataTableColors.headerBackground).toBeUndefined();
            expect(dataTableColors.mouseOverBackground).toBeUndefined();
            expect(dataTableColors.selectionBackground).toBeUndefined();
            expect(dataTableColors.zebraStripeBackground).toBeUndefined();
        });
    });

    describe('when created from options', () => {
        let dataTableColors: DataTableColors;

        beforeEach(() => {
            const options = {
                headerBackground: '#000000',
                mouseOverBackground: '#000001',
                selectionBackground: '#000002',
                zebraStripeBackground: '#000003',
            };
            dataTableColors = new DataTableColors(options, undefined);
        });

        test('it creates a definition for the given color information', () => {
            expect(dataTableColors.headerBackground).toBe('#000000');
            expect(dataTableColors.mouseOverBackground).toBe('#000001');
            expect(dataTableColors.selectionBackground).toBe('#000002');
            expect(dataTableColors.zebraStripeBackground).toBe('#000003');
        });
    });

    describe('when created from a base DataTableColors', () => {
        let dataTableColors: DataTableColors;

        beforeEach(() => {
            const base = new DataTableColors({
                headerBackground: '#000000',
                mouseOverBackground: '#000001',
                selectionBackground: '#000002',
                zebraStripeBackground: '#000003',
            });
            dataTableColors = new DataTableColors({}, base);
        });

        test('it creates a definition for the given color information', () => {
            expect(dataTableColors.headerBackground).toBe('#000000');
            expect(dataTableColors.mouseOverBackground).toBe('#000001');
            expect(dataTableColors.selectionBackground).toBe('#000002');
            expect(dataTableColors.zebraStripeBackground).toBe('#000003');
        });
    });

    describe('when created from options with a fallback of a base DataTableColors', () => {
        let dataTableColors: DataTableColors;

        beforeEach(() => {
            const options = {
                headerBackground: '#000004',
                mouseOverBackground: '#000005',
                selectionBackground: '#000006',
                zebraStripeBackground: '#000007',
            };
            const base = new DataTableColors({
                headerBackground: '#000001',
                mouseOverBackground: '#000002',
                selectionBackground: '#000003',
                zebraStripeBackground: '#000004',
            });
            dataTableColors = new DataTableColors(options, base);
        });

        test('it applies the options on top of the base DataTableColors', () => {
            expect(dataTableColors.headerBackground).toBe('#000004');
            expect(dataTableColors.mouseOverBackground).toBe('#000005');
            expect(dataTableColors.selectionBackground).toBe('#000006');
            expect(dataTableColors.zebraStripeBackground).toBe('#000007');
        });
    });
});
