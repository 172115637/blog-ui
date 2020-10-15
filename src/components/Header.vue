<template>
    <div id="header">
        <ul class="label-list">
            <li :class="labelIndex===0?'active':''" @click="tabSelect(null,0)"><span class="tag">ALL</span></li>
            <li v-for="(item,index) in articleTypeList" :key="index"
                :class="labelIndex===index+1?'active':''"
                @click="tabSelect(item,index+1)">
                <span class="tag">{{item.typeName}}</span></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                labelIndex: 0,
                articleTypeList: []
            }
        },
        methods: {
            tabSelect(obj, index) {
                this.labelIndex = index;

                this.$store.commit('setSelectTag', obj)
            },
            getArticleTypeList() {
                this.$service.articleTypeList().then(res => {
                    if (res.data.code === 0) {
                        this.articleTypeList = res.data.data
                    }
                })
            }
        },
        created() {
            this.getArticleTypeList();
        }
    }
</script>

<style lang="stylus" scoped>
    #header {
        list-style: none;
        flex-shrink: 0;
        padding: 20px 26px 0 50px;
        display: flex;
        flex-wrap: wrap;

        .label-list {
            list-style: none;
            flex-shrink: 0;
            display: flex;
            flex-wrap: wrap
            margin 0;
            padding 0;
            width 100%;

            li {
                margin-bottom: 20px;
                margin-right: 10px;

                .tag {
                    margin-right: 14px;
                    cursor: pointer;
                    user-select: none;
                    border-radius: 3px;
                    font-size: 14px;
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    padding: 0 15px;
                    background-color: #f2f5f8;
                    color: #849aa4;
                }
            }

            .active {
                .tag {
                    background-color: rgb(53, 147, 242);
                    color: #fff;
                }
            }
        }
    }
</style>