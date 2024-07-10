//ref chatprompt: how do i configure firebase for my gemini chatbot
import { getDoc, doc, addDoc, collection } from 'firebase/firestore';
import { db } from './FirebaseConfig';

export const addPrompt = async (prompt) => {
  const docRef = await addDoc(collection(db, 'generate'), { prompt, status: { state: 'PROCESSING' } });
  return docRef.id;
};

export const getPromptStatus = async (promptId) => {
  const promptDoc = await getDoc(doc(db, 'generate', promptId));
  return promptDoc.data().status;
};

export const getResponse = async (promptId) => {
  const promptDoc = await getDoc(doc(db, 'generate', promptId));
  if (promptDoc.exists()) {
    return promptDoc.data().response || null;
  } else {
    throw new Error('Prompt document not found');
  }
};
