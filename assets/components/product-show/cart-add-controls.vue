<template>
    <div :class="[$style.component, 'd-flex align-items-center', 'justify-content-center']">
        <color-selector v-if="product.colors.length !== 0" @color-selected="updateSelectedColor" />
        <input v-model.number="quantity" class="form-control mx-3" type="number" min="1" />
        <button class="btn btn-info btn-sm" :disabled="!allowAddToCart || addToCartLoading" @click="addToCart">
            <span v-show="!addToCartLoading && !addToCartSuccess">Add to Cart</span>
            <span v-show="addToCartLoading"> <i class="fas fa-spinner fa-spin"></i> Adding... </span>
            <span v-show="addToCartSuccess"> <i class="fas fa-check"></i> Added! </span>
        </button>
    </div>
</template>

<script>
import ColorSelector from '@/components/color-selector.vue';

export default {
    name: 'ProductCartAddControls',
    components: { ColorSelector },
    props: {
        product: {
            type: Object,
            required: true,
        },
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
    data() {
        return {
            quantity: 1,
            selectedColorId: null,
        };
    },
    methods: {
        updateSelectedColor(colorIri) {
            this.selectedColorId = colorIri;
        },
        addToCart() {
            this.$emit('add-to-cart', {
                selectedColorId: this.selectedColorId,
                quantity: this.quantity,
            });
        },
    },
};
</script>
<style lang="scss" module>
.component :global {
    input {
        width: 60px;
        text-align: center;
    }
}
</style>
