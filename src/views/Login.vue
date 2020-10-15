<template>
    <div id="login">
        <div class="login-form-box">
            <div style="height: 30px"></div>
            <h2 class="title">博客 登录</h2>
            <el-col :span="10" :offset="7">
                <div class="grid-content bg-purple">
                    <el-form :model="form" class="inputgroup-box">
                        <el-input v-model="form.username" placeholder="管理员帐号"></el-input>
                        <el-input v-model="form.password" placeholder="密码" show-password></el-input>
                    </el-form>
                    <el-button type="primary" class="login-btn" :disabled="flag" @click="login()">登录</el-button>
                    <p class="date" style="font-size: 14px">© 2019-2020</p>
                    <p class="lang">
                        <span>中文</span>
                        <span>English</span>
                    </p>
                </div>
            </el-col>
        </div>
    </div>
</template>

<script>
    import cookieUtil from "../utils/cookieUtil";

    export default {
        name: "Login",
        data() {
            return {
                form: {
                    username: "",
                    password: ""
                },
                flag: false
            }
        },
        methods: {
            login() {
                if (this.form.username === '') {
                    this.$message({
                        message: '用户名不能为空',
                        type: 'warning'
                    });
                    return
                }
                if (this.form.password === '') {
                    this.$message({
                        message: '密码不能为空',
                        type: 'warning'
                    });
                    return
                }
                this.$service.sign(this.form).then(res => {
                    if (res.data.code === 0) {
                        this.$notify({
                            title: '登录成功',
                            message: '正在跳转',
                            type: 'success'
                        });
                        cookieUtil.setCookie("token", res.data.data.token)
                        this.$router.replace({path: "/"})
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: res.data.msg
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    #login {
        height: 100%;
        width: 100%;
        background-image: linear-gradient(to bottom, #2a80e6 0%, #15c0f3 100%);
        position: absolute;
        z-index: 1;

        .login-form-box {
            width: 680px;
            padding: 20px;
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 0.85);
            position: absolute;
            z-index: 2;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

            .band {
                width: 80px;
                left: 50%;
                transform: translateX(-50%);
            }

            .title {
                padding: 0;
                margin: 0;
                text-align: center;
            }

            .inputgroup-box {
                margin: 20px 0px;

                .remember-checked {
                    margin-top: 5px;
                }
            }

            .login-btn, .facelogin-btn {
                display: block;
                width: 100%;
                margin: 10px 0px;
            }

            .date {
                text-align: center;
            }

            .lang {
                text-align: center;

                span {
                    padding: 0px 20px;
                    cursor: pointer;
                }
            }
        }
    }
</style>