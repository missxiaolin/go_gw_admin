<template>
    <div class="app-container">
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
            label="分类名称">
            </el-table-column>
            <el-table-column
            prop="status"
            label="是否显示">
            </el-table-column>
            <el-table-column
            prop="created_at"
            label="创建时间">
            </el-table-column>
            <el-table-column
            prop="updated_at"
            label="修改时间">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getCategoryList } from "api/category"
import { ERR_OK } from '@/api/config'
import { Message } from 'element-ui'

export default {
    name: "category-list",
    data () {
        return {
            list: [],
            searchForm: {
                pid: 0,
                name: ""
            },
        }
    },
    mounted () {
        
        this.lists(this.searchForm, res => {
            let data = []
            res.forEach(item => {
                
                item.hasChildren = true
                data.push(item)
            })
            this.list = data
        })
    },
    methods: {
        lists (param, cal) {
            getCategoryList(this.searchForm).then(res => {
                if (res.success == ERR_OK) {
                    cal(res.data)
                } else {
                    cal([])
                }
            })

        },
        load(tree, treeNode, resolve) {
            this.searchForm.pid = tree.id
            this.lists(this.searchForm, res => {
                resolve(res)
            })
        }
    }
}
</script>
