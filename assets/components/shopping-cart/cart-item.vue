<template>
    <div :class="[$style.component, 'row', 'p-3']">{{ item.product.name }} - Quantity: {{ item.quantity }}</div>
</template>

<script>
export default {
    name: 'ShoppingCartItem',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>
<style lang="scss" module>
@use '~styles/variables/colors.scss' as colors;

.component {
    border-bottom: 1px solid colors.$light-component-border;
    a {
        color: colors.$light-component-link;
    }
}
</style>
