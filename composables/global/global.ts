import WtgUi, { $wtgUi } from '../../WtgUi';
import { reactive } from 'vue';

export const useWtgUi: any = () => {
    return $wtgUi ?? reactive(new WtgUi());
};
