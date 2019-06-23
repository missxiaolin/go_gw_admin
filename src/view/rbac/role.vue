<template>
    <div class="app-container">
        <div class="routes-main-container" style="margin-top:30px;">

            <el-form ref="searchForm" :model="searchForm" label-width="80px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="名称：" prop="name">
                            <el-input v-model="searchForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="状态：" prop="status">
                            <el-select v-model="searchForm.status" placeholder="请选择状态" style="width:100%">
                                <el-option label="正常" value="1"></el-option>
                                <el-option label="禁用" value="0"></el-option>
                            </el-select>
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
                    <el-button style="margin-left: 10px;" type="primary" @click="roleAdd(0)">新建角色</el-button>
                </template>
            </div>

            <el-table :data="list" style="width: 100%" v-loading.body="listLoading" element-loading-text="Loading" border fit
                      highlight-current-row append>
                <el-table-column align="center" label='ID'>
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>

                <el-table-column label="角色名称" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="角色介绍" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.comment}}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="status" label="状态" align="center" :formatter="stateFormat"></el-table-column>

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

                <el-table-column label="操作" min-width="120px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="roleAdd(scope.row.id)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
                        <el-button size="mini" v-show="scope.row.status==0" type="success" @click="handleDisable(scope.$index, scope.row.id)">启用</el-button>
                        <el-button size="mini" v-show="scope.row.status==1" type="danger" @click="handleDisable(scope.$index, scope.row.id)">禁用</el-button>
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

        <el-dialog title="添加角色" :visible.sync="dialogTableVisible" :modal-append-to-body="false">
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

                <el-form-item>
                    <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { roleList, addRole, infoRole, delRole, roleStatus } from 'api/role'
import { ERR_OK } from '@/api/config'
import { Message } from 'element-ui'

export default {
    'name': 'role-lists',
    data () {
    return {
        list: [],
        listLoading: true,
        total: 0, // table数据总条数
        page: 1,
        searchForm: {
            offset:0,
            limit: 5,
            name: "",
            status: null
        },
        dialogTableVisible: false,
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
            status: 1
        }
    }
    },
    created () {
        this.fetchData()
    },
    methods: {
        // 获取角色列表
        async fetchData () {
            let res = await roleList(this.searchForm)
            if (res.code == ERR_OK) {
                console.log(res)
                this.list = res.data.items
                this.total = res.data.count
                this.listLoading = false
            }
        },
        // 状态
        stateFormat (row, column) {
            if (row.status === 1) {
                return '可用'
            } else if (row.status === 0) {
                return '禁用'
            }
        },
        // 分页
        handleCurrentChange (currentPage) {
            Object.assign(this.searchForm, {
                offset: currentPage - 1
            })
            this.fetchData()
        },
        // 添加角色
        roleAdd (id) {
            let self = this
            this.ruleForm.id = id
            this.ruleForm.name = ""
            this.ruleForm.comment = ""
            this.ruleForm.status = 1
            if(id){
                self.roleInfo(id)
            }
            this.dialogTableVisible = true
        },
        // 获取角色详情
        async roleInfo (id) {
            let data = {
                id: id
            }
            let res = await infoRole(data)
            if (res.code == ERR_OK) {
                // 合并
                Object.assign(this.ruleForm, res.data)
            }
        },
        // 添加角色验证
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
        // 添加角色
        async add () {
            let res = await addRole(this.ruleForm)
            if (res.code == ERR_OK) {
                this.fetchData()
                this.dialogTableVisible = false
            }
        },
        // 删除角色
        async del (id) {
            let self = this
            let param = {
                'id': id
            }
            this.$confirm('此操作将永久删除角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delRole(param).then(res => {
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
        },
        // 禁用、启用
        handleDisable (index, id) {
            let self = this,
                params = {
                    id: id
                },
                title = self.list[index].status == 0 ? "启用" : "禁用"
            this.$confirm(`此操作将永久${title}角色, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                self.listLoading = true
                roleStatus(params).then(res => {
                    if (res.code == ERR_OK) {
                        self.list[index].status = !this.list[index].status ? 1 : 0
                        self.listLoading = false
                        
                    }else{
                        Message(response.message)
                    }
                })
            })
            
        },
    }
}
</script>
