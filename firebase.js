// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCBo-06m4canRUrd5lL2RNPDxUESzIo60",
  authDomain: "dsyconsultancy.firebaseapp.com",
  projectId: "dsyconsultancy",
  storageBucket: "dsyconsultancy.appspot.com",
  messagingSenderId: "428724880022",
  appId: "1:428724880022:web:93d106c82a292b8e12f8b7",
  measurementId: "G-GJPT3J27W5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
// export const auth = getAuth(app);

export default app;
