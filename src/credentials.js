// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4iA78ed1JwrVZOycvdVUqSDDd7Pp2ES0",
    authDomain: "crud-firebase-f45d9.firebaseapp.com",
    projectId: "crud-firebase-f45d9",
    storageBucket: "crud-firebase-f45d9.appspot.com",
    messagingSenderId: "873047981641",
    appId: "1:873047981641:web:63fdeae98e7386f18dc998",
    measurementId: "G-CDJBBXVV9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;