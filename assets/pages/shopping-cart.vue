<template>
    <div :class="[$style.component, 'container-fluid']">
        <div class="row">
            <aside class="col-xs-12 col-lg-3" />
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
import { fetchProductsById } from '@/services/products-service';
import { fetchColors } from '@/services/colors-service';
import { updateCartItemQuantity } from '@/services/cart-service';

export default {
    name: 'ShoppingCart',
    components: {
        TitleComponent,
        Loading,
        ShoppingCartList,
    },
    mixins: [ShoppingCartMixin],
    data() {
        return {
            products: null,
        };
    },
    computed: {
        completeCart() {
            if (!this.cart || !this.products || !this.colors) {
                return null;
            }

            const completeItems = this.cart.items.map(cartItem => {
                const product = this.products.find(productItem => productItem['@id'] === cartItem.product);
                const color = this.colors.find(colorItem => colorItem['@id'] === cartItem.color) || null;

                return {
                    id: `${cartItem.product}_${cartItem.color ? cartItem.color : 'none'}`,
                    product,
                    color,
                    quantity: cartItem.quantity,
                };
            });

            return {
                items: completeItems,
            };
        },
    },
    watch: {
        async cart() {
            this.loadProducts();
        },
    },

    async created() {
        this.colors = (await fetchColors()).data.member || (await fetchColors()).data['hydra:member'];
    },

    methods: {
        loadProducts() {
            const productIds = this.cart.items.map(item => item.product);
            return fetchProductsById(productIds).then(productsPresponse => {
                this.products = productsPresponse.data.member || productsPresponse.data['hydra:member'];
            });
        },
        updateQuantity({ productId, colorId, quantity }) {
            updateCartItemQuantity(this.cart, productId, colorId, quantity);
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
