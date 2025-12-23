<template>
    <div>
        <div v-if="items.length === 0">Your shopping cart is empty.</div>
    </div>

    <shopping-cart-item v-for="(item, index) in items" :key="index" :item="item" />
</template>
<script>
import ShoppingCartItem from '@/components/shopping-cart/cart-item.vue';

export default {
    name: 'ShoppingCartList',
    components: { ShoppingCartItem },
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
};
</script>
