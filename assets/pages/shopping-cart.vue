<template>
    <div :class="[$style.component, 'container-fluid']">
        <div class="row">
            <aside class="col-xs-12 col-lg-3" />
            <div class="col-xs-12 col-lg-9">
                <title-component text="Shopping Cart" />
                <div class="content p-3">
                    <loading v-show="cart === null" />
                    <div v-if="cart !== null">
                        <div v-for="(cartItem, index) in cart.items" :key="index">
                            {{ cartItem.product }} - Quantity: {{ cartItem.quantity }}
                        </div>

                        <div v-if="cart.items.length === 0">Your shopping cart is empty.</div>
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

export default {
    name: 'ShoppingCart',
    components: {
        TitleComponent, Loading,
    },
    mixins: [ShoppingCartMixin],
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
