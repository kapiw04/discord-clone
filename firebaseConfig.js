import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

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
export const provider = new GoogleAuthProvider();
