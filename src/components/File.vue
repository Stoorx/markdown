<template>
    <div v-bind:class="['file', file.modified ? 'modified' : '']">
        <div class="fileName">{{file.title}}</div>
        <div class="date">Создан: {{createdDateString}}</div>
        <div class="date">Изменен: {{lastModifiedDateString}}</div>
        <div class="deleteButton" v-on:click="deleteFile">Удалить</div>
    </div>
</template>

<script>
    export default {
        name: "File",
        props: {
            file: Object
        },
        methods: {
            deleteFile: function () {
                this.$emit('deleteFile', this.file)
            }
        },
        computed: {
            createdDateString: function () {
                return this.file.createdDate.toLocaleString()
            },
            lastModifiedDateString: function () {
                return this.file.lastModifiedDate.toLocaleString()
            }
        }
    }
</script>

<style scoped>
    .file {
        background: #ffffff;
        padding: 5px;
        /*border-bottom: darkgray 1px solid;*/
        /*border-top: darkgray 1px solid;*/
        margin-bottom: 2px;
        transition: background-color 0.5s ease;
        position: relative;
        cursor: pointer;
    }
    .file:hover {
        background: lightgray;
        transition: background-color 0.5s ease;
    }
    .fileName {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 12pt;
        font-weight: bold;
        color: #303030;
        padding-bottom: 3px;
    }
    .modified {
        background-color: lightcoral;
    }
    .date {
        font-size: 10pt;
        color: #808080;
    }
    .deleteButton {
        position: absolute;
        top: 5px;
        right: 5px;
        text-decoration: underline;
        font-size: 9pt;
        color: #808080;
        cursor: pointer;
        padding: 1px;
    }
    .deleteButton:hover {
        color: #404040;
    }
</style>
