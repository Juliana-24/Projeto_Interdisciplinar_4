import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZ5Bpqfga0-NOjrf67Iu44uVaGDz9GPQk",
  authDomain: "projeto-interdisciplinar-276a4.firebaseapp.com",
  projectId: "projeto-interdisciplinar-276a4",
  storageBucket: "projeto-interdisciplinar-276a4.appspot.com",
  messagingSenderId: "1078677643691",
  appId: "1:1078677643691:web:53fa8e2ec2f6f455e4f2ee",
  measurementId: "G-6JX0V5HL8T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
