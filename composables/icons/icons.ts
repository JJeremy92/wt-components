import iconsStyleCss from '../../styles/icons/icon.css';

const useIcons = (iconStyle = '') => {
    let iconsStyleStr = iconStyle === '' ? (iconsStyleCss as String) : iconStyle;
    let i = iconsStyleStr.indexOf('.s-icon');

    let endIndex = -1;
    const arrayIcons = [];

    while (i !== -1) {
        for (let j = i; j < iconsStyleStr.length; ++j) {
            if (iconsStyleStr[j] === ':') {
                endIndex = j;
                break;
            }
        }

        const iconName = iconsStyleStr.substring(i, endIndex);
        iconsStyleStr = iconsStyleStr.substring(endIndex);
        i = iconsStyleStr.indexOf('.s-icon');
        arrayIcons.push(iconName);
    }

    return arrayIcons;
};

const useCanonicalIconsName = (iconStyle = '') => {
    const iconsName = useIcons(iconStyle);

    const iconsCanonicalNames = [] as string[];

    iconsName.forEach((iconName) => {
        const canonicalName = iconName.replace('.s-icon-', '');
        iconsCanonicalNames.push(canonicalName);
    });

    return iconsCanonicalNames;
};

const useFormattedIconsName = (iconStyle = '') => {
    const iconsName = useIcons(iconStyle);

    const iconsCanonicalNames = [] as string[];

    iconsName.forEach((iconName) => {
        const canonicalName = iconName.replace('.s-icon-', '$');
        iconsCanonicalNames.push(canonicalName);
    });

    return iconsCanonicalNames;
};

const useIconsNameAsStorybookLabel = (iconStyle = '') => {
    const iconsLabel: { [key: string]: string } = {};
    const formattedIconNames = useFormattedIconsName(iconStyle);
    const canonicalIconNames = useCanonicalIconsName(iconStyle);

    for (let i = 0; i < formattedIconNames.length; ++i) {
        iconsLabel[formattedIconNames[i]] = canonicalIconNames[i];
    }
    return iconsLabel;
};

export { useIcons, useCanonicalIconsName, useFormattedIconsName, useIconsNameAsStorybookLabel };
