<template>
    <div class="app-container">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
            <el-form-item label="分类名称" prop="name">
                <el-input name="name" type="text" v-model="ruleForm.name" placeholder="分类名称"></el-input>
            </el-form-item>
            <el-form-item label="上级分类" prop="pid">
                <el-select v-model="ruleForm.pid" placeholder="请选择">
                    <el-option
                    v-for="item in formList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item label="状态" prop="status">
                <el-radio v-model="ruleForm.status" :label="1">启用</el-radio>
                <el-radio v-model="ruleForm.status" :label="0">禁用</el-radio>
            </el-form-item> 
            <el-form-item>
                <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
                <el-button  @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getCategoryList, createCategory, updateCategory, getCategoryInfo } from "api/category"
import { ERR_OK } from '@/api/config'

export default {
    name: 'category-add',
    data () {
        return {
            rules: {
                name: [{
                    required: true,
                    message: '分类名称',
                    trigger: 'blur'
                }],
            },
            formList: [],
            ruleForm: {
                id: 0,
                name: "",
                pid: 0,
                status: 1
            }
        }
    },
    mounted () {
        this.getList()
        if (!!this.$route.query.id){
            this.getInfo(this.$route.query.id)
        }
    },
    methods: {
        getList () {
            this.formList = []
            this.lists(this.searchForm, res => {
                let formList = []
                    formList.push({
                        id: 0,
                        name: "请选择",
                    })
                res.forEach(item => {
                    formList.push(item)
                })
                this.formList = formList
            })
        },
        // 获取列表
        lists (param, cal) {
            getCategoryList(this.searchForm).then(res => {
                if (res.success == ERR_OK) {
                    cal(res.data)
                } else {
                    cal([])
                }
            })

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
            let res = await createCategory(this.ruleForm)
            if (res.success == ERR_OK) {
                this.goList()
            }
        },
        // 修改
        async update () {
            let res = await updateCategory(this.ruleForm)
            if (res.success == ERR_OK) {
                this.goList()
            }
        },
        goList () {
            this.$router.push({
                path: "/category/list",
            })
        },
        // 获取详情
        async getInfo (id) {
            let param = {
                id: id
            }
            let res = await getCategoryInfo(param)
            if (res.success == ERR_OK) {
                this.ruleForm.id = res.data.id
                this.ruleForm.name = res.data.name
                this.ruleForm.pid = res.data.pid
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