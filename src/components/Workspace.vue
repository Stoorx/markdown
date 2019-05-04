<template>
    <div class="workspace">
        <div v-if="file == null" class="stub">
            Создайте или выберите файл для просмотра
        </div>
        <div v-else-if="file != null" class="actualWorkspace">
            <div class="header">
                <div class="title">{{file.title}}</div>
                <div class="date">Создан: {{createdDateString}}</div>
                <div class="date">Изменен: {{lastModifiedDateString}}</div>
                <div class="linkBtn" v-show="this.file.modified"
                     v-on:click.stop="saveFile">Сохранить
                </div>
            </div>
            <div class="editor">
                <textarea class="left" v-model="currentFile.content" v-on:input.stop="setModified"></textarea>
                <div class="right" v-html="compiledMarkdown"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as marked from 'marked'

    export default {
        name: "Workspace",
        props: {
            file: Object
        },
        data: function(){
            return {
                currentFile: this.file
            }
        },
        methods: {
            saveFile: function () {
                this.$emit('saveFile', this.currentFile)
            },
            setModified: function () {
                if(this.currentFile === undefined)
                    return;
                this.currentFile.modified = true;
            }
        },
        computed: {
            createdDateString: function () {
                if (this.currentFile == null)
                    return;
                return this.currentFile.createdDate.toLocaleString()
            },
            lastModifiedDateString: function () {
                if (this.currentFile == null)
                    return;
                return this.currentFile.lastModifiedDate.toLocaleString()
            },
            compiledMarkdown: function () {
                if (this.currentFile == null)
                    return;
                return marked(this.currentFile.content)
            }
        },
        watch: {
            file: function (newFile) {
                this.currentFile = newFile;
            }

        }
    }
</script>

<style scoped>
    .workspace {
        margin-left: 300px;
    }

    .stub {
        background-color: #e3e3e3;
        height: 100vh;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        font-size: 16pt;
    }

    .actualWorkspace {
        min-height: 100vh;
        display: flex;
        flex-flow: column;
    }
    .header {
        background-color: #f3f3f3;
        padding: 7px;
        display: flex;
        flex-flow: row;
        align-items: baseline;
    }
    .title {
        font-size: 14pt;
        margin-right: 10px;
        font-weight: bold;
    }
    .date {
        font-size: 10pt;
        color: #404040;
        margin-right: 5px;
    }
    .linkBtn {
        text-decoration: underline;
        font-size: 9pt;
        color: #404040;
        cursor: pointer;
        padding: 3px;

    }
    .linkBtn:hover {
        color: #202020;
    }

    .editor {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 100%;
        flex-grow: 1;
    }

    .left {
        display: block;
        resize: none;
    }

</style>
