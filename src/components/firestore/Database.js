
import firebaseApp from '../FirebaseApp';
import 'firebase/firestore';

let dbInstance = null;

function getDbInstance() {
    try {
        if (dbInstance) return dbInstance;
        dbInstance = firebaseApp.getApp().firestore();
        console.log("Firestore has been initialized successfully!");
        return dbInstance;
    }
    
    catch (e) {
        console.log("An error was raised when attempting to initialize Firestore");
        console.error(e);
    }
}

export default {
    async getTodos() {
        try {
            let snapshot = await getDbInstance().collection("todos").get();
            return snapshot.docs.map(doc => {
                let todo = doc.data();
                todo.id = doc.id;
                return todo;
            });
        }

        catch (err) {
            console.error("Error while fetching the todos!");
            console.error(err);
            throw err;
        }
    },

    async saveTodo(todo) {
        let data = {
            content: todo.description,
            expiresIn: new Date(),
            isCompleted: false,
            isPermanent: todo.isPermanent
        };

        if (! todo.isPermanent) {
            let hoursString, secondsString;
            [hoursString, secondsString] = todo.time.split(":");
            data.expiresIn = todo.date;
            data.expiresIn.setHours(parseInt(hoursString));
            data.expiresIn.setSeconds(parseInt(secondsString));
        }
        
        try {
            let document = await getDbInstance().collection("todos").add(data);
            return document;
        }

        catch (err) {
            console.error(err);
            throw err;
        }
    },

    async deleteTodo(id) {
        try {
            await getDbInstance().collection("todos").doc(id).delete();
        }

        catch (err) {
            console.error(err);
            throw err;
        }
    },

    async completeTodo(id) {
        try {
            await getDbInstance().collection("todos").doc(id)
                .update({ isCompleted: true });
        }

        catch (err) {
            console.error(err);
            throw err;
        }
    }
};