<template>
    <div class="row">
        <div class="col s12 title-container">
            <h1 class="uppercase fonted">Firebase Storage</h1>
            <router-link to="/" class="waves-effect waves-light btn-large blue">
                <i class="material-icons left">keyboard_arrow_left</i>back
            </router-link>
        </div>
        <upload-file></upload-file>
        <div class="col m1"></div>
        <download-file></download-file>
    </div>
</template>

<script>
import UploadFile from './UploadFile.vue';
import DownloadFile from './DownloadFile.vue';

export default {
    components: {
        "upload-file": UploadFile,
        "download-file": DownloadFile
    }
}
</script>