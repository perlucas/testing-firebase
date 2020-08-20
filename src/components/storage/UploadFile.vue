<template>
    <form class="col m6 s12 z-depth-1">
      <h2 class="fonted">Upload File</h2>
      <div class="row">
        
        <div class="input-field col s12">
          <i class="material-icons prefix">edit_mode</i>
          <input 
            type="text" 
            id="filename" 
            :class="'validate' + filenameValidationClass"
            minlength="5"
            required>
          <label for="filename" class="fonted">Filename</label>
          <span
            v-if="validationState.filename.showHint"
            class="helper-text fonted" 
            data-error="You must enter a valid filename" 
            data-success="Sounds good!"></span>
        </div>

        <div class="input-field col s12">
            <div class="file-field input-field">
                <div class="btn blue">
                    <span>File</span>
                    <input type="file" id="file_content">
                </div>
                <div class="file-path-wrapper">
                    <input 
                        id="current_filename"
                        :class="'file-path validate' + fileValidationClass"
                        type="text">
                    <span
                        v-if="validationState.file.showHint"
                        class="helper-text fonted" 
                        data-error="You must select a file to upload" 
                        data-success="Good choice!"></span>
                </div>
            </div>
        </div>

        <div class="input-field col s12">
            <a 
              class="waves-effect waves-light btn blue"
              @click="tryToSubmitFile()"
            >add</a>
        </div>

      </div>
    </form>
</template>

<script>

import Validator from './ValidateFile';
import Service from './StorageService';
import ErrorNotifier from '../ErrorNotifier';

const getFileInput = root => root.querySelector("#file_content");
const getFilenameInput = root => root.querySelector("#filename");
const getFilenameViewer = root => root.querySelector("#current_filename");

export default {
    data() {
        return {
            validationState: {
                filename: {
                    validated: false,
                    showHint: false
                },
                file: {
                    validated: false,
                    showHint: false
                }
            }
        };
    },

    methods: {
        tryToSubmitFile() {
            let filename = getFilenameInput(this.$el).value;
            let file = getFileInput(this.$el).files[0];
            let isValid = this.validateFileAndGetIsValidResult({ filename, file });

            // attempt to upload the data
            if (isValid) {
                Service.uploadFile(filename, file)
                    .then(() => this.resetForm())
                    .catch((err) => {
                        console.error(err);
                        ErrorNotifier.notifyError("Error trying to upload the file!")
                    });
            }
        },

        validateFileAndGetIsValidResult(fileData) {
            let erroredProps = Validator.validateFileProperties(fileData);
            for (let prop of ["file", "filename"]) {
                this.validationState[prop].validated = true;
                this.validationState[prop].showHint = erroredProps.includes(prop);
            }
            return erroredProps.length === 0;
        },

        resetForm() {
            getFilenameInput(this.$el).value = "";
            getFileInput(this.$el).value = "";
            getFilenameViewer(this.$el).value = "";
            this.validationState.file.validated = false;
            this.validationState.filename.validated = false;
        }
    },

    computed: {
        filenameValidationClass: function() {
            if (this.validationState.filename.validated) {
                return this.validationState.filename.showHint
                    ? " invalid"
                    : " valid";
            }
            return "";
        },
        
        fileValidationClass: function() {
            if (this.validationState.file.validated) {
                return this.validationState.file.showHint
                    ? " invalid"
                    : " valid";
            }
            return "";
        },

    }
}
</script>script