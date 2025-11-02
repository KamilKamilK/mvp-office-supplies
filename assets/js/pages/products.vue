<template>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-12 col-md-3">
                <sidebar :collapsed="sidebarCollapsed" @toggle-collapsed="toggleSidebarCollapsed" />
            </aside>

            <div class="col-12 col-md-9">
                <catalog />
            </div>
        </div>
    </div>
</template>

<script>
import Catalog from '@/components/catalog.vue';
import Sidebar from '@/components/sidebar.vue';

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
    methods: {
        toggleSidebarCollapsed() {
            this.sidebarCollapsed = !this.sidebarCollapsed;
        },
    },
};
</script>
