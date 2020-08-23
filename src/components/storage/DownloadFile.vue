<template>
    <div class="col m5 s12 z-depth-1">
        <h2 class="fonted">Download Files</h2>
        <ul class="collection" v-if="files.length > 0">
            <li class="fonted collection-item" v-for="aFile in files" :key="aFile.filename">
                <span>{{ aFile.filename }}</span>
                <a href="" @click.prevent="viewFile(aFile.url)">
                    <i class="material-icons">attachment</i>
                </a>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    li.collection-item {
        display: flex;
        align-items: center;
        justify-content:space-between;
    }
</style>

<script>
import Service from './StorageService';
import ErrorNotifier from '../ErrorNotifier';

export default {
    mounted() {
        Service.eventBus.$on('file-uploaded', () => this.fetchFiles());
        this.fetchFiles();
    },

    data() {
        return {
            files: []
        };
    },

    methods: {
        fetchFiles() {
            Service.getAllFiles()
                .then(fetchedFiles => this.files = fetchedFiles)
                .catch(() => {
                    ErrorNotifier.notifyError("Couldn't fetch files from server");
                    this.files = [];
                });
        },

        viewFile(url) {
            window.open(url);
        }
    }
}
</script>