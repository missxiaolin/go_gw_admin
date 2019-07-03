<template>
    <div class="app-container">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
            <el-form-item label="管理员名称" prop="name">
                <el-input name="name" type="text" v-model="ruleForm.name" placeholder="管理员名称"></el-input>
            </el-form-item>
			
			<el-form-item label="唯一键" prop="key">
                <el-input name="key" type="text" v-model="ruleForm.key" placeholder="唯一键"></el-input>
            </el-form-item>
			
			<el-form-item label="角色名称" prop="role_id">
			<el-select v-model="ruleForm.role_id" multiple filterable placeholder="请选择">
						<el-option
						  v-for="item in options"
						  :key="item.id"
						  :label="item.name"
						  :value="item.id">
						</el-option>
			</el-select>
			</el-form-item>
			
			
            <el-form-item label="管理员手机号" prop="mobile">
                <el-input name="mobile" type="text" v-model="ruleForm.mobile" placeholder="管理员手机号"></el-input>
            </el-form-item>

			<el-form-item label="管理员密码" prop="password">
			    <el-input name="password" type="text" v-model="ruleForm.password"  placeholder="管理员密码"></el-input>
			</el-form-item>
			
            <el-form-item label="角色状态" prop="status">
                <el-radio-group v-model="ruleForm.status">
                    <el-radio :label="1">可用</el-radio>
                    <el-radio :label="0">禁用</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { addUser, infoUser } from 'api/user'
import { roleList } from 'api/role'
import { ERR_OK } from '@/api/config'
import { Message } from 'element-ui'

export default {
    'name': 'role-lists',
    data () {
        return {
            rules: {
                name: [{
                    required: false,
                    message: '请输入管理员名称',
                    trigger: 'blur'
                }],
                mobile: {
                    required: false,
                    message: '请输入管理员手机号',
                    trigger: 'blur'
                },
				role_id: {
				    required: false,
				    message: '请选择角色',
				    trigger: 'blur'
				}
            },
            ruleForm: {
                id: 0,
                name: '',
				key: '',
                mobile: '',
				password: '',
				role_id:'',
                status: 1
            },
			options:{}
        }
    },
    created () {
        let id = this.$route.params.id
        if (id != 0) {
            this.ruleForm.id = id
            this.UserInfo(id)
        }
        this.userList()
    },
    methods: {
		// select项目数据
		async userList () {
		    let res = await roleList()
		    if (res.code == ERR_OK) {
				console.log(res.data)
		        this.options = res.data.items
		    }
		},
        // 获取角色详情
        async UserInfo (id) {
            if(!id || id == 0 ){
                return
            }
            let data = {
                id: id
            }
            let res = await infoUser(data)
            if (res.code == ERR_OK) {
                // 合并
                Object.assign(this.ruleForm, res.data)
            }
        },
        // 添加管理员验证
        onSubmit (formName) {
            let self = this
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
        // 添加管理员
        async add () {
            console.log(this.ruleForm)
            let res = await addUser(this.ruleForm)
            if (res.code == ERR_OK) {
                this.$router.push({
                    path: '/rbac/user'
                })
            }
        }
    }
}
</script>
