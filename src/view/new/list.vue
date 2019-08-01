<template>
    <div class="app-container">
        <div :className="'sub-navbar'" style="margin-bottom:30px;">
            <template>
                <el-button style="margin-left: 10px;" type="primary" @click="createNew()">添加文章</el-button>
            </template>
        </div>
        <el-table :data="lists" border style="width: 100%; margin-top: 30px;">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="author" label="作者"></el-table-column>
            <el-table-column prop="title" label="文章标题"></el-table-column>
            <el-table-column prop="keywords" label="关键字"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 2">启用</span>
                    <span v-else>禁用</span>
                </template>
            </el-table-column>
            <el-table-column prop="created_at" label="发布时间"></el-table-column>
            <el-table-column prop="updated_at" label="修改时间"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="createNew(scope.row.id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
         <div class="pagination-container">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleDialogRolesPageChange"
                :current-page="searchForm.page"
                :page-size="searchForm.pageSize"
                :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getNewList } from "api/new"
import { ERR_OK } from '@/api/config'

export default {
    name: "new-list",
    data () {
        return {
            searchForm: {
                page: 1,
                pageSize: 15,
            },
            lists: [],
            count: 0
        }
    },
    mounted () {
        this.list()
    },
    methods: {
        // 获取列表
        async list () {
            let res = await getNewList(this.searchForm)
            if (res.success == ERR_OK) {
                this.lists = res.data.item
                this.count = res.data.count
            }
            
        },
        // 分页
        handleDialogRolesPageChange (val) {
            this.searchForm.page = val
            this.list()
        },
        createNew (id) {
            this.$router.push({
                path: "/new/add",
                query: {
                    id: id
                }
            })
        }
    }
}
</script>
