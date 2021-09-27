<template>
    <section class="header_nav f-oh">
        <el-row class="header_nav f-cb">
            <el-col class="header_left f-oh">
                <el-row>
                    <el-col :span="4" class="logo f-oh">
                        <img src="../assets/logo.png" alt="">
                    </el-col>
                    <el-col :span="18" class="title f-oh">
                        <span>{{ title }}</span>
                    </el-col>
                </el-row>
            </el-col>
            <el-col class="header_right f-oh">
                <el-row el-row type="flex">
                    <el-col :span="8" class="avatar f-oh">
                        <img src="../assets/images/portrait.png" alt="">
                    </el-col>
                    <el-col :span="11" class="welcome f-oh">
                        <span>欢迎使用</span>
                    </el-col>
                    <el-col :span="4" class="title f-oh">
                        <el-dropdown trigger="click" @command='setDialogInfo'>
                            <span class="el-dropdown-link f-csp">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command='modify_password'>修改密码</el-dropdown-item>
                                <el-dropdown-item command='logout'>注销</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <!-- 修改密码 -->
        <el-dialog title="修改密码" @keyup.enter.native="submitForm('modifyForm')" :close-on-click-modal="false" :visible.sync="modifyUserVisible" :before-close="handleClose">
            <el-form :model="modifyUser" @keyup.enter.native="submitForm('modifyForm')" status-icon :rules="rules" ref="modifyForm" class="loginForm" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="modifyUser.username"  placeholder="请输入用户名" clearable></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input v-model="modifyUser.password" placeholder="请输入新密码" type="password" clearable></el-input>
                </el-form-item>
                <el-form-item label="重复新密码" prop="newPwd2">
                    <el-input v-model="modifyUser.newPwd2" placeholder="请输入新密码" type="password" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('modifyForm')" class="submit_btn">修改密码</el-button>
                    <el-button @click="resetForm('modifyForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
/* import {
    getUser,  // 获取用户
} from "@/api/user" */

import {
    Logout,  // 登出
    ModifyPassword,  // 修改密码
} from "@/api/admin"

export default {
    name: "head-nav",

    data () {
        // 校验重复密码
        const validatePass2 = (rule, value, callback) => {
            if (value !== this.modifyUser.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };

        return {
            // 标题
            // title: this.$store.state.common.title,
            title: this.$store.getters.title,

            modifyUserVisible: false,

            userCode: "",  // 登录用户id

            currentUser: {},  // 当前用户

            modifyUser: {
                userId: "",
                username: "",
                password: "",  //新密码
                newPwd2: ""  //重复新密码
            },
            rules: {
                password: [
                    { required: true, message: "密码不能为空", trigger: "blur" },
                    { min: 5, message: "长度不小于 5 个字符", trigger: "blur" }
                ],
                newPwd2: [
                    { required: true, message: "确认密码不能为空", trigger: "blur" },
                    { min: 5, message: "长度不小于 5 个字符", trigger: "blur" },
                    //使用自定义验证规则，在失去焦点触发
                    { validator: validatePass2, trigger: "blur" }
                ]
            },
        }
    },
    methods: {
        /**
         * common
         */
        //关闭提示
        handleClose(done) {
            this.$confirm('确认关闭？').then(() => {
                done();
                this.resetForm('modifyForm');
            }).catch(err => {
                throw err;
            });
        },

        //表单重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        // 判断对象为空
        objIsEmpty(obj) {
            if(JSON.stringify(obj) == '{}' ){
                return true;
            }

            return false;
        },

        /**
         * api getUser
         * 获取用户
         */
        getUserInfo () {
            getUser().then(res => {
                console.log("获取用户", res)
            }).catch({});
        },

        // 下拉框属性
        setDialogInfo(cmditem) {
            if (!cmditem) {
                this.$message("菜单选项缺少command属性");
                return;
            }

            switch (cmditem) {
                case "modify_password":
                    this.modifyPassword();
                    break;
                case "logout":
                    this.logout();
                    break;
            }
        },

        // 修改密码
        modifyPassword() {
            if(!this.objIsEmpty(this.$refs)) {
                this.$refs.clearValidate;
                this.modifyUser = {
                    userId: "",
                    username: "",
                    password: "",  //新密码
                    newPwd2: ""  //重复新密码
                }
            }

            // this.$router.push("/modify_password");
            this.modifyUserVisible = true;
        },

        // 提交表单
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    //验证通过，密码进行md5加密
                    this.modifyUser.password = this.md5(this.modifyUser.password);

                    let params = {
                        userId: this.modifyUser.userId,
                        username: this.modifyUser.username,
                        password: this.modifyUser.password,
                    }

                    this.modifyUserVisible = false;
                    
                    setTimeout(()=>{
                        this.$message.success("密码修改成功");
                    }, 2000);

                    // console.log(params);

                    /* ModifyPassword(qs.stringify(params)).then(res => {
                        // console.log(res);

                        if (res.data.code == 1){
                            this.$message.warning(res.data.msg);
                        }

                        if (res.data.code == 0) {
                            this.$message.success("密码修改成功");
                        }

                        this.modifyUser.password = "";
                        this.modifyUser.newPwd2 = "";

                        this.modifyUserVisible = false;
                    }).catch({}); */
                } else {
                    this.$message.error("表单填写错误");
                }
            });
        },

        // 登出
        logout() {
            this.$message.success("注销成功");
            this.$router.push("/login");

            /* Logout().then(() => {
                this.$message.success("注销成功");

                localStorage.removeItem("code");
                localStorage.removeItem("userCode");
                this.$router.push("/login");
            }).catch({}); */
        },
    },
    created (){
        // this.getUserInfo();
    }
};
</script>

<style lang="less" scoped>
@fontColor: #fff;

/* header_nav */
.header_nav{
    min-width: 390px;
    height: 100%;

    span {
        color: @fontColor;
    }

    .title span{
        display: block;
        height: 55px;
        line-height: 55px;
    }

    /* header_left */
    .header_left {
        width: 250px;

        .logo{
            margin: 0 8px 0 10px;

            img{
                height: 40px;
                width: 40px;
                margin-top: 10px;
            }
        }
    }

    /* header_left */
    .header_right {
        width: initial;
        min-width: 140px;
        float: right;

        .avatar img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-top: 10px;
        }

        .welcome span{
            display: block;
            height: 55px;
            line-height: 55px;
        }
    }
}
</style>
