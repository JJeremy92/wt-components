import { computed, inject, ComputedRef } from 'vue';
import Theme from '../../theme';
import { useWtgUi } from '../global';

export const useTheme = () => {
    const $wtgUi = useWtgUi();

    const theme = computed<Theme>(() => {
        return $wtgUi.theme;
    });

    const darkMode = inject<ComputedRef<boolean>>('darkMode') ?? $wtgUi.dark;

    const resolveColor = (color: string): string | undefined => {
        let result = color;
        switch (color) {
            case 'primary':
                result = 'var(--s-primary-700)';
                break;
        }
        return result;
    };

    return { darkMode, theme, resolveColor };
};
