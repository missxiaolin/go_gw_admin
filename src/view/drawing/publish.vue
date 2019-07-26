<template>
    <div class="app-container">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
			</el-form-item>
			
			<el-form-item label="询价单标题" prop="title">
			    <el-input name="title" type="text" v-model="ruleForm.title" placeholder="请输入相关询价单"></el-input>
			</el-form-item>
			
			<el-form-item label="截止日期" prop="publish_time">
				<el-date-picker
				  v-model="ruleForm.publish_time"
				  type="datetime"
				  placeholder="选择日期时间">
				</el-date-picker>
			    </el-date-picker>
			</el-form-item>
			
			<el-form-item label="交付周期" prop="lead_time">
				<el-input name="lead_time" type="text" v-model="ruleForm.lead_time" placeholder="请输入整数"></el-input>
			</el-form-item>
			
			<el-form-item label="材料" prop="material">
			<el-select v-model="ruleForm.material" placeholder="请选择" multiple >
			<el-option
			v-for="item in material"
			:key="item.name"
			:label="item.name"
			:value="item.id">
			</el-option>
			</el-select>
			</el-form-item>

			<el-form-item label="工艺类型" prop="type">
			    <el-tree
					@check-change="getChecked"
					default-expand-all	
					auto-expand-parent
			        ref="tree"
			        :data="drawingType"
			        node-key="id"
			        show-checkbox
			        :accordion="true"
			        :default-checked-keys="checkedData"
			        :props="defaultProps" >
			    </el-tree>
			</el-form-item>
			


            <el-form-item label="预算价格" prop="price">
                <el-input name="price" type="text" v-model="ruleForm.price" placeholder="估价"></el-input>
            </el-form-item>

			<el-form-item label="数量" prop="number">
			    <el-input name="number" type="text" v-model="ruleForm.number"  placeholder="数量"></el-input>
			</el-form-item>
			
			<el-form-item label="交货时间" prop="finish_time">
				<el-date-picker
				  v-model="ruleForm.finish_time"
				  type="datetime"
				  placeholder="选择日期时间">
				</el-date-picker>
                </el-date-picker>
            </el-form-item>
			
		<el-form-item label="图纸" prop="drawing">
						  <el-upload
			action="https://upload.qiniup.com"  
			:drag="true"
			:on-success="handleAvatarSuccess"
			:on-error="handleError"
			:before-upload="beforeAvatarUpload"
			:data="postData"  multiple>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>      </div>
			<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不      超过500kb</div>
		</el-upload>
		</el-form-item>
		
		<el-form-item label="补充说明" prop="explain">
			<el-input
			  type="textarea"
			  :rows="2"
			  placeholder="请输入内容"
			  v-model="ruleForm.explain">
			</el-input>
		</el-form-item>
		
            <el-form-item>
                <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script src="https://unpkg.com/qiniu-js@<version>/dist/qiniu.min.js"></script>
<script>
import { drawingSave,uploadToken,info } from 'api/drawing'
import {drawingType} from 'api/drawingType'
import {material} from 'api/material'
import { ERR_OK } from '@/api/config'
import { Message } from 'element-ui'


export default {
    'name': 'role-lists',
    data () {
        return {
			drawingType: [],
			defaultProps: {
			    children: 'children',
			    label: 'name'
			},
			checkedData: [],
			postData:{},
			finish_time: '',
            rules: {
				title: [{
				    required: true,
				    message: '请选择类型',
				    trigger: 'blur'
				}],
				publish_time: [{
				    required: true,
				    message: '请选择类型',
				    trigger: 'blur'
				}],
				lead_time: [{
				    required: true,
				    message: '请输入整数',
				    trigger: 'blur'
				}], 
				type: [{
				    required: true,
				    message: '请选择类型',
				    trigger: 'blur'
				}], 
				material: [{
					required: true,
					message: '请选择材料',
					trigger: 'blur'
				}],
				price: [{
					required: true,
					message: '请输入估价',
					trigger: 'blur'
				}],
				number: [{
					required: true,
					message: '请输入数量',
					trigger: 'blur'
				}],
				finish_time: [{
					required: true,
					message: '请选择交货时间',
					trigger: 'blur'
				}],
				},
            ruleForm: {
                id: 0,
                material: '',
				type:'',
				drawing:'',
            },
			
        }
    },
    created () {
        let id = this.$route.params.id
        if (id != 0) {
            this.ruleForm.id = id
			this.info(id)
        }
		this.uploadtoken()
		this.dwtype()
		this.material()
    },
    methods: {
		getChecked()
		{
			this.ruleForm.type = this.$refs.tree.getCheckedKeys()
		},
		handleAvatarSuccess(response, file, fileList)
		{
			console.log(response,file,fileList)
			this.ruleForm.drawing += response.key + ';'
		},
		handleError(err, file, fileList)
		{
			console.log(err,file,fileList)
		},
		beforeAvatarUpload(file)
		{
			this.postData.key = file.name;        // 通过设置key为文件名，上传到七牛中会显示对应的图片名
			  // debugger
			console.log(file)
		},
		async info(id)
		{
			let params = {
				'id':id
			}
			var res = await info(params)
			if (res.code == ERR_OK) {
			    this.ruleForm = res.data
				console.log(res)
			}
		},
		//图纸分类
		async dwtype()
		{
			var res = await drawingType()
			if (res.code == ERR_OK) {
			    this.drawingType = res.data
				console.log(res)
			}
		},
		//图纸材料
		async material()
		{
			var res = await material()
			
			if (res.code == ERR_OK) {
			    this.material = res.data
				console.log(res)
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
		async uploadtoken(){
			let res = await uploadToken()
			if (res.code == ERR_OK) {
			    //this.postData.upload_token=res.data
			    this.postData.token=res.data
			}
		},
        // 添加路由
        async add () {
            let res = await drawingSave(this.ruleForm)
            if (res.code == ERR_OK) {
                this.$router.push({
                    path: '/drawing/index'
                })
            }
        }
    }
}
</script>
