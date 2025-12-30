<template>
    <div>
        <div v-if="items.length === 0">Your shopping cart is empty.</div>
    </div>

    <div v-if="items.length">
        <div class="row p-3">
            <div class="col-3">Item Name</div>
            <div class="col-3">Quantity</div>
            <div class="col-3">Price</div>
            <div class="col-3" />
        </div>
        <shopping-cart-item
            v-for="item in items"
            :key="item.id"
            :item="item"
            @update-quantity="$emit('updateQuantity', $event)"
        />
        <div class="p-3">
            Total: <strong>${{ totalPrice }}</strong>
        </div>
    </div>
</template>
<script>
import ShoppingCartItem from '@/components/shopping-cart/cart-item.vue';
import formatPrice from '@/helpers/format-price.js';

export default {
    name: 'ShoppingCartList',
    components: { ShoppingCartItem },
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    emits: ['updateQuantity'],
    computed: {
        totalPrice() {
            return formatPrice(this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0));
        },
    },
};
</script>
