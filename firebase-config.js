// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_cgvQzdk_YxgN7gEEr9Hn4Csk3JOT_wU",
  authDomain: "jkeventmanagement-a0ec7.firebaseapp.com",
  projectId: "jkeventmanagement-a0ec7",
  storageBucket: "jkeventmanagement-a0ec7.firebasestorage.app",
  messagingSenderId: "462865247499",
  appId: "1:462865247499:web:f6e973862f21e88247460e",
  measurementId: "G-FNKPX3PSGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);