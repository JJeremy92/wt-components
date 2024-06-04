<template>
    <wtg-application title="Human resources" portal-code="HR">
        <div class="py-2 py-sm-4 px-2 px-sm-4" style="min-width: 300px; max-width: 1200px">
            <wtg-layout-grid>
                <wtg-panel columns="col-md-5">
                    <div class="mt-1 d-flex flex-column align-center justify-center">
                        <wtg-avatar icon="$user" class="rounded-circle" width="175" height="175" size="xl" />
                        <span style="font: var(--s-title)">Janette Doe</span>
                    </div>
                    <hr />
                    <span class="mt-4" style="font: var(--s-title)">Position</span>
                    <span style="font: var(--s-body)">User Experience Designer</span>
                    <span class="mt-4" style="font: var(--s-title)">Team</span>
                    <span style="font: var(--s-body)">Core</span>
                    <span class="mt-4" style="font: var(--s-title)">Home Branch</span>
                    <span style="font: var(--s-body)">Cargowise EDI - Quebec (CA)</span>
                    <wtg-button class="my-4" color="primary" outlined block>Edit my Profile </wtg-button>
                </wtg-panel>
                <wtg-layout-grid columns="col-md-7">
                    <wtg-panel caption="Upcoming Public Holidays">
                        <div v-for="holiday in holidays" :key="holiday.name">
                            <div style="display: flex; justify-content: space-between">
                                <span style="font: var(--s-body)">{{ holiday.name }}</span>
                                <span style="font: var(--s-body)">{{ holiday.date }}</span>
                            </div>
                        </div>
                    </wtg-panel>
                    <wtg-panel caption="My direct Reports" columns="col-lg-6">
                        <span style="font: var(--s-body)"> View and approve all pending leave of your team. </span>
                        <wtg-button class="my-4" color="primary" outlined columns="col-lg-6" block>
                            View leave
                        </wtg-button>
                    </wtg-panel>
                    <wtg-panel caption="Admin" columns="col-lg-6">
                        <span style="font: var(--s-body)">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </span>
                    </wtg-panel>
                </wtg-layout-grid>
                <wtg-panel caption="My Leave" columns="col-md-5">
                    <span style="font: var(--s-body)"> View your currently planned leave or apply for new leave. </span>
                    <wtg-layout-grid>
                        <wtg-button class="my-4" color="primary" outlined columns="col-lg-6" fill>
                            View leave
                        </wtg-button>
                        <wtg-button class="my-4" color="primary" outlined columns="col-lg-6" fill>Apply</wtg-button>
                    </wtg-layout-grid>
                </wtg-panel>
                <wtg-panel caption="Lorem ipsum dolor" columns="col-md-7">
                    <span style="font: var(--s-body)">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </span>
                </wtg-panel>
                <wtg-panel caption="Staff Lookup" columns="col-md-5">
                    <span style="font: var(--s-body)">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </span>
                    <wtg-text-field class="my-4" append-icon="mdi-magnify" />
                </wtg-panel>
                <wtg-panel caption="Lorem ipsum dolor" columns="col-md-7">
                    <span style="font: var(--s-body)">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </span>
                </wtg-panel>
                <wtg-panel caption="Lorem ipsum dolor" columns="col-md-5">
                    <span style="font: var(--s-body)">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </span>
                </wtg-panel>
            </wtg-layout-grid>
        </div>
    </wtg-application>
</template>

<script setup lang="ts">
import { WtgPanel } from '../components/WtgPanel';
import { WtgAvatar } from '../components';
import { WtgButton } from '../components';
import { WtgLayoutGrid } from '../components/WtgLayoutGrid';
import WtgApplication from './WtgApplication.vue';

const holidays = [
    {
        name: 'Labour Day',
        date: 'Mon, 3 Oct 2022',
    },
    {
        name: 'Christmas Day',
        date: '25-26 Dec 2022',
    },
    {
        name: 'Boxing Day',
        date: 'Mon, 26 Dec 2022',
    },
];
</script>
