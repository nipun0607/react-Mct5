import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAhMdWxATt7gmFXHUvH3os6OWlicstC7pM",
  authDomain: "g--dd-981a7.firebaseapp.com",
  projectId: "g--dd-981a7",
  storageBucket: "g--dd-981a7.appspot.com",
  messagingSenderId: "668354865083",
  appId: "1:668354865083:web:aa005452ca6606aa79c69e"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
