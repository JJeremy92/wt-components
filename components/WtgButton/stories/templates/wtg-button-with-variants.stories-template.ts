export const ButtonWithVariantsTemplate = `
<div style="flex: 1 1 100%; display: flex; flex-wrap: wrap; margin-top: 2em; gap: 8px" 
    v-for="type in ['default', 'primary', 'ghost']"
    :set="variant = type === 'default' || type === 'disabled' ? '' : type"
    :set2="datatest = 'testButton-' + variant">
    <wtg-button 
        v-bind="args"
        :variant="variant"
        :data-testid="datatest"
        @click="action">
            {{args.caption}}
    </wtg-button>
    <wtg-button 
        v-bind="args"
        :variant="variant"
        sentiment="success"
        :data-testid="datatest"
        @click="action">
            {{args.caption}}
    </wtg-button>
    <wtg-button 
        v-bind="args"
        :variant="variant"
        sentiment="error"
        :data-testid="datatest"
        @click="action">
            {{args.caption}}
    </wtg-button>
</div>`;
