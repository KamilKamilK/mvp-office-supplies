<template>
    <span class="p-3">
        {{ title }}
    </span>
</template>

<script>
export default {
    name: 'Legenda',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped lang="scss"></style>
