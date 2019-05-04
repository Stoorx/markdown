<template>
    <div class="filesList">
        <button>Добавить файл</button>
        <file v-for="file in files" v-bind:key="file.id" v-bind:file="file" v-on:click.native="selectFile(file)" v-on:deleteFile="deleteFile"></file>
    </div>
</template>

<script>
    import File from './File'

    export default {
        name: "FilesList",
        components: {
            File
        },
        props: {
            files: Array,
            currentFile: Object
        },
        methods: {
            deleteFile: function (file) {
                if(file === undefined)
                    return;
                this.$emit('deleteFile', file)
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

    button {
        background-color: #42a543;
        color: #E3E3E3;
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
