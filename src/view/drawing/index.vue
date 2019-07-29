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
              <span v-if="scope.row.status == 0">草稿</span>
              <span v-else-if="scope.row.status == 1">审核中</span>
              <span v-else-if="scope.row.status == 2">审核通过</span>
              <span v-else>审核不通过</span>

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
                        <el-button v-if="scope.row.status == 2" size="mini" type="success" @click="offerDateReady(scope.row)">查看报价</el-button>
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

        <!-- 报价 -->
        <el-dialog :title="offerFormTitle" :visible.sync="offerFormVisible">

          <el-table :data="offerFormList" v-loading.body="listLoading" element-loading-text="Loading" border fit
                          highlight-current-row>
            <el-table-column align="center" label='报价编号'>
              <template slot-scope="scope">
                {{scope.row.id}}
              </template>
            </el-table-column>
            <el-table-column align="center" label='报价用户ID'>
              <template slot-scope="scope">
                {{scope.row.user_id}}
              </template>
            </el-table-column>
            <el-table-column align="center" label='报价'>
              <template slot-scope="scope">
                {{scope.row.price}}
              </template>
            </el-table-column>
            <el-table-column align="center" label='保证金'>
              <template slot-scope="scope">
                {{scope.row.bond}}
              </template>
            </el-table-column>
            <el-table-column align="center" label='状态'>
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0">未交保证金</span>
                <span v-else>已交保证金</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label='报价时间'>
              <template slot-scope="scope">
                {{scope.row.created_at}}
              </template>
            </el-table-column>
            <el-table-column align="center" label='操作'>
              <template slot-scope="scope">
                <el-button size="mini" type="success" v-if="isShow(scope.row.id) == 0" @click="orderDateReady(scope.row)">选择</el-button>
                <el-button size="mini" type="success" v-else-if="isShow(scope.row.id) == 1" @click="orderDateReady(scope.row)" disabled>已选择该报价</el-button>
                <el-button size="mini" type="warning" v-else @click="orderDateReady(scope.row)" disabled title="该图纸已选择报价,无法继续选择">选择</el-button>
              </template>
            </el-table-column>
          </el-table>


          <el-row type="flex" justify="center" style="margin-top: 30px;">
              <el-pagination
              background
              layout="prev, pager, next"
              @current-change="handleOfferFormCurrentChange"
              :current-page="offerFormPage"
              :page-size="10"
              :total="offerFormCount">
              </el-pagination>
          </el-row>
        </el-dialog>

    </div>
</template>

<script>
import { drawingList,delDrawing,publish, offerList, buildOrder, getOffer } from '@/api/drawing'
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

            orderForm: {
              order_id: 0,
              offer_id: '',
              drawing_id: '',
              user_id: '',
              price: '',
            },

            offerFormVisible:false,
            offerFormTitle: '',
            offerFormList: [],
            offerFormCount: 0,
            offerFormPage:1,
            offerFormSelected: 0,
            offerForm: {
              drawing_id: 0,
              offset: 0,
              limit: 8,
            },
			options: [{
				  id: 0,
				  name: '草稿'
				}, {
				  id: 1,
				  name: '审核中'
				}, {
				  id: 2,
				  name: '审核通过'
				}, {
				  id: 3,
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
        offerDateReady (data) {
          this.offerForm.drawing_id = data.id;
          this.offerFormTitle = "图纸编号:" + data.drawing_number ;
          this.orderForm.drawing_id = data.id;
          this.offerList();
        },

        orderDateReady (data) {
         this.orderForm.user_id = data.user_id;
         this.orderForm.offer_id = data.id;
         this.orderForm.price = data.price;
         this.buildOrder();
        },

        async offerList () {
          let data = {
            drawing: this.offerForm.drawing_id,
          }
          let res = await offerList(this.offerForm);
          let res1 = await getOffer(data);
          if (res.code == ERR_OK) {
            this.offerFormList = res.data.items;
            this.offerFormCount = res.data.count;
          }
          if (res1.code == ERR_OK) {
            this.offerFormSelected = res1.data;
          }
          this.offerFormVisible = true;
        },

        async buildOrder () {
          console.log(this.orderForm)
           let res = await buildOrder(this.orderForm);

           if (res.code == ERR_OK) {
             alert();
           }
        },

        handleOfferFormCurrentChange(currentPage) {
          this.offerForm.offset = (currentPage - 1) * this.offerForm.limit;
          this.offerList();
        },

        isShow(id) {
          if (this.offerFormSelected == 0) {
            return 0;
          }
          else if (id == this.offerFormSelected) {
            return 1;
          } else {
            return 2;
          }
        }

    }
}
</script>
