<template>
    <div :class="[$style.component, 'container-fluid']">
        <div class="row">
            <aside class="col-xs-12 col-lg-3" />
            <div class="col-xs-12 col-lg-9">
                <title-component text="Shopping Cart" />
                <div class="content p-3">
                    <loading v-show="completeCart === null" />
                    <div v-if="completeCart !== null">
                        <div v-for="(cartItem, index) in completeCart.items" :key="index">
                            {{ cartItem.product.name }} - Quantity: {{ cartItem.quantity }}
                            {{ cartItem.color ? ' - Color: ' + cartItem.color.name : '' }}
                        </div>

                        <div v-if="completeCart.items.length === 0">Your shopping cart is empty.</div>
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
import { fetchProductsById } from '@/services/products-service';
import { fetchColors } from '@/services/colors-service';

export default {
    name: 'ShoppingCart',
    components: {
        TitleComponent,
        Loading,
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

            const completeItems = this.cart.items.map(item => ({
                product: this.products.find(p => p['@id'] === item.product),
                color: this.colors.find(c => c['@id'] === item.color),
                quantity: item.quantity,
            }));

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
