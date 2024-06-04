export const ButtonWithIconsTemplate = `
<div style="flex: 1 1 100%; display: flex; flex-wrap: wrap; margin-top: 2em; gap: 8px" 
    v-for="type in ['default', 'primary', 'ghost']"
    :set="variant = type === 'default' || type === 'disabled' ? '' : type">
    <wtg-button 
        v-bind="args"
        :variant="variant"
        :leading-icon="args.icon" 
        @click="action">
            {{args.caption}}
    </wtg-button>
    <wtg-button 
        v-bind="args"
        :variant="variant"
        :trailing-icon="args.icon" 
        @click="action">
            {{args.caption}}
    </wtg-button>
    <wtg-button 
        v-bind="args"
        :variant="variant"
        :leading-icon="args.icon" 
        :trailing-icon="args.icon" 
        @click="action">
            {{args.caption}}
    </wtg-button>
    <wtg-button 
        v-bind="args"
        :variant="variant"
        disabled
        :leading-icon="args.icon" 
        :trailing-icon="args.icon" 
        @click="action">
            {{args.caption}}
    </wtg-button>
</div>`;
