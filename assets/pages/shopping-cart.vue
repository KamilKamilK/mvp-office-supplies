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
                <transition name="fade" mode="out-in">
                    <title-component :key="currentState" :text="pageTitle" />
                </transition>
                <div class="content p-3">
                    <loading v-show="completeCart === null" />
                    <transition name="fade" mode="out-in">
                        <div v-if="completeCart && currentState === 'cart'">
                            <shopping-cart-list
                                :items="completeCart.items"
                                @update-quantity="updateQuantity"
                                @remove-from-cart="removeProductFromCart($event.productId, $event.colorId)"
                            />
                        </div>
                        <div v-else-if="currentState === 'checkout'">
                            <checkout-page />
                        </div>
                    </transition>

                    <div v-if="completeCart && completeCart.items.length > 0">
                        <button class="btn btn-primary mt-3" @click="switchState">{{ buttonText }}</button>
                    </div>
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
import CheckoutPage from '@/components/checkout/index.vue';
import { fetchProductsById, fetchFeaturedProducts } from '@/services/products-service';
import { fetchColors } from '@/services/colors-service';
import { updateCartItemQuantity } from '@/services/cart-service';

export default {
    name: 'ShoppingCart',
    components: {
        CheckoutPage,
        Loading,
        ShoppingCartList,
        ShoppingCartSidebar,
        TitleComponent,
    },
    mixins: [ShoppingCartMixin],
    data() {
        return {
            currentState: 'cart',
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

        pageTitle() {
            return this.currentState === 'cart' ? 'Shopping Cart' : 'Checkout';
        },

        buttonText() {
            return this.currentState === 'cart' ? 'Continue Shopping >>' : '<< Back to Cart';
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
        switchState() {
            this.currentState = this.currentState === 'cart' ? 'checkout' : 'cart';
        },
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

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease-in-out;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-to,
    .fade-leave-from {
        opacity: 1;
    }
}
</style>
