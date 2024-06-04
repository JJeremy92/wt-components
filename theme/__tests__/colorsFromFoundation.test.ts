import { colorsFromFoundation } from '../colorsFromFoundation';
import { FoundationOptions } from '../colors/types';

const foundationLight: FoundationOptions = {
    primary: '#100001',
    success: '#100002',
    info: '#100003',
    warning: '#100004',
    critical: '#100005',
    secondary: '#100006',
    accent: '#100007',
};

const foundationDark = {
    primary: '#1D0001',
    success: '#1D0002',
    info: '#1D0003',
    warning: '#1D0004',
    critical: '#1D0005',
    secondary: '#1D0006',
    accent: '#1D0007',
};

describe('colorsFromFoundation', () => {
    test(`it maps foundation colors to theme colors`, () => {
        const { light, dark } = colorsFromFoundation(foundationLight, foundationDark);
        expect(light).toEqual(foundationLight);
        expect(dark).toEqual(foundationDark);
    });
});
