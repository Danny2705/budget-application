import { db } from './FirebaseConfig';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

export const addMessage = async (message) => {
  const docRef = await addDoc(collection(db, "messages"), {
    ...message,
    timestamp: new Date() // Add timestamp to message
  });
  return docRef.id; // Return the ID of the newly created document
};

export const addPrompt = async (prompt) => {
  const docRef = await addDoc(collection(db, "generate"), {
    prompt,
    status: "pending",
    createTime: new Date()
  });
  return docRef.id; // Return the ID of the newly created document
};

export const getResponse = async (docId) => {
  const docRef = doc(db, "generate", docId); // Reference to document
  let response = null;

  while (!response) {
    const docSnap = await getDoc(docRef); // Fetch document
    if (docSnap.exists() && docSnap.data().response) {
      response = docSnap.data().response; // Extract response
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
    }
  }

  return response;
};

export const getTransactionById = async (transactionId) => {
  const docRef = doc(db, "transactions", transactionId); // Reference to transaction document
  const docSnap = await getDoc(docRef); // Fetch transaction document
  if (docSnap.exists()) {
    return docSnap.data(); // Return transaction data
  } else {
    throw new Error("No such transaction!"); // Error message
  }
};

// Function to fetch user's budget information
export const getUserBudgetInfo = async (userId) => {
  const userDocRef = doc(db, "users", userId); // Reference to user document
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    const budgetId = userData?.budgetId; // Get the budget ID from the user document

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
