<template>
    <div id="about" v-html="body" class="v-note-wrapper markdown-body shadow">
    </div>
</template>

<script>
    import mavonEditor from "mavon-editor";

    export default {
        name: "About",
        data() {
            return {
                body: ""
            }
        },
        created() {
            this.body = mavonEditor.markdownIt.render("#### Hello")
        }
    }
</script>

<style lang="stylus" scoped>
#about{
padding 50px;
}
</style>