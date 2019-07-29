<template>
    <div>
        <div class="text">
            <tinymce :height='200' v-model="content"></tinymce>
            <editorImage  color="#20a0ff" @successCBK="setImg" class="editor-upload-btn"></editorImage>
        </div>
    </div>
</template>

<script>
import Tinymce from "@/base/Tinymce";
import editorImage from "@/base/Tinymce/components/editorImage";

export default {
    name: "new-add",
    components: {
        Tinymce,
        editorImage
    },
    data() {
            return {
            content: ""
        };
    },
    methods: {
        // 塞入图片
        setImg (images) {
            let content = this.content
            images.forEach(item => {
                content = content + `<img src="${item}">`
            })
            this.content = content
        }
    }
}
</script>

<style lang="scss" scoped>
.text {
    width: 100%;
    position: relative;
    height: auto;
    overflow: hidden;
    .editor-upload-btn {
        position: absolute;
        right: 10px;
        top: 13px;
    }
}

</style>