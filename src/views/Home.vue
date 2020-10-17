<template>
    <div id="home">
        <div class="container">
            <div class="aside">
                <Aside/>
            </div>
            <div class="content-box">
                <div class="header" v-if="!showHeader()">
                    <Header/>
                </div>
                <div class="main">
                    <router-view/>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Aside from "../components/Aside";
    import Header from "../components/Header";
    import Main from "./Main";

    export default {
        name: 'Home',
        components: {
            Aside,
            Header,
            Main
        },
        methods: {
            tabClick(obj) {
                alert(obj);
            },
            showHeader() {
                let path = this.$route.path;
                return path.includes('/home/article') || path.includes('/home/article_save')  || path.includes("/home/about")
            }
        }
    }
</script>

<style lang="stylus">
    #home {
        width 100%;
        height 100%;

        .container {
            width 100%;
            height 100%;
            display flex;

            .header {
                height auto;
                padding 0;
            }

            .aside {
                width 200px !important;
            }

            .content-box {
                padding 0
                position relative;
                flex 1;
                display flex
                flex-direction column
                .main{
                    width 100%;
                    flex 1;
                    overflow auto;
                }
            }
        }
    }
</style>