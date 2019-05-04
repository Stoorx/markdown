<template>
    <div id="app">
        <files-list id="filesList" v-bind:files="files" v-on:selectFile="switchWorkspace"
                    v-on:deleteFile="deleteFile"></files-list>
        <workspace v-bind:file="currentFile"></workspace>
    </div>
</template>

<script>
    import FilesList from './components/FilesList'
    import Workspace from './components/Workspace'

    export default {
        name: 'app',
        components: {
            FilesList,
            Workspace
        },
        data: function () {
            return {
                files: [
                    {
                        id: 1,
                        title: "Фаел раз",
                        createdDate: new Date(),
                        lastModifiedDate: new Date(),
                        content: "Азаза",
                        modified: false
                    },
                    {
                        id: 2,
                        title: "Фаел два",
                        createdDate: new Date(),
                        lastModifiedDate: new Date(),
                        content: "Азаза2",
                        modified: false
                    },
                    {
                        id: 3,
                        title: "Фаел три",
                        createdDate: new Date(),
                        lastModifiedDate: new Date(),
                        content: "Азаза3",
                        modified: false
                    },
                    {
                        id: 4,
                        title: "Фаел 4етыре",
                        createdDate: new Date(),
                        lastModifiedDate: new Date(),
                        content: "Азаза4",
                        modified: false
                    },
                    {
                        id: 5,
                        title: "Фаел пять",
                        createdDate: new Date(),
                        lastModifiedDate: new Date(),
                        content: "Азаза5",
                        modified: false
                    }
                ],
                currentFile: undefined
            };
        },
        methods: {
            deleteFile: function (file) {
                for (let i = 0; i < this.files.length; i++) {
                    if (this.files[i].id === file.id) {
                        if(this.files[i].id === this.currentFile.id)
                            this.currentFile = undefined;
                        this.files.splice(i, 1);
                        break;
                    }
                }
            },
            switchWorkspace: function (file) {
                this.currentFile = file
            }
        }

    }
</script>

<style>
    * {
        box-sizing: border-box;
    }

    html, body {
        margin: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
