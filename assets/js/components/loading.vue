<template>
    <h4 :class="$style.component">Loading...</h4>
</template>

<script>
export default {
    name: 'Loading',
};
</script>

<style lang="scss" module>
.component {
    background: url('../../images/loading.gif') no-repeat left center;
    padding-left: 60px;
    height: 50px;
    line-height: 50px;
    text-align: left;
    margin: 20px auto;
    display: block;
}
</style>
