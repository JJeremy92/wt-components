import AutoNumeric, { DigitalGroupSpacingOption } from 'autonumeric';
import { Locale } from '../../../language/locale/types';

export default function autoNumericOptionsFromLocale(
    locale: Locale,
    {
        decimals = 0,
        noDigitGrouping = false,
        maxValue = undefined,
        minValue = undefined,
        suppressTrailingZeroes = false,
        zeroWhenEmpty = false,
    }: {
        decimals?: number;
        maxValue?: number | string;
        minValue?: number | string;
        noDigitGrouping?: boolean;
        suppressTrailingZeroes?: boolean;
        zeroWhenEmpty?: boolean;
    } = {}
): AutoNumeric.Options {
    const options: AutoNumeric.Options = { leadingZero: 'deny', showWarnings: false };

    options.decimalCharacter = locale.decimalCharacter;
    options.decimalPlaces = decimals;

    if (noDigitGrouping) {
        options.digitGroupSeparator = '';
    } else {
        options.digitGroupSeparator = locale.digitGroupSeparator;
        options.digitalGroupSpacing = locale.digitalGroupSpacing as DigitalGroupSpacingOption;
    }

    // Need to have both onInvalidPaste = 'clamp' and overrideMinMaxLimits ='ignore' because there
    // is no way currently to get autoNumeric to not throw an error and still limit the value.
    options.onInvalidPaste = 'clamp';
    options.overrideMinMaxLimits = 'ignore';

    const minValueNumber = tryParseNumber(minValue);
    if (minValueNumber !== undefined)
    {
        options.minimumValue = minValueNumber.toString();
    }

    const maxValueNumber = tryParseNumber(maxValue);
    if (maxValueNumber !== undefined)
    {
        options.maximumValue = maxValueNumber.toString();
    }

    if (suppressTrailingZeroes) {
        options.allowDecimalPadding = false;
    }

    if (zeroWhenEmpty) {
        options.emptyInputBehavior = 'zero';
    }

    return options;
}

function tryParseNumber(value? : number | string) : number | undefined
{
    if (value != null && value !== '') {
        const valueAsNumber = Number(value);
        if (!isNaN(valueAsNumber))
        {
            return valueAsNumber;
        }
    }
    return undefined;
}