import PanelColors from '../PanelColors';

describe('PanelColors', () => {
    describe('when created without information', () => {
        let panelColors: PanelColors;

        beforeEach(() => {
            panelColors = new PanelColors();
        });

        test('it does not define any caption information', () => {
            expect(panelColors.caption).toBeUndefined();
        });
    });

    describe('when created from options', () => {
        let panelColors: PanelColors;

        beforeEach(() => {
            const options = {
                caption: '#000000',
            };
            panelColors = new PanelColors(options, undefined);
        });

        test('it creates a definition for the given caption information', () => {
            expect(panelColors.caption).toBe('#000000');
        });
    });

    describe('when created from a base PanelColors', () => {
        let panelColors: PanelColors;

        beforeEach(() => {
            const base = new PanelColors({
                caption: '#000000',
            });
            panelColors = new PanelColors({}, base);
        });

        test('it creates a definition for the given caption information', () => {
            expect(panelColors.caption).toBe('#000000');
        });
    });

    describe('when created from options with a fallback of a base PanelColors', () => {
        let panelColors: PanelColors;

        beforeEach(() => {
            const options = {
                caption: '#000001',
            };
            const base = new PanelColors({
                caption: '#000000',
            });
            panelColors = new PanelColors(options, base);
        });

        test('it applies the options on top of the base PanelColors', () => {
            expect(panelColors.caption).toBe('#000001');
        });
    });
});
