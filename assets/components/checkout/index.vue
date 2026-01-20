<template>
    <div class="row p-3">
        <div class="col-12">
            <form novalidate @submit.prevent="submitOrder">
                <div v-show="serverError" class="alert alert-danger">
                    DANGER DANGER - There was an error processing your order. Please try again later.
                </div>
                <div class="form-row d-flex gap-3 flex-wrap">
                    <form-input
                        v-model="form.customerName"
                        v-bind="getFieldProps('customerName', 'Name:')"
                        class="col"
                        @blur="validateField"
                    />
                    <form-input
                        v-model="form.customerEmail"
                        type="email"
                        v-bind="getFieldProps('customerEmail', 'Email:')"
                        class="col"
                        @blur="validateField"
                    />
                </div>
                <form-input
                    v-model="form.customerAddress"
                    v-bind="getFieldProps('customerAddress', 'Address')"
                    @blur="validateField"
                />
                <div class="form-row d-flex gap-3 flex-wrap">
                    <form-input
                        v-model="form.customerZip"
                        v-bind="getFieldProps('customerZip', 'Zip')"
                        class="col"
                        @blur="validateField"
                    />
                    <form-input
                        v-model="form.customerCity"
                        v-bind="getFieldProps('customerCity', 'City')"
                        class="col"
                        @blur="validateField"
                    />
                    <form-input
                        v-model="form.customerPhone"
                        type="phone"
                        v-bind="getFieldProps('customerPhone', 'Phone')"
                        class="col"
                        @blur="validateField"
                    />
                </div>

                <div class="form-row justify-content-end align-items-center mt-3">
                    <loading v-if="loading" />
                    <div class="col-auto">
                        <button type="submit" class="btn btn-info btn-lg" :disabled="loading">Submit Order</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import FormInput from './form-input.vue';
import Loading from '@/components/loading.vue';
import { createOrder } from '@/services/checkout-service';
import { clearCart } from '@/services/cart-service';

export default {
    name: 'CheckoutPage',
    components: {
        FormInput,
        Loading,
    },
    props: {
        cart: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            form: {
                customerName: '',
                customerEmail: '',
                customerAddress: '',
                customerZip: '',
                customerCity: '',
                customerPhone: '',
            },
            validationErrors: this.getEmptyValidationErrors(),
            loading: false,
            serverError: false,
        };
    },
    methods: {
        getFieldProps(id, label) {
            return {
                id,
                label,
                modelValue: this.form[id],
                errorMessage: this.validationErrors[id] || '',
            };
        },
        preparePurchaseItems() {
            return this.cart.items.map(cartItem => {
                const item = {
                    product: cartItem.product,
                    quantity: cartItem.quantity,
                };

                if (cartItem.color) {
                    item.color = cartItem.color;
                }

                return item;
            });
        },
        async submitOrder() {
            this.loading = true;
            this.serverError = false;
            this.validationErrors = this.getEmptyValidationErrors();

            try {
                const purchaseItems = this.preparePurchaseItems();

                const response = await createOrder({
                    ...this.form,
                    purchaseItems,
                });

                await clearCart();

                window.location.href = `/confirmation/${response.data.id}`;
            } catch (error) {
                console.error('Order submission error:', error);

                if (!error.response) {
                    this.serverError = true;
                    return;
                }

                const { response } = error;

                if (response.status === 422 && response.data?.violations) {
                    response.data.violations.forEach(violation => {
                        this.validationErrors[violation.propertyPath] = violation.message;
                    });
                } else {
                    this.serverError = true;
                }
            } finally {
                this.loading = false;
            }
        },
        validateField(event) {
            const validationMessages = {
                customerName: 'Please, enter your full name!',
                customerEmail: 'Please, enter your email address!',
                customerAddress: 'Please, enter your street address!',
                customerZip: 'Please, enter your ZIP code!',
                customerCity: 'Please, enter your city!',
                customerPhone: 'Please, provide a phone number!',
            };
            const validationField = event.target.id;
            if (!this.form[validationField]) {
                this.validationErrors[validationField] = validationMessages[validationField];
            } else {
                delete this.validationErrors[validationField];
            }
        },
        getEmptyValidationErrors() {
            return {
                customerName: null,
                customerEmail: null,
                customerAddress: null,
                customerZip: null,
                customerCity: null,
                customerPhone: null,
            };
        },
    },
};
</script>

<style lang="scss">
.form-control {
    border: 1px solid #5e94d6;
}

.form-control:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
}
</style>
