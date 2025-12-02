<template>
    <div class="container-fluid">
        <div class="row">
            <aside :class="asideClass">
                <sidebar
                    :collapsed="sidebarCollapsed"
                    :current-category-id="currentCategoryId"
                    :categories="categories"
                    @toggle-collapsed="toggleSidebarCollapsed"
                />
            </aside>

            <div :class="contentClass">
                <catalog :current-category-id="currentCategoryId" :categories="categories" />
            </div>
        </div>
    </div>
</template>

<script>
import Catalog from '@/components/catalog.vue';
import Sidebar from '@/components/sidebar.vue';
import { getCurrentCategoryId } from '@/services/page-context';
import { getCategories } from '@/services/categories-service';

export default {
    name: 'Products',
    components: {
        Catalog,
        Sidebar,
    },
    data() {
        return {
            sidebarCollapsed: false,
            categories: [],
            currentCategoryId: getCurrentCategoryId(),
        };
    },
    computed: {
        asideClass() {
            return this.sidebarCollapsed ? 'col-12 col-md-1 aside-collapsed' : 'col-12 col-md-3';
        },
        contentClass() {
            return this.sidebarCollapsed ? 'col-12 col-md-11' : 'col-12 col-md-9';
        },
    },
    async created() {
        const response = await getCategories();

        this.categories = response.data['hydra:member'];
    },
    methods: {
        toggleSidebarCollapsed() {
            this.sidebarCollapsed = !this.sidebarCollapsed;
        },
    },
};
</script>
