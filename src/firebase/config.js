import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA6rvykG2cyEweZUb-LS1XANo02ecc_Ktk",
    authDomain: "forumsystem-5f5fd.firebaseapp.com",
    projectId: "forumsystem-5f5fd",
    storageBucket: "forumsystem-5f5fd.appspot.com",
    messagingSenderId: "574838613199",
    appId: "1:574838613199:web:7cf3adf6eac751326d43ba"
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init firebase services
const firestoreObj = firebase.firestore();
const authObj = firebase.auth();
const firebaseStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export {firestoreObj, authObj, timestamp, firebaseStorage};
