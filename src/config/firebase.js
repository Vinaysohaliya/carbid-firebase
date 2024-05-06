// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUg8BNNbzNfllCLg1h60ugBH6e151Ft0o",
  authDomain: "carbid-780e6.firebaseapp.com",
  projectId: "carbid-780e6",
  storageBucket: "carbid-780e6.appspot.com",
  messagingSenderId: "263223047989",
  appId: "1:263223047989:web:bb3b68590963b3327cfe7c"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);




export {auth,db,storage};

