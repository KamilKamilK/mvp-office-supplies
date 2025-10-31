<template>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-12 col-md-3">
                <Sidebar />
            </aside>

            <div class="col-12 col-md-9">
                <Catalog />
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
};
</script>
