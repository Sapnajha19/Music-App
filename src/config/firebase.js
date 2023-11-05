// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcZfnd2207rFbt5x5fVm_D4ra80kos2Qo",
  authDomain: "music-app-7d786.firebaseapp.com",
  projectId: "music-app-7d786",
  storageBucket: "music-app-7d786.appspot.com",
  messagingSenderId: "843654201707",
  appId: "1:843654201707:web:b1ed981f9362ecca28cc2e",
  measurementId: "G-G6LKBVXTRE"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
// if (!getApps().length) {
//   initializeApp(firebaseConfig);
// }
// Initialize Firebase auth
export const auth = getAuth(app);