<template>
    <div class="upload-container">
        <el-button icon='upload' :style="{background:color,borderColor:color}" @click="dialogVisible=true" type="primary">上传图片
        </el-button>
        <el-dialog :visible.sync="dialogVisible">
            <el-upload
                    class="editor-slide-upload"
                    action="https://upload-z2.qiniup.com"
                    :multiple="true"
                    :file-list="fileList"
                    :show-file-list="true"
                    list-type="picture-card"
                    :on-remove="handleRemove"
                    :data="postData"
                    :on-success="handleSuccess"
                    :before-upload="beforeUpload">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </el-dialog>
    </div>
</template>
<script>
import { getQiNiuToken } from '../../../api/auth'

export default {
  name: "editorSlideUpload",
  props: {
    color: {
      type: String,
      default: "#20a0ff"
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      postData: {},
      files: []
    };
  },
  mounted () {
    getQiNiuToken().then(res => {
      this.postData.token=res.data
    })
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(
        item => this.listObj[item].hasSuccess
      );
    },
    handleSubmit() {
      this.$emit("successCBK", this.files);
      this.listObj = {};
      this.fileList = [];
      this.dialogVisible = false;
      this.files = []
    },
    handleSuccess(response, file) {
      this.files.push(`${process.env.QINIU_URL}${response.key}`)
    },
    handleRemove(file) {
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]];
          return;
        }
      }
    },
    beforeUpload(file) {
      this.postData.key = file.name;        // 通过设置key为文件名，上传到七牛中会显示对应的图片名
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
  .editor-slide-upload {
    margin-bottom: 20px;
  }
}
</style>
