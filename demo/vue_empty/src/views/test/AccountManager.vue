<template>
    <section class="main_cont">
        <!-- 按钮 -->
        <el-row class="toolbar bdr_radiu f-cb">
            <el-col class="f-fl btn_wrap">
                <el-button type="primary" @click="addUserVisible = true">添加账号</el-button>
            </el-col>
        </el-row>

        <!-- 用户列表 -->
        <el-row>
            <el-table class="user_list" :data="user_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 240px)">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" width="60" align="center" label="序号"></el-table-column>
                <el-table-column prop="id" label="用户编号" width="80" align="center"></el-table-column>

                <el-table-column prop="realName" label="真实姓名" width="80" align="center"></el-table-column>
                <el-table-column prop="mobile" label="手机号" width="auto" align="center"></el-table-column>
                <el-table-column prop="createAt" label="创建日期" width="auto" align="center"></el-table-column>
                <el-table-column prop="updateAt" label="更新日期" width="auto" align="center"></el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editUser(scope.row)" v-on:click="editUserVisible = true">编辑</el-button>
                        <el-button type="text" size="small" @click="delUser(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-row :span="24" class="toolbar f-cb">
                <!-- 分页 -->
                <el-col>
                    <el-pagination class="f-fr pagination"
                       :current-page.sync='page_arg.page_index'
                       :page-sizes="page_arg.page_sizes"
                       :page-size="page_arg.page_size"
                       :layout="page_arg.layout"
                       :total="page_arg.total"
                       @current-change='handleCurrentChange'
                       @size-change='handleSizeChange'>
                    </el-pagination>
                </el-col>
            </el-row>
        </el-row>

        <!-- 添加账号 -->
        <el-dialog title="添加账号" @keyup.enter.native="addUserSubmit('editVoteForm')" :close-on-click-modal="false" :visible.sync="addUserVisible" :before-close="handleClose">
            <el-form :model="addUserData" status-icon :rules="addUserRules" ref="addUserForm" label-width="160px">
                <!--<el-form-item label="兑换码月份(默认一月)" prop="month">
                  <el-input v-model="editConsultationData.month"  placeholder="请输入兑换码月份" clearable></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                  <el-input v-model="addRedeemCodeData.memo" placeholder="请输入备注" clearable></el-input>
                </el-form-item>-->

                <el-form-item>
                    <el-button type="primary" @click="addUserSubmit('addUserForm')">提交</el-button>
                    <el-button @click="resetForm('addUserForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑用户 -->
        <el-dialog title="编辑用户" @keyup.enter.native="editUserSubmit('editVoteForm')" :close-on-click-modal="false" :visible.sync="editUserVisible" :before-close="handleClose">
            <el-form :model="editUserData" status-icon :rules="editUserRules" ref="editUserForm" label-width="160px">
                <!--<el-form-item label="兑换码月份(默认一月)" prop="month">
                  <el-input v-model="editConsultationData.month"  placeholder="请输入兑换码月份" clearable></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                  <el-input v-model="addRedeemCodeData.memo" placeholder="请输入备注" clearable></el-input>
                </el-form-item>-->

                <el-form-item>
                    <el-button type="primary" @click="editUserSubmit('editUserForm')">提交</el-button>
                    <el-button @click="resetForm('editUserForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
import {
    getUser,  // 获取投票列表
} from '../../api/api.js';

export default {
    name: 'account_manager',

    data() {
        return {
            /**
             * common
             */
            listLoading: false,  // lodding动画
            dialogVisible: false,  // 关闭提示

            // 分页参数
            page_arg: {
                page_index: 1, // 当前位于哪页
                total: 0, // 总数
                page_size: 10, // 1页显示多少条
                page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
            },

            /**
             * 用户
             */
            // 用户列表
            user_info: [],  // 存放用户信息列表数据

            /**
             * 添加用户
             */
            // 添加用户数据
            addUserData: {
            },

            // 验证添加用户数据
            addUserRules: {
                /* name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ], */
            },

            /**
             * 编辑用户
             */
            // 编辑用户数据
            editUserData: {
            },

            // 验证编辑用户数据
            editUserRules: {
            },

            /**
             *  弹出表单界面(true 显示, false 隐藏)
             */
            addUserVisible: false,  // 添加用户界面
            editUserVisible: false,  // 编辑用户界面
        }
    },
    methods: {
        /**
         * common
         */
        // 关闭提示
        handleClose(done) {
            this.$confirm('确认关闭？').then(() => {
                done();
            }).catch(() => {});
        },
        // 表单重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        /**
         *  分页
         */
        // 点击页码
        handleCurrentChange() {
            this.getUserList();  // 加载分页数据
        },
        // 设置每页条数
        handleSizeChange(page_size) {
            // console.log(page_size);

            this.page_arg.page_size = page_size;  // 切换size

            this.getUserList();  // 加载分页数据
        },

        /**
         *  api
         *  获取用户信息
         */
        // 获取用户列表
        getUserList () {
            //接口参数
            let param = {
                pageNum: this.page_arg.page_index,  // 当前页码
                pageSize: this.page_arg.page_size,  // 每页条数
            };

            // loading
            this.listLoading = true;

            // 请求接口
            getUser(param).then(res => {
                // console.log(res.data.data.users);

                if (this.user_info != null) {
                    this.listLoading = false;
                    this.user_info = res.data.data.users;
                }

                // 返回分页总数
                this.page_arg.total = res.data.data.count;
            }).catch({});
        },

        /**
         * api
         * 添加用户
         */
        // 提交添加用户表单
        addUserSubmit (formName) {
            // 验证表单
            this.$refs[formName].validate((valid) => {
                //如果验证成功，请求接口数据
                if (valid) {
                    console.log("submit!!")
                } else {  //验证失败跳出
                    this.message.error("表单填写错误");
                }
            });
        },

        /**
         * api
         * 编辑用户
         */
        // 点击编辑
        editUser (row) {
            console.log("编辑", row);
            // console.log(Object.assign({}, row));
        },
        // 提交编辑投票表单
        editUserSubmit (formName) {
            // 验证表单
            this.$refs[formName].validate((valid) => {
                //如果验证成功，请求接口数据
                if (valid) {
                    console.log("submit!!")
                } else {  //验证失败跳出
                    this.message.error("表单填写错误");
                }
            });
        },

        /**
         *  api
         *  删除用户
         */
        delUser (row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                // console.log(Object.assign({}, row));
                console.log("删除", row);
            }).catch(() => {});
        },
    },
    // 预处理
    created () {
        this.getUserList();
    }
}
</script>

<style lang="less" scoped>

</style>