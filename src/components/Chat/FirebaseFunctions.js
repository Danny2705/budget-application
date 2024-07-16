import { db } from './FirebaseConfig';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

export const addMessage = async (message) => {
  const docRef = await addDoc(collection(db, "messages"), {
    ...message,
    timestamp: new Date()
  });
  return docRef.id;
};

export const addPrompt = async (prompt) => {
  const docRef = await addDoc(collection(db, "generate"), {
    prompt,
    status: "pending",
    createTime: new Date()
  });
  return docRef.id;
};

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

export const getTransactionById = async (transactionId) => {
  const docRef = doc(db, "transactions", transactionId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such transaction!");
  }
};
