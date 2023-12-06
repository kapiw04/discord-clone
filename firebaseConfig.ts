import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAUwY84cej8vX_QI9OtyoWeDKgBAVe9WFw",
  authDomain: "discord-clone-6c22c.firebaseapp.com",
  projectId: "discord-clone-6c22c",
  storageBucket: "discord-clone-6c22c.appspot.com",
  messagingSenderId: "312432671236",
  appId: "1:312432671236:web:88eb9e6e0700b3fcc21351",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestoreDB = getFirestore(app);

setPersistence(auth, browserLocalPersistence).catch(console.error);
