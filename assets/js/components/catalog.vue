<template>
    <div>
        <div class="row">
            <div class="col-12">
                <h1>Products</h1>
            </div>
        </div>
        <ProductList :products="products" />
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
    data() {
        return {
            products: [],
            legend: "Shipping takes 10-12 weeks, and products probably won't work",
        };
    },
    async created() {
        const response = await axios.get('/api/products');

        this.products = response.data['hydra:member'];
    },
};
</script>
