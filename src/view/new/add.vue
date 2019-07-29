<template>
    <div>
        <div id="editor" ref="editor"></div>
    </div>
</template>

<script>
export default {
    name: "new-add",
    mounted () {
        this.initEditor()
    },
    methods: {
        initEditor () {
            UE.getEditor('editor', {
                initialFrameWidth: '100%',
                initialFrameHeight: 250
            })
        }
    }
}
</script>