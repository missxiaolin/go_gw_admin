<template>
    <div class="app-container">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
            <el-form-item label="路由名称" prop="name">
                <el-input name="name" type="text" v-model="ruleForm.name" placeholder="路由名称"></el-input>
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
			
			<el-form-item label="小组名称" prop="group_id">
			<el-select v-model="ruleForm.group_id" filterable placeholder="请选择">
						<el-option
						  v-for="item in groupOption"
						  :key="item.id"
						  :label="item.name"
						  :value="item.id">
						</el-option>
			</el-select>
			</el-form-item>
			
            <el-form-item label="路由地址" prop="route">
                <el-input name="route" type="text" v-model="ruleForm.route" placeholder="路由地址"></el-input>
            </el-form-item>

			<el-form-item label="请求方法" prop="method">
			    <el-input name="method" type="text" v-model="ruleForm.method"  placeholder="请求方式"></el-input>
			</el-form-item>
			
            <el-form-item label="类型" prop="type">
                <el-radio-group v-model="ruleForm.type">
                    <el-radio :label="1">接口路由</el-radio>
                    <el-radio :label="0">页面路由</el-radio>
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
import { addRouter, infoRouter } from 'api/router'
import { projectList } from 'api/project'
import { groupList } from 'api/group'
import { ERR_OK } from '@/api/config'
import { Message } from 'element-ui'

export default {
    'name': 'role-lists',
    data () {
        return {
            rules: {
                name: [{
                    required: true,
                    message: '请输入名称',
                    trigger: 'blur'
                }],
                group_id:  [{
                    required: true,
                    message: '请选择小组',
                    trigger: 'blur'
                }],
				project_id: [{
				    required: true,
				    message: '请选择项目',
				    trigger: 'blur'
				}],
				route: [{
				    required: true,
				    message: '请输入路由地址',
				    trigger: 'blur'
				}],
				method:[{
					required: true,
					message: '请输入请求方式',
					trigger: 'blur'
				}],
				type:[{
					required: true,
					message: '请选择类型',
					trigger: 'blur'
				}],
				},
            ruleForm: {
                id: 0,
                name: '',
				route:'',
				method:'post',
				project_id:'',
				group_id:'',
				type:'',
            },
			options:{},
			groupOption:{},
        }
    },
    created () {
        let id = this.$route.params.id
        if (id != 0) {
            this.ruleForm.id = id
            this.RouterInfo(id)
        }
        this.project()
		this.group()
    },
    methods: {
		// select项目数据
		async project () {
		    let res = await projectList()
		    if (res.code == ERR_OK) {
				console.log(res.data)
		        this.options = res.data.items
		    }
		},
		async group () {
			let res = await groupList()
			if(res.code == ERR_OK) {
				console.log(res.data)
				this.groupOption = res.data.items
			}
		},
        // 获取角色详情
        async RouterInfo (id) {
            if(!id || id == 0 ){
                return
            }
            let data = {
                id: id
            }
            let res = await infoRouter(data)
            if (res.code == ERR_OK) {
                // 合并
                Object.assign(this.ruleForm, res.data)
            }
        },
        // 添加路由验证
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
        // 添加路由
        async add () {
            console.log(this.ruleForm)
            let res = await addRouter(this.ruleForm)
            if (res.code == ERR_OK) {
                this.$router.push({
                    path: '/rbac/router'
                })
            }
        }
    }
}
</script>
