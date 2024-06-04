import { isGuid } from '../stringHelper';

describe('stringHelper', () => {
    test.each([
        ['', false],
        ['c9a96493-2a61-43ef-b88e-6ce7edd41de8', true],
        ['E1D74458-379E-4CF3-9F23-F897601E98D8', true],
        ['E1D74458-379E-4CF3-9F23', false],
        ['XXXX', false],
        ['9999', false],
    ])('when value is "%s", %s should be expected', (value, expected) => {
        expect(isGuid(value)).toBe(expected);
    });
});
