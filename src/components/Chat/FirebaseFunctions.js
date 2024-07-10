import { getDoc, doc, addDoc, collection } from 'firebase/firestore';
import { db } from './FirebaseConfig';

export const addPrompt = async (prompt) => {
  try {
    const docRef = await addDoc(collection(db, 'generate'), { prompt, status: { state: 'PROCESSING' } });
    console.log('Prompt added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding prompt:", error);
    throw error;
  }
};

export const getPromptStatus = async (promptId) => {
  try {
    const promptDoc = await getDoc(doc(db, 'generate', promptId));
    console.log('Prompt status:', promptDoc.data().status);
    return promptDoc.data().status;
  } catch (error) {
    console.error("Error getting prompt status:", error);
    throw error;
  }
};

export const getResponse = async (promptId) => {
  try {
    const promptDoc = await getDoc(doc(db, 'generate', promptId));
    if (promptDoc.exists()) {
      console.log('Prompt response:', promptDoc.data().response);
      return promptDoc.data().response || null;
    } else {
      throw new Error('Prompt document not found');
    }
  } catch (error) {
    console.error("Error getting response:", error);
    throw error;
  }
};
