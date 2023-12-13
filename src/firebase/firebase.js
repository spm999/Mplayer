import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

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
const storage = getStorage(app);

export { auth, storage };
