<template>
    <div class="app-container">
        <div class="routes-main-container" style="margin-top:30px;">

            <el-form ref="searchForm" :model="searchForm" label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="秘钥：" prop="key">
                            <el-input v-model="searchForm.key"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="名称：" prop="name">
                            <el-input v-model="searchForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                <el-button type="info" @click="resetForm('searchForm')">重置</el-button>
                <el-button type="primary" @click="submitForm('searchForm')">搜索</el-button>
                </el-row>
            </el-form>

            <div :className="'sub-navbar'" style="margin-bottom:30px;">
                <template>
                    <el-button style="margin-left: 10px;" type="primary" @click="projectAdd(0)">新建项目</el-button>
                </template>
            </div>

            <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit
                      highlight-current-row>
                <el-table-column align="center" label='ID'>
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>

                <el-table-column label="项目私钥" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.key}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="项目名称" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="项目介绍" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.comment}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="创建时间" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.created_at}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="修改时间" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.updated_at}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="projectAdd(scope.row.id)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
                
            </el-table>

            <el-row type="flex" justify="center" style="margin-top: 30px;">
                <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-size="searchForm.limit"
                :total="total">
                </el-pagination>
            </el-row>
        </div>

        <el-dialog title="添加项目" :visible.sync="dialogTableVisible" :modal-append-to-body="false">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
                <el-form-item label="项目名称" prop="name">
                    <el-input name="name" type="text" v-model="ruleForm.name" placeholder="项目名称"></el-input>
                </el-form-item>

                <el-form-item label="项目秘钥" prop="key">
                    <el-input name="key" type="text" v-model="ruleForm.key" placeholder="项目秘钥"></el-input>
                </el-form-item>

                <el-form-item label="项目介绍" prop="comment">
                    <el-input name="comment" type="text" v-model="ruleForm.comment" placeholder="项目介绍"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { projectList, addProject, infoProject, delProject } from 'api/project'
import { ERR_OK } from '@/api/config'
export default {
    'name': 'project-lists',
    data () {
    return {
        list: [],
        listLoading: true,
        total: 0, // table数据总条数
        page: 1,
        searchForm: {
            offset:0,
            limit: 5,
            key: "",
            name: ""
        },
        dialogTableVisible: false,
        rules: {
        name: [{
            required: true,
            message: '请输入项目名称',
            trigger: 'blur'
        }],
        key: [{
            required: true,
            message: '请输入项目秘钥',
            trigger: 'blur'
        }],
        comment: {
            required: true,
            message: '项目介绍必填',
            trigger: 'blur'
        }
        },
        ruleForm: {
            id: 0,
            key: "",
            name: '',
            comment: ''
        }
    }
    },
    created () {
        this.fetchData()
    },
    methods: {
        // 获取项目列表
        async fetchData () {
            let res = await projectList(this.searchForm)
            if (res.code == ERR_OK) {
                this.list = res.data.items
                this.total = res.data.count
                this.listLoading = false
            }
        },
        // 分页
        handleCurrentChange (currentPage) {
            Object.assign(this.searchForm, {
                offset: currentPage - 1
            })
            this.fetchData()
        },
        // 添加项目
        projectAdd (id) {
            let self = this
            this.ruleForm.id = id
            this.ruleForm.name = ""
            this.ruleForm.key = ""
            this.ruleForm.comment = ""
            if(id){
                self.projectInfo(id)
            }
            this.dialogTableVisible = true
        },
        // 获取项目详情
        async projectInfo (id) {
            let data = {
                id: id
            }
            let res = await infoProject(data)
            if (res.code == ERR_OK) {
                // 合并
                Object.assign(this.ruleForm, res.data)
            }
        },
        // 验证
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
        // 添加项目
        async add () {
            let res = await addProject(this.ruleForm)
            if (res.code == ERR_OK) {
                this.fetchData()
                this.dialogTableVisible = false
            }
        },
        async del (id) {
            let self = this
            let param = {
                'project_id': id
            }
            this.$confirm('此操作将永久删除项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delProject(param).then(res => {
                    console.log(res)
                    if (res.code == ERR_OK) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        self.fetchData()
                    }
                })
            })
        },
        submitForm () {
            this.fetchData()
        }
    }
}
</script>
