import firebaseApp from '../FirebaseApp';
import 'firebase/database';

let dbInstance = null;

function getDBInstance() {
    if (dbInstance) return dbInstance;

    try {
        dbInstance = firebaseApp.getApp().database();
        console.log("Firebase Realtime DB has been successfully initialized!");
        return dbInstance;
    }
    catch (err) {
        console.log("An error has ocurred when attempting to initialize realtime DB");
        console.error(err);
    }
}

export default {

    async updateState(state) {
        let stateToAdd = state;
        stateToAdd.timestamp = new Date().getTime();
        try {
            await getDBInstance().ref("/states/usageState").set(stateToAdd)
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getLastState() {
        try {
            let snapshot = await getDBInstance().ref("/states/usageState").once("value");
            return snapshot.val();
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    },

    onNewState(aCallback) {
        getDBInstance().ref("/states").on("child_changed", (snapshot) => {
            aCallback(snapshot.val());
        });
    }


}