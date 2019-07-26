<template>
    <div class="app-container">
        <div class="routes-main-container" style="margin-top:30px;">

            <div :className="'sub-navbar'" style="margin-bottom:30px;"> 
            </div>

            <el-table :data="list" style="width: 100%" v-loading.body="listLoading" element-loading-text="Loading" border fit
                      highlight-current-row append>
				
                <el-table-column label="实际金额" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.price}}</span>
                    </template>
                </el-table-column>
				
				<el-table-column label="协议" align="center">
				    <template slot-scope="scope">
				        <span>{{scope.row.content}}</span>
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
                        <el-button size="mini" type="primary" @click="info(scope.row.id)">详情</el-button>
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
import { orderIndex} from '@/api/order'

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
		this.orderIndex()
    },
    methods: {
			info(id)
			{
				this.$router.push({
					path:'/order/detail',
					query:{
						id:id
					}
				})
			},
		 async orderIndex () {
		    let res = await orderIndex(this.searchForm)
			console.log(this.searchForm);
		    if (res.code == ERR_OK) {
				this.listLoading = false
		        this.list = res.data.items
				this.total = res.data.count
		    }
		}, 
        // 分页
        handleCurrentChange (currentPage) {
            Object.assign(this.searchForm, {
                offset: (currentPage - 1) * this.searchForm.limit
            })
            this.orderIndex()
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
        
        submitForm () {
            this.orderIndex()
        },
    }
}
</script>
