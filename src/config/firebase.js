// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_API_KEY),
  authDomain: String(import.meta.env.VITE_AUTH_DOMAIN),
  projectId: String(import.meta.env.VITE_PROJECT_ID),
  storageBucket: String(import.meta.env.VITE_STORAGE_BUCKET),
  messagingSenderId: String(import.meta.env.VITE_MESSAGING_SENDER_ID),
  appId: String(import.meta.env.VITE_APP_ID)
};


const app = initializeApp(firebaseConfig);


const firestore = firebase.firestore();
firebase.firestore().settings({ experimentalAutoDetectLongPolling: true});
firebase.firestore.setLogLevel('debug');

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);




export {auth,db,storage};

