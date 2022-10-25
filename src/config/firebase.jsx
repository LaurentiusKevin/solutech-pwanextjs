import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getFirestore} from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBIX-QYQ9VyORUj1b9pVLDYz9sMhtyTec8",
  authDomain: "laurentiuskevin.firebaseapp.com",
  databaseURL: "https://laurentiuskevin.firebaseio.com",
  projectId: "laurentiuskevin",
  storageBucket: "laurentiuskevin.appspot.com",
  messagingSenderId: "438154021739",
  appId: "1:438154021739:web:bbfff8b53b57c779309a2e",
  measurementId: "G-8E63CNCCZQ",
};

const app = initializeApp(firebaseConfig, "solutech");

export const db = getDatabase(app);
export const firestore = getFirestore(app)
