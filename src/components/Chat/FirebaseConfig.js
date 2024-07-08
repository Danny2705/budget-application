import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase (make sure to replace these with your own Firebase project details)
const firebaseConfig = {
  apiKey: "AIzaSyAtA55wstINLnhPcN5v4KVV5tmBr4Ryuaw",

  authDomain: "budget-app-bf80c.firebaseapp.com",

  projectId: "budget-app-bf80c",

  storageBucket: "budget-app-bf80c.appspot.com",

  messagingSenderId: "83066329020",

  appId: "1:83066329020:web:ace769ecad724618effdb9"

};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const firestore = firebase.firestore();

export const addPrompt = async (prompt) => {
  const docRef = await firestore.collection('generate').add({ prompt });
  return docRef.id;
};

export const getResponse = async (docId) => {
  const docRef = firestore.collection('generate').doc(docId);
  const doc = await docRef.get();
  if (doc.exists && doc.data().response) {
    return doc.data().response;
  }
  return null;
};
