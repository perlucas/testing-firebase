import Vue from 'vue';
import firebaseApp from '../FirebaseApp';
import 'firebase/storage';

let storageInstance = null;

function getStorage() {
    try {
        if (storageInstance) return storageInstance;
        storageInstance = firebaseApp.getApp().storage();
        console.log("Firestore has been initialized successfully!");
        return storageInstance;
    }
    
    catch (e) {
        console.log("An error was raised when attempting to initialize Cloud Storage");
        console.error(e);
    }
}


export default {

    eventBus: new Vue(),

    getFolderRef() {
        return getStorage().ref().child("files");
    },

    async uploadFile(filename, file) {
        try {
            await this.getFolderRef().child(filename).put(file)
            this.eventBus.$emit("file-uploaded", filename);
        }

        catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getAllFiles() {
        try {
            const getFilesRecursively = async (folderRef) => {
                let files = [];
                let childs = await folderRef.listAll();

                // add references to files that aren't folders
                for (let aFile of childs.items) {
                    files.push(aFile);
                }
                
                // recursive iteration through the folders
                for (let aFolder of childs.prefixes) {
                    let filesInFolder = await getFilesRecursively(aFolder);
                    for (let aFile of filesInFolder) {
                        files.push(aFile);
                    }
                }

                return files;
            };

            let files = await getFilesRecursively(this.getFolderRef());

            return files.map(ff => {
                let fileData = {
                    filename: ff.fullPath.slice("files/".length),
                    url: ""
                };
                ff.getDownloadURL().then(url => fileData.url = url);
                return fileData;
            });
        }

        catch (err) {
            console.error(err)
            throw err;
        }
    }
}