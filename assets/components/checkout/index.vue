<template>
    <div class="row p-3">
        <div class="col-12">
            <form novalidate @submit.prevent="submitOrder">
                <div class="form-row d-flex gap-3 flex-wrap">
                    <form-input
                        v-model="form.customerName"
                        v-bind="getFieldProps('customerName', 'Name:')"
                        class="col"
                    />
                    <form-input
                        v-model="form.customerEmail"
                        type="email"
                        v-bind="getFieldProps('customerEmail', 'Email:')"
                        class="col"
                    />
                </div>
                <form-input v-model="form.customerAddress" v-bind="getFieldProps('customerAddress', 'Address')" />
                <div class="form-row d-flex gap-3 flex-wrap">
                    <form-input v-model="form.customerZip" v-bind="getFieldProps('customerZip', 'Zip')" class="col" />
                    <form-input
                        v-model="form.customerCity"
                        v-bind="getFieldProps('customerCity', 'City')"
                        class="col"
                    />
                    <form-input
                        v-model="form.customerPhone"
                        type="phone"
                        v-bind="getFieldProps('customerPhone', 'Phone')"
                        class="col"
                    />
                </div>

                <div class="form-row justify-content-end align-items-center mt-3">
                    <loading v-if="loading" />
                    <div class="col-auto">
                        <button type="submit" class="btn btn-info btn-lg">Submit Order</button>
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
            validationErrors: {},
            loading: false,
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
        async submitOrder() {
            this.loading = true;
            try {
                const response = await createOrder({
                    ...this.form,
                    purchaseItems: this.cart.items,
                });
                alert('Order submitted successfully!');
                console.log('Order response:', response.data);
            } catch (error) {
                console.error('Error submitting order:', error.response || error);
            } finally {
                this.loading = false;
            }
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
