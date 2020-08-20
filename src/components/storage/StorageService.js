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

    getFolderRef() {
        return getStorage().ref().child("files");
    },

    async uploadFile(filename, file) {
        try {
            await this.getFolderRef().child(filename).put(file)
        }

        catch (err) {
            console.error(err);
            throw err;
        }
    }


}