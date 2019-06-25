<template>
    <div class="app-container">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
            <el-form-item label="小组名称" prop="name">
                <el-input name="name" type="text" v-model="ruleForm.name" placeholder="小组名称"></el-input>
            </el-form-item>
			
			<el-form-item label="项目名称" prop="project_id">
		  <el-select v-model="ruleForm.project_id" filterable placeholder="请选择">
			<el-option
			  v-for="item in options"
			  :key="item.id"
			  :label="item.name"
			  :value="item.id">
			</el-option>
		  </el-select>
		  </el-form-item>
		  
			
            <el-form-item>
                <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { addGroup, infoGroup } from 'api/group'
import { projectRouterList } from 'api/project'
import { ERR_OK } from '@/api/config'
import { Message } from 'element-ui'

export default {
    'name': 'role-lists',
    data () {
        return {
            rules: {
                name: [{
                    required: false,
                    message: '请输入小组名称',
                    trigger: 'blur'
                }],
                project_id: {
                    required: false,
                    message: '请选择项目',
                    trigger: 'blur'
                }
            },
            ruleForm: {
                id: 0,
                project_id: '',
                name: '',
            },
			options:{},
        }
    },
    created () {
        let id = this.$route.params.id
        if (id != 0) {
            this.ruleForm.id = id
            this.infoGroup(id)
        }
        this.projectInfo()
    },
    methods: {
		// select项目数据
		async projectInfo () {
		    let res = await projectRouterList()
		    if (res.code == ERR_OK) {
		        this.options = res.data
		    }
		},
        // 获取角色详情
        async infoGroup (id) {
            if(!id || id == 0 ){
                return
            }
            let data = {
                id: id
            }
            let res = await infoGroup(data)
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
            let res = await addGroup(this.ruleForm)
            if (res.code == ERR_OK) {
                this.$router.push({
                    path: '/rbac/group'
                })
            }
        }
    }
}
</script>
