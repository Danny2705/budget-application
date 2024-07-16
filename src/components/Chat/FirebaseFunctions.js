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

// Function to fetch user's budget information
export const getUserBudgetInfo = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    const budgetId = userData?.budgetId; // Assuming you have a field like budgetId in users collection

    if (budgetId) {
      const budgetDocRef = doc(db, `users/${userId}/budgets`, budgetId);
      const budgetDocSnap = await getDoc(budgetDocRef);

      if (budgetDocSnap.exists()) {
        return budgetDocSnap.data();
      } else {
        throw new Error(`Budget document with ID ${budgetId} not found.`);
      }
    } else {
      throw new Error(`Budget ID not found for user ${userId}.`);
    }
  } else {
    throw new Error(`User document with ID ${userId} not found.`);
  }
};
