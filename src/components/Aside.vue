<template>
    <div id="aside">
        <div class="user-info">
            <img :src="user.headimg" alt="" class="headimg">
            <div class="username">{{user.nickname}}</div>
            <div>{{user.autograph}}</div>
        </div>
        <ul class="other-site">
            <li><img src="https://www.17sucai.com/preview/177065/2017-09-28/Mon9/static/img/github.png"
                     @click="go(user.githubUrl)"></li>
            <li><img src="https://www.17sucai.com/preview/177065/2017-09-28/Mon9/static/img/weibo.png"
                     @click="go(user.weiboUrl)"></li>
        </ul>
        <ul class="menu">
            <li :class="this.$route.path==='/home/main'?'selected-menu':''">
                <router-link to="/home/main">个人博客</router-link>
            </li>
            <li :class="this.$route.path==='/home/about'?'selected-menu':''"><router-link to="/about">关于我</router-link></li>
        </ul>
        <div class="qq-group">
            <el-button v-if="$store.state.isAdmin" type="primary" size="mini" style="margin-bottom: 10px;"
                       @click="logout()">注销
            </el-button>
            <el-button v-if="$store.state.isAdmin" type="primary" size="mini" style="margin-bottom: 10px;"
                       @click="$router.replace({path:'/home/article_save'})">创建文章
            </el-button>
            <span>我的QQ</span>
            <span>扫码添加</span>
            <img src="https://www.17sucai.com/preview/177065/2017-09-28/Mon9/static/img/qq-group.jpg" alt="">
        </div>
        <div class="copyright">
            @ 2017 - 2017 Moonlightg
        </div>
    </div>
</template>

<script>
    import store from "../store";

    export default {
        name: "Aside",
        data() {
            return {
                user: {}
            }
        },
        methods: {
            getUserDetail() {
                this.$service.userDetail().then(res => {
                    if (res.data.code === 0) {
                        this.user = res.data.data
                    }
                })
            },
            go(url) {
                window.location = url;
            },
            logout() {
                store.commit('setIsAdmin', false)
                sessionStorage.clear();
            }
        },
        created() {
            console.log(123)
            this.getUserDetail()
        }
    }
</script>

<style lang="stylus" scoped>
    #aside {
        height 100%;
        position relative;
        border-right: 1px solid #eee;
        display flex;
        flex-direction column;


        .user-info {
            flex: 0 0 150px;
            padding-top 50px;
            text-align center;

            .headimg {
                width 70px;
                border-radius 50%;
                height 70px;
            }

            .username {
                margin-top: 14px;
                margin-bottom: 12px;
                font-size: 14px;
                line-height: 16px;
                color: #4b595f;
            }
        }

        .user-info div:last-child {
            font-size: 13px;
            margin: 0 20px;
            line-height: 18px;
            color: #849aa4;
        }

        .other-site {
            margin-top: 20px;
            margin-bottom: 67px;
            list-style: none;
            display: flex;
            justify-content: center;
            padding 0;
            flex: 0 0 20px;

            li {
                cursor: pointer;
                margin-right: 20px;

                img {
                    width: 25px;
                    height: 25px;
                }
            }

            li:last-child {
                margin-right 0;
            }
        }

        .menu {
            list-style: none;
            margin 0;
            padding 0;
            flex: 1 1 150px;
            min-height: 150px;

            li {
                width: 100%;
                height: 60px;
                line-height: 60px;
                font-size: 16px

                a {
                    width: 100%;
                    display block;
                    color: #4b595f;
                    text-decoration none;
                }
            }

            li:before {
                width: 4px;
                height: 100%;
                content: "";
                margin-right: 46px;
                float: left;
                display: table;
            }

            .selected-menu:before {
                background-color: #3593f2;
            }

            .selected-menu {
                background-color: #e5f1fc;

                a {
                    color: #3593f2;
                }
            }

            li:hover {
                background-color: #e5f1fc;

                a {
                    color: #3593f2;
                }
            }

            li:hover:before {
                background-color: #3593f2;
            }

            li:first-child {
                margin-bottom: 30px;
            }
        }

        .qq-group {
            flex: 0 0 170px;
            text-align: center;

            span {
                display: block;
                width: 100%;
                height: 15px;
                line-height: 15px;
                font-size: 12px;
                color: #849aa4;
                margin-bottom: 10px;
            }

            span:first-child {
                color: #4b595f;
            }

            img {
                width 90px;
                height 90px;
            }
        }

        .copyright {
            flex: 0 0 20px;
            line-height: 20px;
            text-align: center;
            font-size: 12px;
            color: #888;
        }
    }
</style>