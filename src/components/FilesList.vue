<template>
    <div class="filesList">
        <input type="text" v-model="newFileName" placeholder="Имя файла"/>
        <button v-on:click="addFile">Добавить файл</button>
        <file v-for="file in files" v-bind:key="file.id" v-bind:file="file" v-on:click.native="selectFile(file)"
              v-on:deleteFile="deleteFile"></file>
    </div>
</template>

<script>
    import File from './File'

    export default {
        name: "FilesList",
        components: {
            File
        },
        data: function () {
            return {
                newFileName: null
            }
        },
        props: {
            files: Array
        },
        methods: {
            addFile: function () {
                if (this.newFileName)
                    this.$emit('addFile', {name: this.newFileName});
                this.newFileName = null;
            },
            deleteFile: function (file) {
                if (file != null) {
                    this.$emit('deleteFile', file)
                }
            },
            selectFile: function (file) {
                this.$emit('selectFile', file)
            }
        }
    }
</script>

<style scoped>
    .filesList {
        width: 300px;
        background-color: #f3f3f3;
        position: fixed;
        height: 100%;
        border-right: solid 1px #c3c3c3;
    }

    input[type=text] {
        width: 100%;
        padding: 5px;
        border: none;
        border-bottom: darkgray 1px solid;
        font-size: 12pt;
    }

    button {
        background-color: #42a543;
        color: #F3F3F3;
        transition: background-color 0.5s ease;
        width: 100%;
        padding: 5px;
        border: none;
        border-bottom: darkgray 1px solid;
        font-size: 14pt;
        font-weight: bold;
        cursor: pointer;
    }

    button:hover {
        background-color: forestgreen;
        transition: background-color 0.5s ease;
    }

    button:active {
        background-color: darkgreen;
        transition: none;
    }
</style>
