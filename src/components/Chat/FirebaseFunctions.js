import { db } from './FirebaseConfig';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

//ref chatprompt: how do i configure firebase for my gemini chatbot

// Function to add a message to the "messages" collection
export const addMessage = async (message) => {
  const docRef = await addDoc(collection(db, "messages"), {
    ...message,
    timestamp: new Date()
  });
  return docRef.id;
};

// Function to add a prompt to the "generate" collection
export const addPrompt = async (prompt) => {
  const docRef = await addDoc(collection(db, "generate"), {
    prompt,
    status: "pending",
    createTime: new Date()
  });
  return docRef.id;
};

// Function to get a response from the "generate" collection
export const getResponse = async (docId) => {
  const docRef = doc(db, "generate", docId);
  let response = null;

  while (!response) {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().response) {
      response = docSnap.data().response;
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Polling delay
    }
  }

  return response;
};

// Function to get transaction details by ID
export const getTransactionById = async (transactionId) => {
  const docRef = doc(db, "transactions", transactionId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such transaction!");
  }
};

// Function to get user details by user ID
export const getUserDetails = async (userId) => {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};
