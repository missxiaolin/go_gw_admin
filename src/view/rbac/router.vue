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
				</el-row>
                <el-row type="flex" justify="center">
                    <el-button type="info" @click="resetForm('searchForm')">重置</el-button>
                    <el-button type="primary" @click="submitForm('searchForm')">搜索</el-button>
                </el-row>
            </el-form>

            <div :className="'sub-navbar'" style="margin-bottom:30px;">
                <template>
                    <el-button style="margin-left: 10px;" type="primary" @click="routeAdd(0)">新增路由</el-button>
                </template>
            </div>

            <el-table :data="list" style="width: 100%" v-loading.body="listLoading" element-loading-text="Loading" border fit
                      highlight-current-row append>
                <el-table-column align="center" label='ID'>
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>

                <el-table-column label="路由名称" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
				
				<el-table-column label="小组名称" align="center">
				    <template slot-scope="scope">
				        <span>{{scope.row.group.name}}</span>
				    </template>
				</el-table-column>
				
				<el-table-column label="项目名称" align="center">
				    <template slot-scope="scope">
				        <span>{{scope.row.project.name}}</span>
				    </template>
				</el-table-column>
				
                <el-table-column label="路由地址" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.route}}</span>
                    </template>
                </el-table-column>

				 <el-table-column prop="type" label="类型" align="center" :formatter="stateFormat"></el-table-column>
				
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
                        <el-button size="mini" @click="routeAdd(scope.row.id)">编辑</el-button>
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
    </div>
</template>

<script>
import { routerList,infoRouter,delRouter,} from 'api/router'
import { groupList} from 'api/group'
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
            },
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
		// 类型
		stateFormat (row, column) {
			console.log(row)
		    if (row.type === 1) {
		        return '接口路由'
		    } else if (row.type === 0) {
		        return '页面路由'
		    }
		},
        // 获取角色列表
        async fetchData () {
            let res = await routerList(this.searchForm)
            if (res.code == ERR_OK) {
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
        // 添加管理员
        routeAdd (id) {
            this.$router.push({
                path: `/rbac/router/add/${id}`
            })
        },
        // 重置
        resetForm (formName) {
            this.$refs[formName].resetFields()
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
                delRouter(param).then(res => {
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
                UserStatus(params).then(res => {
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
