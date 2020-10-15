<template>
    <div id="article">
        <el-page-header @back="goBack()" :content="article.title"></el-page-header>
        <div v-html="body" class="v-note-wrapper markdown-body shadow"></div>
    </div>
</template>

<script>
    import mavonEditor from "mavon-editor";

    export default {
        name: "Article",
        data() {
            return {
                body: "",
                article: {
                    title: ""
                }
            };
        },
        created() {
            this.getDetail()
        },
        methods: {
            getDetail() {
                this.$service.articleDetail({articleId: this.$route.params.id}).then((res => {
                    if (res.data.code === 0) {
                        this.article = res.data.data
                        this.body = mavonEditor.markdownIt.render(this.article.content)
                    }
                }))
            },
            goBack() {
                this.$router.replace({path: "/"})
            }
        },
    }
</script>

<style lang="stylus">
    #article {
        padding 15px 50px;

        .el-page-header {
            padding 20px 0;
        }
    }
</style>