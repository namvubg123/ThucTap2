import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0KfZ4upWkaqMJF3AwTu0-cpCLKUvVFs4",
  authDomain: "project2-27a0d.firebaseapp.com",
  projectId: "project2-27a0d",
  storageBucket: "project2-27a0d.appspot.com",
  messagingSenderId: "1018003642631",
  appId: "1:1018003642631:web:4b2f8ceb63a1e26d5bcda2",
  measurementId: "G-Y096R270RW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
