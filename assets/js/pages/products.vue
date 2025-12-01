<template>
    <div class="container-fluid">
        <div class="row">
            <aside :class="asideClass">
                <sidebar
                    :collapsed="sidebarCollapsed"
                    :current-category-id="currentCategoryId"
                    @toggle-collapsed="toggleSidebarCollapsed"
                />
            </aside>

            <div :class="contentClass">
                <catalog :current-category-id="currentCategoryId" />
            </div>
        </div>
    </div>
</template>

<script>
import Catalog from '@/components/catalog.vue';
import Sidebar from '@/components/sidebar.vue';
import { getCurrentCategoryId } from '../services/page-context';

export default {
    name: 'Products',
    components: {
        Catalog,
        Sidebar,
    },
    data() {
        return {
            sidebarCollapsed: false,
        };
    },
    computed: {
        asideClass() {
            return this.sidebarCollapsed ? 'col-12 col-md-1 aside-collapsed' : 'col-12 col-md-3';
        },
        contentClass() {
            return this.sidebarCollapsed ? 'col-12 col-md-11' : 'col-12 col-md-9';
        },
        currentCategoryId() {
            return getCurrentCategoryId();
        },
    },
    methods: {
        toggleSidebarCollapsed() {
            this.sidebarCollapsed = !this.sidebarCollapsed;
        },
    },
};
</script>
