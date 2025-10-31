<template>
    <div :class="[$style.sidebar, 'p-3', 'mb-5']" :style="{ width: collapsed ? '70px' : 'auto' }">
        <h5 class="text-center">Categories</h5>
        <ul class="nav flex-column mb-4">
            <li class="nav-item">
                <a class="nav-link" href="/">All Products</a>
            </li>
            <li v-for="(category, index) in categories" :key="index" class="nav-item">
                <a :href="category.link" class="nav-link">
                    {{ category.name }}
                </a>
            </li>
        </ul>

        <hr />

        <div class="d-flex justify-content-end">
            <button
                class="btn btn-secondary btn-sm"
                @click="toggleCollapsed"
                v-text="collapsed ? '>>' : '<< Collapse'"
            ></button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Sidebar',
    data() {
        return {
            collapsed: false,
            categories: [
                {
                    name: 'Laser Printers',
                    link: '#',
                },
                {
                    name: 'PC drivers',
                    link: '#',
                },
            ],
        };
    },
    methods: {
        toggleCollapsed() {
            this.collapsed = !this.collapsed;
        },
    },
};
</script>

<style lang="scss" module>
@use 'styles/components/light-component' as *;
@use 'styles/variables/colors' as colors;

.sidebar {
    @include light-component;

    ul {
        li a:hover {
            background: colors.$blue-component-link-hover;
        }
    }
}
</style>
