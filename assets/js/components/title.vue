<template>
    <div :class="$style.component">
        <h1>{{ categoryName }}</h1>
    </div>
</template>

<script>
export default {
    name: 'AppTitle',
    props: {
        currentCategoryId: {
            type: String,
            default: null,
        },
        categories: {
            type: Array,
            required: true,
        },
    },
    computed: {
        categoryName() {
            if (this.currentCategoryId === null) {
                return 'All Products';
            }

            const category = this.categories.find(cat => cat['@id'] === this.currentCategoryId);

            return category ? category.name : '';
        },
    },
};
</script>

<style lang="scss" module>
.component {
    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
}
</style>
