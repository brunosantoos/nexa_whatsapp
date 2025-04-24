import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";
import "firebase/storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtmua9dEXonGGtiKe4XFj5aDROtF0UwGg",
  authDomain: "lovecountbd.firebaseapp.com",
  projectId: "lovecountbd",
  storageBucket: "lovecountbd.appspot.com",
  messagingSenderId: "996218294850",
  appId: "1:996218294850:web:f1d3a3307d4a1a42ee93db",
  measurementId: "G-T83TMC44R6",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
