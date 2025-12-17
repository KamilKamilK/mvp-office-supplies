<template>
    <div>
        <loading v-if="loading" />
        <div v-if="product">
            <title-component :text="product.name" />
        </div>
        <div v-if="product" :class="$style.product" class="row">
            <div class="col-4 pt-3">
                <img class="d-block" :src="product.image" :alt="product.name" />
                <div class="p-2">
                    <small>brought to you by </small>
                    <small class="d-inline" v-text="product.brand" />
                </div>
            </div>
            <div class="col-8 p-3">
                <div v-text="product.description" />
                <div class="row mt-4 align-items-center">
                    <div class="col-4">
                        Price: <strong>${{ price }}</strong>
                    </div>
                    <div class="col-8 p-3">
                        <div class="d-flex align-items-center justify-content-center">
                            <color-selector
                                v-if="product.colors.length !== 0"
                                :colors="product.colors"
                                @color-selected="onColorSelected"
                            />
                            <input v-model.number="quantity" class="form-control mx-3" type="number" min="1" />
                            <button
                                class="btn btn-info btn-sm"
                                :disabled="cart === null || isAddingToCart"
                                @click="addToCart"
                            >
                                {{ isAddingToCart ? 'Adding...' : 'Add to Cart' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchOneProduct } from '@/services/products-service';
import { fetchCart, addItemToCart } from '@/services/cart-service';
import formatPrice from '@/helpers/format-price';
import ColorSelector from '@/components/color-selector.vue';
import Loading from '@/components/loading.vue';
import TitleComponent from '@/components/title.vue';

export default {
    name: 'ProductShow',
    components: { Loading, TitleComponent, ColorSelector },
    props: {
        productId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            cart: null,
            product: null,
            loading: true,
            selectedColor: null,
            quantity: 1,
            isAddingToCart: false,
        };
    },
    computed: {
        /**
         * Returns a formatted price for the product
         * @returns {string}
         */
        price() {
            return formatPrice(this.product.price);
        },
    },

    async created() {
        this.loading = true;

        try {
            // Załaduj koszyk i produkt równolegle
            const [cart, productResponse] = await Promise.all([fetchCart(), fetchOneProduct(this.productId)]);

            this.cart = cart;
            this.product = productResponse.data;

            console.log('Cart loaded', this.cart);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            this.loading = false;
        }
    },
    methods: {
        /**
         * Handle color selection from color-selector component
         */
        onColorSelected(color) {
            this.selectedColor = color;
        },

        async addToCart() {
            // Walidacja: sprawdź czy kolor jest wybrany (jeśli produkt ma kolory)
            if (this.product.colors.length > 0 && !this.selectedColor) {
                alert('Please select a color');
                return;
            }

            this.isAddingToCart = true;

            try {
                // Debug: sprawdź co wysyłamy
                console.log('Adding to cart:', {
                    product: this.product['@id'],
                    color: this.selectedColor,
                    quantity: this.quantity,
                });

                const updatedCart = await addItemToCart(this.cart, {
                    product: this.product['@id'],
                    color: this.selectedColor,
                    quantity: this.quantity,
                });

                // Zaktualizuj lokalny stan koszyka
                this.cart = updatedCart;

                // Opcjonalnie: wyświetl komunikat sukcesu
                console.log('Item added to cart successfully');
                alert('Product added to cart!');

                // Opcjonalnie: zresetuj ilość do 1
                this.quantity = 1;
            } catch (error) {
                console.error('Error adding item to cart:', error);
                console.error('Error details:', error.response?.data);
                alert('Failed to add item to cart. Please try again.');
            } finally {
                this.isAddingToCart = false;
            }
        },
    },
};
</script>

<style lang="scss" module>
@use '~styles/components/light-component' as lc;

.product {
    @include lc.light-component;

    img {
        max-width: 100%;
        max-height: 100%;
    }

    input {
        width: 60px;
    }
}
</style>
