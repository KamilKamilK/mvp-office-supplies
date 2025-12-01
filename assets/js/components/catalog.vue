<template>
    <div>
        <div class="row">
            <div class="col-12">
                <h1>Products</h1>
            </div>
        </div>
        <ProductList :products="products" :loading="loading" />
        <div class="row">
            <legend-component :title="legend" />
        </div>
    </div>
</template>

<script>
import LegendComponent from '@/components/legend.vue';
import axios from 'axios';
import ProductList from '@/components/product-list/index.vue';

export default {
    name: 'Catalog',
    components: { LegendComponent, ProductList },
    props: {
        currentCategoryId: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            products: [],
            loading: false,
            legend: "Shipping takes 10-12 weeks, and products probably won't work",
        };
    },
    async created() {
        const params = {};
        if (this.currentCategoryId) {
            params.category = this.currentCategoryId;
        }

        this.loading = true;

        let response;
        try {
            response = await axios.get('/api/products', { params });

            this.loading = false;

            this.products = response.data['hydra:member'];
        } catch (error) {
            this.loading = false;
            console.error('Error fetching products:', error);
            return;
        }

        this.products = response.data['hydra:member'];
    },
};
</script>
