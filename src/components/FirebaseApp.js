import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBXS04xFIYX6sVoZ7XWeqBjDCS6YqLP-QI",
    authDomain: "testing-df461.firebaseapp.com",
    databaseURL: "https://testing-df461.firebaseio.com",
    projectId: "testing-df461",
    storageBucket: "testing-df461.appspot.com",
    messagingSenderId: "348973816118",
    appId: "1:348973816118:web:d759b61e27046e322b7b97",
    measurementId: "G-VP29HZX511"
};

const instanceHolder = {
    app: null
};

export default {
    getApp: () => {
        if (! instanceHolder.app) {
            instanceHolder.app = firebase.initializeApp(firebaseConfig);
        }
        return instanceHolder.app;
    }
};