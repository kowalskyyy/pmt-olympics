// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3R7nNZU9GId9yrYq7dYnPnqvRi3UwzDQ",
  authDomain: "pmt-olympics.firebaseapp.com",
  projectId: "pmt-olympics",
  storageBucket: "pmt-olympics.appspot.com",
  messagingSenderId: "236699609515",
  appId: "1:236699609515:web:201f7f2fa9541a2cb80aee",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
