<template>
    <div :class="[$style.component, 'container-fluid']">
        <div class="row">
            <!-- Sidebar Featured Product -->
            <div class="col-xs-12 col-lg-3 mb-3">
                <shopping-cart-sidebar
                    v-if="featuredProduct"
                    :featured-product="featuredProduct"
                    :allow-add-to-cart="cart !== null"
                    :add-to-cart-loading="addToCartLoading"
                    :add-to-cart-success="addToCartSuccess"
                    @add-to-cart="addProductToCart(featuredProduct, $event.selectedColorId, $event.quantity)"
                />
            </div>

            <!-- Lista koszyka -->
            <div class="col-xs-12 col-lg-9">
                <title-component text="Shopping Cart" />
                <div class="content p-3">
                    <loading v-show="completeCart === null" />
                    <shopping-cart-list
                        v-if="completeCart"
                        :items="completeCart.items"
                        @update-quantity="updateQuantity"
                        @remove-from-cart="removeProductFromCart($event.productId, $event.colorId)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TitleComponent from '@/components/title';
import ShoppingCartMixin from '@/mixins/get-shopping-cart';
import Loading from '@/components/loading.vue';
import ShoppingCartList from '@/components/shopping-cart/index.vue';
import ShoppingCartSidebar from '@/components/shopping-cart/cart-sidebar.vue';
import { fetchProductsById, fetchFeaturedProducts } from '@/services/products-service';
import { fetchColors } from '@/services/colors-service';
import { updateCartItemQuantity } from '@/services/cart-service';

export default {
    name: 'ShoppingCart',
    components: {
        TitleComponent,
        Loading,
        ShoppingCartList,
        ShoppingCartSidebar,
    },
    mixins: [ShoppingCartMixin],
    data() {
        return {
            products: null,
            colors: null,
            featuredProduct: null,
        };
    },
    computed: {
        completeCart() {
            if (!this.cart || !this.products || !this.colors) return null;

            const completeItems = this.cart.items.map(cartItem => {
                const product = this.products.find(p => p['@id'] === cartItem.product);
                const color = this.colors.find(c => c['@id'] === cartItem.color) || null;
                return {
                    id: `${cartItem.product}_${cartItem.color ?? 'none'}`,
                    product,
                    color,
                    quantity: cartItem.quantity,
                };
            });

            return { items: completeItems.filter(item => item.product) };
        },
    },
    watch: {
        'cart.items.length': function watchCartItemsLength() {
            this.loadProducts();
        },
    },
    async created() {
        this.loadFeaturedProduct();
        this.colors = (await fetchColors()).data.member || (await fetchColors()).data['hydra:member'];
    },
    methods: {
        async loadProducts() {
            const productIds = this.cart.items.map(item => item.product);
            const response = await fetchProductsById(productIds);
            this.products = response.data.member || response.data['hydra:member'];
        },
        updateQuantity({ productId, colorId, quantity }) {
            updateCartItemQuantity(this.cart, productId, colorId, quantity);
        },
        async loadFeaturedProduct() {
            const featuredProducts =
                (await fetchFeaturedProducts()).data.member || (await fetchFeaturedProducts()).data['hydra:member'];
            if (featuredProducts.length === 0) return;
            [this.featuredProduct] = featuredProducts;
        },
    },
};
</script>

<style lang="scss" module>
@use '~styles/components/light-component' as lc;

.component :global {
    .content {
        @include lc.light-component;
    }
}
</style>
