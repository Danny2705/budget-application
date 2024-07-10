//ref chatprompt: how do i configure firebase for my gemini chatbot
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtA55wstINLnhPcN5v4KVV5tmBr4Ryuaw",

  authDomain: "budget-app-bf80c.firebaseapp.com",

  projectId: "budget-app-bf80c",

  storageBucket: "budget-app-bf80c.appspot.com",

  messagingSenderId: "83066329020",

  appId: "1:83066329020:web:ace769ecad724618effdb9"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };