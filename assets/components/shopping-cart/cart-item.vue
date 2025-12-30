<template>
    <div :class="[$style.component, 'row', 'p-3']">
        <div class="col-2">
            {{ item.product.name }}
        </div>

        <div class="col-1">
            <span
                class="color-square"
                :style="{
                    backgroundColor: `#${hexColor}`,
                }"
            />
        </div>

        <div class="col-3">
            <input :value="item.quantity" type="number" class="form-control" min="1" @input="updateQuantity" />
        </div>

        <div class="col-3">${{ totalPrice }}</div>
        <div class="col-3">
            <button class="btn btn-danger">Remove</button>
        </div>
    </div>
</template>

<script>
import formatPrice from '@/helpers/format-price.js';

export default {
    name: 'ShoppingCartItem',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    emits: ['update-quantity'],
    computed: {
        hexColor() {
            return this.item.color ? this.item.color.hexColor : 'fff';
        },

        totalPrice() {
            return formatPrice(this.item.product.price * this.item.quantity);
        },
    },
    methods: {
        updateQuantity(event) {
            this.$emit('update-quantity', {
                productId: this.item.product['@id'],
                colorId: this.item.color ? this.item.color['@id'] : null,
                quantity: parseInt(event.target.value, 10),
            });
        },
    },
};
</script>
<style lang="scss" module>
@use '~styles/variables/colors.scss' as colors;

.component :global {
    border-bottom: 1px solid colors.$light-component-border;
    a {
        color: colors.$light-component-link;
    }

    .color-square {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-color: gray;
    }

    input {
        width: 60px;
    }
}
</style>
