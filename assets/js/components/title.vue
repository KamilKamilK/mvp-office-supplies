<template>
    <div :class="$style.component">
        <h1>{{ text }}</h1>
    </div>
</template>

<script>
export default {
    name: 'AppTitle',
    props: {
        text: {
            type: String,
            required: true,
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
