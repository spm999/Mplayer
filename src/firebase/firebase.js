import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

import {getDatabase} from 'firebase/database'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


const firebaseConfig = {
    apiKey: "AIzaSyAp2GSr_dzGhfULPfPxwwWfbsgSuzmd0eA",
    authDomain: "mplayer-9b02b.firebaseapp.com",
    projectId: "mplayer-9b02b",
    storageBucket: "mplayer-9b02b.appspot.com",
    messagingSenderId: "688095014431",
    appId: "1:688095014431:web:fc777cd482d2ae67a7ef2a",
    measurementId: "G-WZGHCNXJGN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const storage = getStorage();

// Create a storage reference from our storage service
const storageRef = ref(storage);

// const storage = getStorage(app);



// const db = getFirestore(app);
// const real=getDatabase(app);


export { auth, storageRef};
