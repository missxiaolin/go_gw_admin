<template>
    <div class="app-container">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
            <el-form-item label="文章分类" prop="cid">
                <el-select v-model="ruleForm.cid" placeholder="请选择">
                    <el-option
                    v-for="item in categoryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章标题" prop="title">
                <el-input name="title" type="text" v-model="ruleForm.title" placeholder="文章标题"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input name="author" type="text" v-model="ruleForm.author" placeholder="作者"></el-input>
            </el-form-item>
            <el-form-item label="关键字" prop="keywords">
                <el-input name="keywords" type="text" v-model="ruleForm.keywords" placeholder="关键字"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input name="description" type="text" v-model="ruleForm.description" placeholder="描述"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-radio v-model="ruleForm.status" :label="1">启用</el-radio>
                <el-radio v-model="ruleForm.status" :label="0">禁用</el-radio>
            </el-form-item> 
            <el-form-item label="内容" prop="content">
                <div class="text">
                    <tinymce :height='200' v-model="ruleForm.content"></tinymce>
                    <editorImage  color="#20a0ff" @successCBK="setImg" class="editor-upload-btn"></editorImage>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
                <el-button  @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
import { getCategoryAll } from "api/category"
import { newAdd, newUpdate, newGetInfo } from "api/new"
import { ERR_OK } from '@/api/config'
import Tinymce from "@/base/Tinymce";
import editorImage from "@/base/Tinymce/components/editorImage";

export default {
    name: "new-add",
    components: {
        Tinymce,
        editorImage
    },
    data() {
        return {
            rules: {
                cid: [{
                    required: true,
                    message: '分类ID',
                    trigger: 'blur'
                }],
                title: [{
                    required: true,
                    message: '文章标题',
                    trigger: 'blur'
                }],
                author: [{
                    required: true,
                    message: '作者',
                    trigger: 'blur'
                }],
                content: [{
                    required: true,
                    message: '内容',
                    trigger: 'blur'
                }],
                keywords: [{
                    required: true,
                    message: '关键字',
                    trigger: 'blur'
                }],
                description: [{
                    required: true,
                    message: '描述',
                    trigger: 'blur'
                }],
            },
            ruleForm: {
                id: 0,
                cid: null,
                title: "",
                author: "",
                content: "",
                keywords: "",
                description: "",
                status: 1
            },
            categoryList: []
        };
    },
    mounted () {
        this.getCategory()
        if (!!this.$route.query.id){
            this.getInfo(this.$route.query.id)
        }
    },
    methods: {
        // 获取全部分类
        async getCategory () {
            let res = await getCategoryAll()
            if (res.success == ERR_OK) {
                this.categoryList = res.data
            }
            
        },
        // 塞入图片
        setImg (images) {
            let content = this.ruleForm.content
            images.forEach(item => {
                content = content + `<img src="${item}">`
            })
            this.ruleForm.content = content
        },
        // 验证
        onSubmit (formName) {
            let self = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.ruleForm.id) {
                        self.update()
                    } else {
                        self.add()
                    }
                
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        // 创建
        async add () {
            let res = await newAdd(this.ruleForm)
            if (res.success == ERR_OK) {
                this.goList()
            }
        },
        // 修改
        async update () {
            let res = await newUpdate(this.ruleForm)
            if (res.success == ERR_OK) {
                this.goList()
            }
            
        },
        goList () {
            this.$router.push({
                path: "/new/list",
            })
        },
        // 获取详情
        async getInfo (id) {
            let param = {
                id: id
            }
            let res = await newGetInfo(param)
            if (res.success == ERR_OK) {
                this.ruleForm.id = res.data.id
                this.ruleForm.cid = res.data.cid
                this.ruleForm.title = res.data.title
                this.ruleForm.author = res.data.author
                this.ruleForm.content = res.data.content
                this.ruleForm.keywords = res.data.keywords
                this.ruleForm.description = res.data.description
                this.ruleForm.status = res.data.status
            }
        },
        // 重置
        resetForm (formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>

<style lang="scss" scoped>
.text {
    width: 100%;
    position: relative;
    height: auto;
    overflow: hidden;
    .editor-upload-btn {
        position: absolute;
        right: 10px;
        top: 13px;
    }
}

</style>