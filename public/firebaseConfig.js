// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "xxxxxxxxxx",
    authDomain: "xxxxx",
    projectId: "xxxxx",
    storageBucket: "xxxxxxxxxxxxx",
    messagingSenderId: "xxxxxx",
    appId: "xxxxxxx",
    measurementId: "xxxx"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };





