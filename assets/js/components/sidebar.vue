<template>
    <div :class="[$style.component, 'p-3', 'mb-5']">
        <div v-show="!collapsed">
            <h5 class="text-center">Categories</h5>
            <ul class="nav flex-column mb-4">
                <li class="nav-item">
                    <a
                        :class="{
                            'nav-link': true,
                            selected: currentCategoryId === null,
                        }"
                        href="/"
                    >
                        All Products</a
                    >
                </li>
                <li v-for="category in categories" :key="category['@id']" class="nav-item">
                    <a
                        :class="{
                            'nav-link': true,
                            selected: category['@id'] === currentCategoryId,
                        }"
                        :href="`/category/${category.id}`"
                        class="nav-link"
                    >
                        {{ category.name }}
                    </a>
                </li>
            </ul>

            <hr />
        </div>

        <div class="d-flex justify-content-end">
            <button
                class="btn btn-secondary btn-sm"
                @click="$emit('toggle-collapsed')"
                v-text="collapsed ? '>>' : '<< Collapse'"
            ></button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'Sidebar',
    props: {
        collapsed: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['toggle-collapsed'],
    data() {
        return {
            categories: [],
        };
    },
    computed: {
        currentCategoryId() {
            return window.currentCategoryId;
        },
    },
    async created() {
        const response = await axios.get('/api/categories');

        this.categories = response.data['hydra:member'];
    },
};
</script>

<style lang="scss" module>
@use 'styles/components/light-component' as *;
@use 'styles/variables/colors' as *;

.component {
    @include light-component;

    &.collapsed {
        width: 70px;
    }

    ul {
        li {
            a {
                display: block;
                padding: 0.5rem 1rem;
                text-decoration: none;
                color: inherit;
                border-radius: 4px;
                transition: background 0.2s;

                &:hover {
                    background: $blue-component-link-hover;
                }
            }

            :global(a.selected) {
                background: $light-component-border;
            }
        }
    }
}
</style>
