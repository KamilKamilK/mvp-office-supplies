<template>
    <div :class="$style.wrapper">
        <div class="row">
            <div class="col-12">
                <div class="mt-4">
                    <Loading v-show="loading"></Loading>

                    <h5 v-show="!loading && products.length === 0">No products found.</h5>
                </div>
            </div>
            <product-card
                v-for="product in products"
                v-show="!loading"
                :key="product['@id']"
                :product="product"
            ></product-card>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/loading.vue';
import ProductCard from '@/components/product-list/product-card.vue';

export default {
    name: 'ProductList',
    components: {
        ProductCard,
        Loading,
    },
    props: {
        products: {
            type: Array,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        },
    },
};
</script>
<style lang="scss" module>
@use 'styles/components/light-component' as *;

.wrapper {
    @include light-component;
    padding: 1rem;
    margin-top: 1rem;
}
</style>
