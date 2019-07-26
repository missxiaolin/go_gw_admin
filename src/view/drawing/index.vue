<template>
    <div class="app-container">
        <div class="routes-main-container" style="margin-top:30px;">

            <el-form ref="searchForm" :model="searchForm" label-width="80px">
                <el-row>
					<el-col :span="8">
					    <el-form-item label="审核状态：" prop="status">
						<el-select v-model="searchForm.status" filterable placeholder="请选择">
									<el-option
									  v-for="item in options"
									  :key="item.id"
									  :label="item.name"
									  :value="item.id">
									</el-option>
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
                    <el-button style="margin-left: 10px;" type="primary" @click="drawingAdd(0)">添加询价单</el-button>
                </template>
            </div>

            <el-table :data="list" style="width: 100%" v-loading.body="listLoading" element-loading-text="Loading" border fit
                      highlight-current-row append>
                <!-- <el-table-column align="center" label='ID'>
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column> -->

                <el-table-column label="图纸编号" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.drawing_number}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="询价单标题" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.title}}</span>
                    </template>
                </el-table-column>
				
				<el-table-column label="预算价格" align="center">
				    <template slot-scope="scope">
				        <span>{{scope.row.price}}</span>
				    </template>
				</el-table-column>
				
				<el-table-column label="数量" align="center">
				    <template slot-scope="scope">
				        <span>{{scope.row.number}}</span>
				    </template>
				</el-table-column>
				
				<el-table-column label="审核状态" align="center">
				    <template slot-scope="scope">
				        <span>{{scope.row.status}}</span>
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

                <el-table-column label="操作" min-width="120px" align="center">
                    <template slot-scope="scope">
						<el-button v-if="scope.row.status==0" size="mini" type="success" @click="publish(scope.row.id)">发布</el-button>
                        <el-button v-if="scope.row.status == 0" size="mini" @click="drawingAdd(scope.row.id)">编辑</el-button>
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
    </div>
</template>

<script>
import { drawingList,delDrawing,publish } from '@/api/drawing'
import { ERR_OK } from '@/api/config'
import { Message } from 'element-ui'
import { getToken } from '@/common/js/cache'

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
                limit: 10,
            },
			options: [{
				  id: '0',
				  name: '草稿'
				}, {
				  id: '1',
				  name: '审核中'
				}, {
				  id: '2',
				  name: '审核通过'
				}, {
				  id: '3',
				  name: '审核不通过'
				}],
				value: ''
        }
    },
    created () {
		this.drawingList()
    },
    methods: {
		async publish (id) {
			let param = {
			    'id': id
			}
			let res = await publish(param)
			if (res.code == ERR_OK) {
				    this.$message({
				        type: 'success',
				        message: '发布成功!'
				    })
				    this.drawingList()
			}
		},
		 async drawingList () {
		    let res = await drawingList(this.searchForm)
		    if (res.code == ERR_OK) {
				this.listLoading = false
		        this.list = res.data.items
				this.total = res.data.count
		    }
		}, 
        // 分页
        handleCurrentChange (currentPage) {
			console.log(121)
			console.log(this.searchForm.limit)
            Object.assign(this.searchForm, {
                offset: (currentPage - 1) * this.searchForm.limit
            })
            this.drawingList()
        },
        // 添加
        drawingAdd (id) {
            this.$router.push({
                    path: `publish/${id}`
            })
        },
        // 重置
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        // 删除
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
                delDrawing(param).then(res => {
                    if (res.code == ERR_OK) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        self.drawingList()
                    }
                })
            })
        },
        submitForm () {
            this.drawingList()
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
