<template>
    <div id="article-save">
        <el-form ref="form" :inline="true" :model="form" label-width="80px"
                 style="display: flex;align-items: center;justify-content: space-between;margin-top: 15px;">
            <div>
                <el-form-item label="文字标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="文章分类">
                    <el-select v-model="form.typeId" placeholder="请选择">
                        <el-option v-for="(item,index) in articleTypeList" :key="index" :label="item.typeName"
                                   :value="item.typeId">
                            <span style="float: left">{{ item.typeName }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px" @click="delType(item.typeId)"><i
                                    class="el-icon-close"></i></span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <el-form-item>
                <el-button type="primary" @click="dialogVisible=true">创建类别</el-button>
                <el-button type="success" @click="save()">立即发布</el-button>
                <el-button type="info" @click="$router.replace({path:'/home/main'})">放弃</el-button>
            </el-form-item>
        </el-form>
        <mavon-editor ref="md" @imgAdd="$imgAdd" :toolbars="markdownOption" v-model="form.content" :ishljs="true"/>

        <el-dialog
                title="请填写文章类别名称"
                :visible.sync="dialogVisible"
                width="30%">
            <el-input v-model="typeName" placeholder="请输入内容"></el-input>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveType()">确 定</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    import mavonEditor from "mavon-editor";

    export default {
        name: "ArticleSave",
        data() {
            return {
                markdownOption: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                },
                form: {
                    title: "",
                    typeId: "",
                    content: ""
                },
                dialogVisible: false,
                articleTypeList: [],
                typeName: ""
            }
        },
        methods: {
            getArticleTypeList() {
                this.$service.articleTypeList().then(res => {
                    if (res.data.code === 0) {
                        this.articleTypeList = res.data.data
                    }
                })
            },
            getDetail() {
                if (this.$route.query.id == null) {
                    return;
                }
                this.$service.articleDetail({articleId: this.$route.query.id}).then((res => {
                    if (res.data.code === 0) {
                        this.form = res.data.data
                    }
                }))
            },
            save() {
                if (this.form.title.trim() === '') {
                    this.$message({
                        message: '文章标题不能为空',
                        type: 'warning'
                    });
                    return
                }
                if (this.form.typeId === null || this.form.typeId === '') {
                    this.$message({
                        message: '请选择文章类别',
                        type: 'warning'
                    });
                    return
                }

                if (this.form.content === null || this.form.content === '') {
                    this.$message({
                        message: '文章内容不能为空',
                        type: 'warning'
                    });
                    return
                }
                this.$service.articleSave(this.form).then((res => {
                    if (res.data.code === 0) {
                        this.$notify({
                            title: '成功',
                            message: '保存文章成功',
                            type: 'success'
                        });
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '保存失败'
                        });
                    }
                }))
            },
            delType(id) {
                this.$confirm('删除后，该类别下的文章将会删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$service.articleTypeDel({typeId: id}).then((res => {
                        if (res.data.code === 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.form.typeId = ""
                            this.getArticleTypeList();
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
            },
            saveType() {
                if (this.typeName.trim() === '') {
                    this.$message({
                        message: '文章类别名称不能为空',
                        type: 'warning'
                    });
                    return
                }
                this.$service.articleTypeSave({typeName: this.typeName}).then((res => {
                    if (res.data.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '保存成功!'
                        });
                        this.getArticleTypeList();
                        this.dialogVisible = false;
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '保存失败'
                        });
                    }
                }))

            },
            $imgAdd(pos, file) {
                this.$service.uploadImg(file).then(res => {
                    if (res.data.code === 0) {
                        this.$message({
                            message: '上传成功',
                            type: 'success'
                        });
                        this.$refs.md.$img2Url(pos, res.data.data[0]);
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: res.data.msg
                        });
                    }

                })
            }
        },
        created() {
            this.getArticleTypeList();
            this.getDetail();
        }
    }
</script>

<style scoped>

</style>