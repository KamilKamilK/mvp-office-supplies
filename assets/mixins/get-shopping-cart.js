import { fetchCart, addItemToCart, getCartTotalItems, removeItemFromCart } from '@/services/cart-service';

export default {
    data() {
        return {
            cart: null,
            addToCartLoading: false,
            addToCartSuccess: false,
        };
    },

    async created() {
        this.cart = await fetchCart();
    },

    methods: {
        async addProductToCart(product, selectedColorId, quantity) {
            if (!selectedColorId && product.colors.length > 0) {
                console.warn('Please select a color before adding to cart.');
                return;
            }

            this.addToCartLoading = true;
            this.addToCartSuccess = false;

            try {
                await addItemToCart(this.cart, {
                    product: product['@id'],
                    color: selectedColorId,
                    quantity,
                });

                this.addToCartLoading = false;
                this.addToCartSuccess = true;

                this.updateCartHeaderTotal();

                setTimeout(() => {
                    this.addToCartSuccess = false;
                }, 2000);
            } catch (error) {
                this.addToCartLoading = false;
                console.error('Error adding to cart:', error);
            }
        },

        async removeProductFromCart(productId, colorId) {
            await removeItemFromCart(this.cart, productId, colorId);

            this.updateCartHeaderTotal();
        },

        updateCartHeaderTotal() {
            document.getElementById('js-shopping-cart-items').innerHTML = getCartTotalItems(this.cart).toString();
        },
    },
};
