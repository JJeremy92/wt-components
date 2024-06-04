export const expander = `
<wtg-expander style="width: 390px;" :variant="args.variant" :multiple="args.multiple" :mandatory="args.mandatory" :value="args.value" @change="onChange">
    <wtg-expansion-panel :disabled="args.disabled">
        <wtg-expansion-panel-header :title="args.title" :description="args.description" :leading-icon="args.leadingIcon"/>
        <wtg-expansion-panel-content> <div style="font: var(--s-body)"> {{ args.content }} </div> </wtg-expansion-panel-content>
    </wtg-expansion-panel>
    <wtg-expansion-panel title="Title Only">
        <wtg-expansion-panel-header title="Title Only" />
        <wtg-expansion-panel-content><div style="font: var(--s-body)">Small content</div></wtg-expansion-panel-content>
    </wtg-expansion-panel>
    <wtg-expansion-panel>
        <wtg-expansion-panel-header>
            <div style="flex-grow: 1; font: var(--s-title); display: flex; align-items: center; gap: 8px;">
            <wtg-badge type="success"/>
            <div>Custom header</div>
            </div>
        </wtg-expansion-panel-header>
        <wtg-expansion-panel-content>
        <div style="align-self: stretch; padding: 8px;">
            <div style="font: var(--s-title);">Delivery progress</div>
            <wtg-checkbox label="Shipped"/>
            <wtg-checkbox label="Arrived at destination port"/>
            <wtg-checkbox label="Delivered to customer"/>
            <div style="display: flex; justify-content: space-between; padding-top: 8px;">
                <wtg-button variant="primary">Save</wtg-button>
                <wtg-button >Cancel</wtg-button>
            </div>
        </div>
        </wtg-expansion-panel-content>
    </wtg-expansion-panel>
    <wtg-expansion-panel disabled >
        <wtg-expansion-panel-header title="Disabled" leading-icon="$help" description="Disabled Expansion Panel"/>
        <wtg-expansion-panel-content>
            <div style="font: var(--s-body)">{{ args.content }}</div>
        </wtg-expansion-panel-content>
    </wtg-expansion-panel>
</wtg-expander>`;
