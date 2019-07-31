<template>
    <div class="app-container">
        <div :className="'sub-navbar'" style="margin-bottom:30px;">
            <template>
                <el-button style="margin-left: 10px;" type="primary" @click="createNew()">添加文章</el-button>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "new-list",
    methods: {
        createNew () {

        }
    }
}
</script>
