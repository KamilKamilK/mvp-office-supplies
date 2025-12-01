<template>
    <div>
        <div class="row">
            <div class="col-12">
                <title-component />
            </div>
        </div>
        <ProductList :products="products" :loading="loading" />
        <div class="row">
            <legend-component :title="legend" />
        </div>
    </div>
</template>

<script>
import { getProducts } from '../services/products-service';
import LegendComponent from '@/components/legend.vue';
import ProductList from '@/components/product-list/index.vue';
import TitleComponent from '@/components/title.vue';

export default {
    name: 'Catalog',
    components: { LegendComponent, ProductList, TitleComponent },
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
        this.loading = true;

        let response;
        try {
            response = await getProducts(this.currentCategoryId);

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
