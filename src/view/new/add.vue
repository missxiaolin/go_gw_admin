<template>
    <div>
        <div>
            <tinymce :height='200' v-model="content"></tinymce>
        </div>
        <div class='editor-content' v-html='content'></div>
    </div>
</template>

<script>
import Tinymce from "@/base/Tinymce";

export default {
    name: "new-add",
    components: { Tinymce },
    data() {
        return {
        content: "Tinymce"
    };
  }
}
</script>