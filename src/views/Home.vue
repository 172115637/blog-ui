<template>
    <div id="home">
        <el-container>
            <el-aside>
                <Aside/>
            </el-aside>
            <el-container>
                <el-header v-if="!showHeader()">
                    <Header/>
                </el-header>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
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
                return path.includes('/home/article') || path.includes('/home/article_save')
            }
        }
    }
</script>

<style lang="stylus">
    #home {
        width 100%;
        height 100%;

        .el-container {
            width 100%;
            height 100%;

            .el-header {
                height auto !important;
                padding 0 !important;
            }

            .el-aside {
                width 200px !important;
            }

            .el-main {
                padding 0
            }
        }
    }
</style>