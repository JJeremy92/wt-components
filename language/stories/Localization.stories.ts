import CaptionLocalizationStory from './CaptionLocalizationStory.vue';
import DateTimeLocalizationStory from './DateTimeLocalizationStory.vue';

const meta = {
    title: 'Guidelines/Language/Localization ',
    argTypes: {
        locale: {
            options: ['en-au', 'en-us', 'en-gb', 'ko', 'fr', 'nl'],
            control: { type: 'select' },
        },
    },
};
export default meta;
export const DateTime = {
    render: (args) => ({
        components: { DateTimeLocalizationStory },
        setup: () => ({
            args,
        }),
        template: '<DateTimeLocalizationStory v-bind="args"/>',
    }),
};
export const Caption = {
    render: (args) => ({
        components: { CaptionLocalizationStory },
        setup: () => ({
            args,
        }),
        template: '<CaptionLocalizationStory v-bind="args"/>',
    }),
};
