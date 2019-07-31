<template>
    <div class="app-container">
        <div :className="'sub-navbar'" style="margin-bottom:30px;">
            <template>
                <el-button style="margin-left: 10px;" type="primary" @click="createCatrgory(0)">添加分类</el-button>
            </template>
        </div>
        <el-table
            :data="list"
            style="width: 100%"
            row-key="id"
            border
            lazy
            :load="load"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
            prop="id"
            label="ID">
            </el-table-column>
            <el-table-column
            prop="name"
            label="分类名称"
            >
            </el-table-column>
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 1">启用</span>
                    <span v-else>禁用</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="created_at"
            label="创建时间">
            </el-table-column>
            <el-table-column
            prop="updated_at"
            label="修改时间">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="createCatrgory(scope.row.id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加分类" :visible.sync="dialogTableVisible" :modal-append-to-body="false">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
                <el-form-item label="分类名称" prop="name">
                    <el-input name="name" type="text" v-model="ruleForm.name" placeholder="登录名"></el-input>
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
        </el-dialog>
    </div>
</template>

<script>
import { getCategoryList, createCategory, updateCategory, getCategoryInfo } from "api/category"
import { ERR_OK } from '@/api/config'
import { Message } from 'element-ui'

export default {
    name: "category-list",
    data () {
        return {
            list: [],
            searchForm: {
                pid: null,
                name: "",
                status: 1
            },
            dialogTableVisible: false,
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
    },
    methods: {
        createCatrgory (id) {
            this.dialogTableVisible = true
            this.ruleForm.id = 0
            this.ruleForm.name = ""
            this.ruleForm.pid = 0
            this.ruleForm.status = 1
            if( id ) {
                this.getInfo(id)
            }
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
            this.dialogTableVisible = false
            this.searchForm.pid = 0
            if (res.success != ERR_OK) {
                Message(res.msg)
                return
            }
            this.getList()
        },
        // 修改
        async update () {
            let res = await updateCategory(this.ruleForm)
            this.dialogTableVisible = false
            this.searchForm.pid = 0
            if (res.success != ERR_OK) {
                Message(res.msg)
                return
            }
            this.getList()
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
            } else {
                Message(res.msg)
            }
        },
        getList () {
            this.formList = []
            this.list = []
            this.lists(this.searchForm, res => {
                let data = [],
                    formList = []
                    formList.push({
                        id: 0,
                        name: "请选择",
                    })
                res.forEach(item => {
                    item.hasChildren = true
                    data.push(item)
                    formList.push(item)
                })
                this.formList = formList
                this.list = data
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
        // 二级列表
        load(tree, treeNode, resolve) {
            this.searchForm.pid = tree.id
            this.lists(this.searchForm, res => {
                resolve(res)
            })
        }
    }
}
</script>
