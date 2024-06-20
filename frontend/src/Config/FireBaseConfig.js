// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTdUPLBc0dHLFPX27nlWbYEIz0qV8vqHs",
  authDomain: "cloudarchitecs.firebaseapp.com",
  projectId: "cloudarchitecs",
  storageBucket: "cloudarchitecs.appspot.com",
  messagingSenderId: "618738043172",
  appId: "1:618738043172:web:9c9e4b3327253256a48bb1",
  measurementId: "G-SEEM6444EP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export { auth, provider };