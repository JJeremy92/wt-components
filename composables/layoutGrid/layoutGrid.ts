import { computed, h, useSlots, VNode } from 'vue';
import WtgLayoutGrid from '../../components/WtgLayoutGrid';

interface LayoutProps {
    flexAlign?: string;
    flexDirection?: string;
    flexJustify?: string;
    flexWrap?: string;
    layout?: string;
    noGutters?: boolean;
}

export const layoutProps = {
    flexAlign: {
        type: String,
        default: '',
    },
    flexDirection: {
        type: String,
        default: '',
    },
    flexJustify: {
        type: String,
        default: '',
    },
    flexWrap: {
        type: String,
        default: '',
    },
    layout: {
        type: String,
        default: '',
    },
    noGutters: {
        type: Boolean,
        default: false,
    },
};

export const layoutArgTypes = {
    flexAlign: {
        control: 'text',
    },
    flexDirection: {
        control: 'text',
    },
    flexJustify: {
        control: 'text',
    },
    flexWrap: {
        control: 'text',
    },
    layout: {
        control: 'text',
    },
    noGutters: {
        control: 'boolean',
    },
};

export const useLayout = (props: LayoutProps) => {
    const slots = useSlots();
    const layoutClasses = computed((): string[] => {
        const classes = [];

        switch (props.layout) {
            case 'flex': {
                classes.push('d-flex');

                if (props.flexAlign) {
                    classes.push(props.flexAlign);
                }
                if (props.flexDirection) {
                    classes.push(props.flexDirection);
                }
                if (props.flexJustify) {
                    classes.push(props.flexJustify);
                }
                if (props.flexWrap) {
                    classes.push(props.flexWrap);
                }

                break;
            }
        }
        return classes;
    });
    const renderContent = (): VNode[] | undefined => {
        return props.layout === 'grid'
            ? [
                  h(
                      WtgLayoutGrid,
                      {
                          noGutters: props.noGutters,
                      },
                      slots?.default && slots.default()
                  ),
              ]
            : slots?.default && slots.default();
    };

    return { layoutClasses, renderContent };
};

export const makeViewportHeightStyle = () => {
    return {
        height: `max(100vh, 200px)`,
    };
};

export const makeFitToDialogHeightStyles = () => {
    return {
        display: 'flex',
        flexDirection: 'column',
        height: '75vh',
    };
};

export const makeFitToViewportHeightStyles = () => {
    return {
        ...makeViewportHeightStyle(),
        display: 'flex',
        flexDirection: 'column',
    };
};
