<template>
    <div class='tinymce-container editor-container'>
      <textarea class='tinymce-textarea' :id="tinymceId"></textarea>
      <div class="editor-custom-btn-container">
      
    </div>
  </div>
</template>

<script>
// import editorImage from "./components/editorImage";
// import { setTimeout } from 'timers';

export default {
  name: "tinymce",
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ""
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [
          "removeformat undo redo |  bullist numlist | outdent indent | forecolor | fullscreen code",
          "bold italic blockquote | h2 p  media link | alignleft aligncenter alignright"
        ];
      }
    },
    menubar: {
      default: ""
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || "vue-tinymce-" + +new Date()
    };
  },
  watch: {
    value(val) {
      console.log(val)
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val)
        );
      }
    }
  },
  mounted() {
    const that = this;
    window.tinymce.init({
      selector: `#${this.tinymceId}`,
      height: this.height,
      body_class: "panel-body ",
      object_resizing: false,
      toolbar: this.toolbar,
      menubar: this.menubar,
      plugins:
        "advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,wordcount, imagetools", // media
      end_container_on_empty_block: true,
      powerpaste_word_import: "clean",
      code_dialog_height: 450,
      code_dialog_width: 1000,
      advlist_bullet_styles: "square",
      advlist_number_styles: "default",
      block_formats: "普通标签=p;小标题=h2;",
      imagetools_cors_hosts: ["wpimg.wallstcn.com", "wallstreetcn.com"],
      imagetools_toolbar: "watermark",
      default_link_target: "_blank",
      link_title: false,
      init_instance_callback: editor => {
        if (that.value) {
          editor.setContent(that.value);
        }
        that.hasInit = true;
        editor.on("NodeChange Change KeyUp", () => {
          this.hasChange = true;
          this.$emit("input", editor.getContent({ format: "raw" }));
        });
      },
      setup(editor) {
        editor.addButton("h2", {
          title: "小标题", // tooltip text seen on mouseover
          text: "小标题",
          onclick() {
            editor.execCommand("mceToggleFormat", false, "h2");
          },
          onPostRender() {
            const btn = this;
            editor.on("init", () => {
              editor.formatter.formatChanged("h2", state => {
                btn.active(state);
              });
            });
          }
        });
        editor.addButton("p", {
          title: "正文",
          text: "正文",
          onclick() {
            editor.execCommand("mceToggleFormat", false, "p");
          },
          onPostRender() {
            const btn = this;
            editor.on("init", () => {
              editor.formatter.formatChanged("p", state => {
                btn.active(state);
              });
            });
          }
        });
      }
    });
  }
};
</script>

<style scoped>
.tinymce-container {
  position: relative;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 15px;
  /*z-index: 2005;*/
  top: 18px;
}
</style>
