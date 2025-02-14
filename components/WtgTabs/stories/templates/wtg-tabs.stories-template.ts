export const WtgTabsStoriesTemplate = `
<wtg-tabs v-bind="args" @tab-change="action">
    <wtg-tab label="Label 1">
        <div style="font-size: 1em; text-style: italic">
            <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
        </div>
    </wtg-tab>
    <wtg-tab label="Label 2" :hasNotification="true">
        <div>
            <dl>
                <dt>Definition list</dt>
                    <dd>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.</dd>
                <dt>Lorem ipsum dolor sit amet</dt>
                    <dd>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.</dd>
            </dl>
        </div>
    </wtg-tab>
    <wtg-tab label="Label 3" :number="4">
        <div>
            <ul style="margin-left: 16px;">
                <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                <li>Aliquam tincidunt mauris eu risus.</li>
                <li>Vestibulum auctor dapibus neque.</li>
                <li>Consectetur adipisicing elit.</li>
            </ul>        
        </div>
    </wtg-tab>
    <wtg-tab label="Label 4" :disabled="true">
    </wtg-tab>
</wtg-tabs>
`;
