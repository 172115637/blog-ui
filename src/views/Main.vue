<template>
    <div id="main" v-loading="loading">
        <div class="table-header">
            <span>名称</span>
            <span>创建时间</span>
        </div>
        <ul class="issue-list">
            <li class="issue-item" v-for="(article,index) in articleList" :key="index">
                <router-link :to="'/home/article/'+article.articleId">{{article.title}}</router-link>
                <ul class="tags">
                    <li>{{article.typeName}}</li>
                    <ul class="opera" v-if="$store.state.isAdmin">
                        <li>
                            <el-button size="small" type="success" plain icon="el-icon-edit" circle
                                       @click="$router.replace({path:'/home/article_save?id='+article.articleId})">
                            </el-button>
                        </li>
                        <li>
                            <el-button size="small" circle plain icon="el-icon-delete" type="danger"
                                       @click="delArticle(article.articleId)"></el-button>
                        </li>
                    </ul>
                </ul>
                <span class="time">{{article.createTime}}</span>
            </li>
        </ul>

        <div class="bottom-bar">
            <div class="search">
                <input type="text" placeholder="按文章标题或内容搜索..." class="query" v-model="keyword">
                <el-button type="primary" icon="el-icon-search" @click="getArticleList()">搜索</el-button>
            </div>
            <div class="paginataion-container">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page.page"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="page.size"
                        layout="total, sizes, prev,next,jumper"
                        :total="page.count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Main",
        data() {
            return {
                page: {
                    page: 1,
                    limit: 10,
                    size: 0,
                    count: 0
                },
                keyword: "",
                articleList: [],
                typeId: null,
                loading: false
            }
        },
        methods: {
            getArticleList() {
                this.loading = true
                this.$service.articleList({
                    page: this.page.page,
                    limit: this.page.limit,
                    keyword: this.keyword,
                    typeId: this.typeId
                }).then(res => {
                    if (res.data.code === 0) {
                        this.loading = false
                        this.articleList = res.data.data
                        this.page = {
                            page: res.data.page,
                            limit: res.data.limit,
                            size: res.data.size,
                            count: res.data.count
                        }
                    }
                })
            },
            handleSizeChange(val) {
                this.page.limit = val;
                this.getArticleList();
            },
            handleCurrentChange(val) {
                this.page.page = val;
                this.getArticleList();
            },
            delArticle(id) {
                this.$confirm('您确定删除该文章吗, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$service.articleDel({articleId: id}).then((res => {
                        if (res.data.code === 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getArticleList()
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: '删除失败'
                            });
                        }
                    }))
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        created() {
            this.getArticleList()
        },
        computed: {
            watchTabSelect() {
                return this.$store.state.selectTag
            }
        },
        watch: {
            watchTabSelect(val) {
                if (val !== null) {
                    this.typeId = val.typeId;
                } else {
                    this.typeId = null
                }
                this.getArticleList();
            }
        }
    }
</script>

<style lang="stylus" scoped>
    #main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        padding-bottom 70px;
        position relative;

        .table-header {
            flex: 0 0 48px;
            display: flex;
            align-items: center;
            background-color: #f9fafc;
            padding: 0 70px;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            font-size: 12px;
            color: #a3b4bc
        }

        .table-header :first-child {
            flex-grow: 1;
        }

        .table-header :last-child {
            flex: 0 0 7rem;
            text-align: right;
        }

        .issue-list {
            flex-grow: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            list-style: none;
            margin 0;
            padding 0;

            .issue-item {
                flex: 0 0 69px;
                border-bottom: 1px solid #eee;
                display: flex;
                align-items: center;
                padding: 0 70px;

                a {
                    font-size: 15px;
                    color: #4b595f;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-decoration: none;
                }

                a:hover {
                    color: #3593f2;
                }

                .time {
                    font-size: .6rem;
                    color: #999;
                    cursor: default;
                    flex: 0 0 8rem;
                    text-align: right;
                }

                .tags {
                    display: flex;
                    flex: 1 0 auto;
                    margin: 0 30px;
                    list-style: none;
                    padding 0;
                    justify-content space-between;
                    align-items center;

                    > li {
                        line-height: 24px;
                        height: 24px;
                        padding: 0 12px;
                        font-size: 12px;
                        background-color: rgb(14, 138, 22);
                        margin-right: 14px;
                        cursor: pointer;
                        user-select: none;
                        border-radius: 3px;
                        color #fff;
                    }

                    .opera {
                        display flex;
                        margin 0;
                        padding 0;
                        list-style none

                        > li {
                            margin-right 15px;
                        }

                        > li:last-child {
                            margin-right 0 !important;
                        }
                    }
                }
            }
        }

        .bottom-bar {
            padding: 0 .8rem;
            border-top: 1px solid #eee;
            align-items: center;
            position fixed;
            bottom 0;
            height 70px
            left 200px;
            right 0;
            z-index 999
            background-color #fff;
            display flex;
            justify-content space-between
            box-sizing border-box

            .query {
                height: 9px;
                border-radius: 3px;
                padding: 15px 30px 15px 15px;
                border: 1px solid #eee;
                font-size: 14px;
                color: #4b595f;
                margin-right: 20px;
                outline: none;
                background: #f9fafc url(../assets/images/enter.svg) no-repeat calc(100% - 10px) 50%;
            }

            .paginataion-container {
                align-items: center;
                height: 38px;
                -webkit-box-align: center;
            }
        }
    }
</style>