import WtgUi, { DarkModeType, DensityType, CurrentNotificationType } from './WtgUi';
import defaultTheme from './theme/presets/defaults';
import * as components from './components';
import { colorsFromFoundation } from './theme/colorsFromFoundation';

export * from './components';
export * from './language';
export * from './theme';

import './index.css';

export { DarkModeType, DensityType, CurrentNotificationType, colorsFromFoundation, components, defaultTheme };
export default WtgUi;
