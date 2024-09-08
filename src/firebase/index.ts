
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCfVXvQXBqU4Yyx3-naxapRQWYerV5iaAg",
    authDomain: "website-8015b.firebaseapp.com",
    databaseURL: "https://website-8015b-default-rtdb.firebaseio.com",
    projectId: "website-8015b",
    storageBucket: "website-8015b.appspot.com",
    messagingSenderId: "562998165221",
    appId: "1:562998165221:web:9def5ad64555ce50375e0c",
    measurementId: "G-787Y451CY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const fireStore = getFirestore(app);
export const storage = getStorage(app);
