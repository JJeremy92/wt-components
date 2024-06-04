<template>
    <v-navigation-drawer :width="isCollapsed ? 84 : 248" style="border: none; background-color: transparent">
        <div class="wts-navigation" :style="isCollapsed ? 'width: 84px; transition: width 0.2s' : ''">
            <div class="container">
                <div class="header">
                    <img
                        v-if="!isCollapsed"
                        :src="cargowiseLogoDark"
                        style="max-width: 168px"
                        height="44"
                        class="logo"
                    />
                    <div class="nav-button" @click="() => (isCollapsed = !isCollapsed)">
                        <div class="container">
                            <wtg-icon
                                :icon="isCollapsed ? '$drawer-open' : '$drawer-close'"
                                style="color: var(--s-brand-icon-inv-default)"
                            />
                        </div>
                    </div>
                </div>
                <wtg-navigation-portalswitch :is-collapsed="isCollapsed" :portal-code="portalCode" :title="title" />
                <div class="navigation">
                    <slot />
                </div>
                <wtg-navigation-settings :is-collapsed="isCollapsed" />
            </div>
        </div>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import cargowiseLogoDark from '../../assets/cargowise-logo-dark.svg';
import { VNavigationDrawer } from 'vuetify/components/VNavigationDrawer';
import WtgNavigationPortalswitch from './WtgNavigationPortalswtich/WtgNavigationPortalswitch.vue';
import WtgNavigationSettings from './WtgNavigationSettings/WtgNavigationSettings.vue';
import { WtgIcon } from '..';
import { ref } from 'vue';

const isCollapsed = ref(true);
defineProps({
    portalCode: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
});
</script>

<style lang="scss">
.wts-navigation {
    display: inline-flex;
    padding: var(--padding-M, 8px) var(--padding-XL, 16px) var(--padding-M, 8px) var(--padding-M, 8px);
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 16px);
    align-items: stretch;
    width: 248px;

    > .container {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        border-radius: var(--radius-M, 8px);
        border: 1px solid var(--brand-border-weak-default, rgba(77, 88, 235, 0.5));
        background: var(--brand-bg-default, #371ee1);
        > .header {
            display: flex;
            padding: var(--padding-XL, 16px);
            justify-content: space-between;
            align-items: center;
            align-self: stretch;
            border-bottom: 1px solid var(--brand-border-weak-default, rgba(77, 88, 235, 0.5));
            > .logo {
                display: flex;
                width: 94px;
                height: 19.885px;
                justify-content: center;
                align-items: center;
            }
            > .nav-button {
                display: flex;
                padding: var(--spacing-S, 4px);
                justify-content: center;
                align-items: center;
                gap: var(--spacing-XS, 2px);
                border-radius: var(--radius-S, 4px);
                cursor: pointer;

                > .container {
                    display: flex;
                    padding: var(--padding-XS, 2px);
                    justify-content: center;
                    align-items: center;
                }
            }
        }
        > .navigation {
            display: flex;
            padding: var(--padding-XL, 16px);
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-M, 8px);
            flex: 1 0 0;
            align-self: stretch;
        }
    }
}
</style>
