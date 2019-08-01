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
                    <span v-if="scope.row.status == 2">启用</span>
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
    </div>
</template>

<script>
import { getCategoryList } from "api/category"
import { ERR_OK } from '@/api/config'

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
        }
    },
    mounted () {
        this.getList()
    },
    methods: {
        createCatrgory (id) {
            this.$router.push({
                path: "/category/create",
                query: {
                    id: id
                }
            })
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
