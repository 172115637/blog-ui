<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

    export default {
        name: 'app'
    }
</script>

<style lang="stylus">
    html, body {
        width 100%;
        height 100%;
        position relative;
        padding 0;
        margin 0;
        min-width 1200px;
    }
    #app{
        width 100%;
        height 100%;
        position absolute;
    }
</style>
