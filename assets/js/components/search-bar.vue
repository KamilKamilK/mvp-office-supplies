<template>
    <div class="input-group">
        <input
            v-model="searchTerm"
            type="search"
            class="form-control"
            placeholder="Search products..."
            @input="onInput"
        />
        <div v-show="searchTerm !== ''" class="input-group-append">
            <button class="btn btn-outline-secondary" @click="eraseSearchTerm">X</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SearchBar',
    emits: ['search-products'],
    data() {
        return {
            searchTerm: '',
            searchTimeout: null,
        };
    },
    methods: {
        onInput() {
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            this.searchTimeout = setTimeout(() => {
                this.$emit('search-products', { term: this.searchTerm });

                this.searchTimeout = null;
            }, 500);
        },
        eraseSearchTerm() {
            this.searchTerm = '';
            this.$emit('search-products', { term: this.searchTerm });
        },
    },
};
</script>
