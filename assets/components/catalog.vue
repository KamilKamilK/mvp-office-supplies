<template>
    <div>
        <div class="row">
            <div class="col-3">
                <title-component :text="categoryName" />
            </div>

            <div class="col-9">
                <search-bar @search-products="onSearchProducts" />
            </div>
        </div>
        <ProductList :products="products" :loading="loading" />
        <div class="row">
            <legend-component :title="legend" />
        </div>
    </div>
</template>

<script>
import { fetchProducts } from '../services/products-service';
import LegendComponent from '@/components/legend.vue';
import ProductList from '@/components/product-list/index.vue';
import TitleComponent from '@/components/title.vue';
import SearchBar from '@/components/search-bar.vue';

export default {
    name: 'CatalogList',
    components: { LegendComponent, ProductList, TitleComponent, SearchBar },
    props: {
        currentCategoryId: {
            type: String,
            default: null,
        },
        categories: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            products: [],
            loading: false,
            legend: "Shipping takes 10-12 weeks, and products probably won't work",
            searchTerm: '',
        };
    },
    computed: {
        categoryName() {
            if (this.currentCategoryId === null) {
                return 'All Products';
            }

            const category = this.categories.find(cat => cat['@id'] === this.currentCategoryId);

            return category ? category.name : '';
        },
    },
    watch: {
        currentCategoryId() {
            this.loadProducts();
        },
    },
    created() {
        this.loadProducts();
    },
    methods: {
        /**
         * Handles the search-products event from the SearchBar component.
         * @param {string} term - The search term entered by the user.
         */
        onSearchProducts({ term }) {
            this.searchTerm = term;
            this.loadProducts();
        },
        async loadProducts() {
            this.loading = true;

            let response;
            try {
                response = await fetchProducts(this.currentCategoryId, this.searchTerm);
                this.products = response.data.member || response.data['hydra:member'];
            } catch (error) {
                this.products = [];
                console.error('Error fetching products:', error);
                return;
            } finally {
                this.loading = false;
            }

            this.products = response.data.member || response.data['hydra:member'];
        },
    },
};
</script>
