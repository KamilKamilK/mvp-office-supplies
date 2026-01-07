<template>
    <div :class="[$style.component, 'p-3', 'mb-5']">
        <h5 class="text-center">Featured Product!</h5>

        <img class="d-block mb-3" :src="featuredProduct.image" :alt="featuredProduct.name" />

        <div class="pt-3">
            <h6>{{ featuredProduct.name }} - ${{ price }}</h6>

            <cart-add-controls
                :product="featuredProduct"
                :add-to-cart-loading="addToCartLoading"
                :add-to-cart-success="addToCartSuccess"
                :allow-add-to-cart="allowAddToCart"
                add-button-text="+ Add to Cart"
                @add-to-cart="$emit('add-to-cart', $event)"
            />
        </div>
    </div>
</template>

<script>
import formatPrice from '@/helpers/format-price';
import CartAddControls from '@/components/product-show/cart-add-controls.vue';

export default {
    name: 'ShoppingCartSidebar',
    components: { CartAddControls },
    props: {
        featuredProduct: { type: Object, required: true },
        allowAddToCart: {
            type: Boolean,
            required: true,
        },
        addToCartLoading: {
            type: Boolean,
            required: true,
        },
        addToCartSuccess: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['add-to-cart'],
    computed: {
        price() {
            return formatPrice(this.featuredProduct.price);
        },
    },
};
</script>

<style lang="scss" module>
@use '~styles/components/light-component' as lc;

.component {
    @include lc.light-component;

    img {
        max-width: 100%;
        border-radius: 8px;
    }

    h5 {
        margin-bottom: 1rem;
    }

    h6 {
        margin-bottom: 0.5rem;
    }

    input {
        width: 60px;
    }
}
</style>
