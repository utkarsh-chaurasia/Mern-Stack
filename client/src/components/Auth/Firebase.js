import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyD1EHs8zOWlJfhS0XPoeB9uxVgqLZrSFQs",
    authDomain: "memories-9b084.firebaseapp.com",
    projectId: "memories-9b084",
    storageBucket: "memories-9b084.appspot.com",
    messagingSenderId: "931201842617",
    appId: "1:931201842617:web:f0480400e1d9f0fd6c4a68",
    measurementId: "G-PPXJDQ2VZT"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export const provider = new GoogleAuthProvider();
