<template>
    <div :class="$style.home">
        <h1>home<span :class="$style.title">hah</span></h1>
        <ul><li>hei</li></ul>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="stylus" module>
    @import "../../css/element.styl"
    .home
        color red
        font-size 80px
</style>