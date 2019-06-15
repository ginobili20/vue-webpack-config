<template>
    <div id="app">
        {{text}}
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                text: 'hello world'
            }
        }
    }
</script>

<style lang="stylus"></style>