//ref chatprompt: how do i configure firebase for my gemini chatbot
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAtA55wstINLnhPcN5v4KVV5tmBr4Ryuaw",
  authDomain: "budget-app-bf80c.firebaseapp.com",
  projectId: "budget-app-bf80c",
  storageBucket: "budget-app-bf80c.appspot.com",
  messagingSenderId: "83066329020",
  appId: "1:83066329020:web:ace769ecad724618effdb9"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Function to add prompt to Firestore
export const addPrompt = async (prompt) => {
  const docRef = await addDoc(collection(firestore, 'generate'), { prompt });
  return docRef.id;
};

// Function to get response from Gemini based on prompt ID
export const getResponse = async (promptId) => {
  const promptDoc = await getDoc(doc(firestore, 'generate', promptId));
  console.log(promptDoc.data())
  if (promptDoc.exists()) {
    return promptDoc.data().response || null;
  } else {
    throw new Error('Prompt document not found');
  }
};
