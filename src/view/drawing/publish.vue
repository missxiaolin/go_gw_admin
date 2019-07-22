<template>
    <div class="app-container">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
			<!-- <el-form-item label="项目名称" prop="project_id">
			<el-select v-model="ruleForm.project_id" filterable placeholder="请选择">
						<el-option
						  v-for="item in options"
						  :key="item.id"
						  :label="item.name"
						  :value="item.id">
						</el-option>
			</el-select> -->
			</el-form-item>
			
			<el-form-item label="图纸类型" prop="type">
				 <el-select v-model="ruleForm.type" placeholder="请选择" multiple >
					<el-option
					  v-for="item in options"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				 </el-select>
			</el-form-item>
			
			<el-form-item label="图纸材料" prop="material">
			<el-select v-model="ruleForm.material" placeholder="请选择" multiple >
			<el-option
			v-for="item in options"
			:key="item.value"
			:label="item.label"
			:value="item.value">
			</el-option>
			</el-select>
			</el-form-item>

            <el-form-item label="估价" prop="price">
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

            <el-form-item>
                <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script src="https://unpkg.com/qiniu-js@<version>/dist/qiniu.min.js"></script>
<script>
import { drawingSave,uploadToken } from 'api/drawing'
import { ERR_OK } from '@/api/config'
import { Message } from 'element-ui'


export default {
    'name': 'role-lists',
    data () {
        return {
			postData:{},
			fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
			 
			finish_time: '',
			options: [{
			  value: '1',
			  label: '黄金糕'
				}, {
			  value: '2',
			  label: '双皮奶'
			}],
            rules: {
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
			//options:{},
			groupOption:{},
        }
    },
    created () {
        let id = this.$route.params.id
        if (id != 0) {
            this.ruleForm.id = id
        }
		this.uploadtoken()
    },
    methods: {
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
		//图片上传
		handeImage(file, fileList) {
			console.log(file, fileList)
		},
        handleRemove(file, fileList) {
        console.log(file, fileList);
		  },
		handlePreview(file) {
			console.log(file);
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
			this.postData.upload_token=res.data
			this.postData.token=res.data
		},
        // 添加路由
        async add () {
            let res = await drawingSave(this.ruleForm)
            if (res.code == ERR_OK) {
                this.$router.push({
                    path: '/drawing/admin'
                })
            }
        }
    }
}
</script>
