<template>
    <div class="app-container">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
            <el-form-item label="角色名称" prop="name">
                <el-input name="name" type="text" v-model="ruleForm.name" placeholder="角色名称"></el-input>
            </el-form-item>

            <el-form-item label="角色介绍" prop="comment">
                <el-input name="comment" type="text" v-model="ruleForm.comment" placeholder="角色介绍"></el-input>
            </el-form-item>

            <el-form-item label="角色状态" prop="status">
                <el-radio-group v-model="ruleForm.status">
                    <el-radio :label="1">可用</el-radio>
                    <el-radio :label="0">禁用</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="权限" prop="role_list">
                <el-tree
                    ref="tree"
                    :data="treeData"
                    node-key="name"
                    show-checkbox
                    :accordion="true"
                    :default-checked-keys="checkedData"
                    :props="defaultProps">
                </el-tree>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { addRole, infoRole, roleRouterList } from 'api/role'
import { projectRouterList } from 'api/project'
import { ERR_OK } from '@/api/config'
import { Message } from 'element-ui'

export default {
    'name': 'role-lists',
    data () {
        return {
            rules: {
                name: [{
                    required: true,
                    message: '请输入角色名称',
                    trigger: 'blur'
                }],
                comment: {
                    required: true,
                    message: '角色介绍必填',
                    trigger: 'blur'
                }
            },
            ruleForm: {
                id: 0,
                name: '',
                comment: '',
                status: 1,
                router_list: null
            },
            treeData: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            checkedData: []
        }
    },
    created () {
        let id = this.$route.params.id
        if (id != 0) {
            this.ruleForm.id = id
            this.roleInfo(id)
        }
        this.treeDataInfo()
        
    },
    methods: {
        async treeDataInfo () {
            let res = await projectRouterList()
            if (res.code == ERR_OK) {
                this.treeData = res.data
            }
        },
        // 获取角色详情
        async roleInfo (id) {
            if(!id || id == 0 ){
                return
            }
            let data = {
                id: id
            }
            let res = await infoRole(data)
            let resRouters = await roleRouterList(data)
            if (res.code == ERR_OK) {
                // 合并
                Object.assign(this.ruleForm, res.data)
            }
            if (resRouters.code == ERR_OK) {
                let routes = []
                resRouters.data.forEach(function(val,index){
                    routes.push(val.name)
                })
                this.checkedData = routes
            }
        },
        // 添加角色验证
        onSubmit (formName) {
            let self = this,
                routersData = this.$refs.tree.getCheckedNodes(),
                routers = [];
            if (routersData) {
                routersData.forEach(function(val,index){
                    if(!!val.route){
                        routers.push(val.id)
                    }
                })
            }
            this.ruleForm.router_list = routers
            this.$refs[formName].validate((valid) => {
                if (valid) {
                self.add()
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        // 重置
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        // 添加角色
        async add () {
            console.log(this.ruleForm)
            let res = await addRole(this.ruleForm)
            if (res.code == ERR_OK) {
                this.$router.push({
                    path: '/rbac/role'
                })
            }
        }
    }
}
</script>

<style>
    .eboss-tree {
        margin-top: 10px;
        margin-right: 10px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(220, 223, 230);
        border-image: initial;
        overflow: hidden;
        border-radius: 4px;
        padding: 10px;
    }
</style>