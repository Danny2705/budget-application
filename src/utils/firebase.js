import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import {
  getStorage,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtA55wstINLnhPcN5v4KVV5tmBr4Ryuaw",
  authDomain: "budget-app-bf80c.firebaseapp.com",
  projectId: "budget-app-bf80c",
  storageBucket: "budget-app-bf80c.appspot.com",
  messagingSenderId: "83066329020",
  appId: "1:83066329020:web:ace769ecad724618effdb9",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GithubAuthProvider();
export const storage = getStorage();


export const uploadImageToFirestore = async (localImage) => {
  const transactionNumber = "U123456B123456T123456";
  try {
    const imageRef = storageRef(
      storage,
      `transactions/${transactionNumber}/${localImage.name}`,

    );
    await uploadBytes(imageRef, localImage);
    const imageURL = await getDownloadURL(imageRef);
    console.log("imageRef", imageRef);
    console.log("localImage", localImage);
    console.log("Image uploaded to storage", imageURL);
    return { transactionNumber, imageURL };
  } catch (error) {
    console.error("Error adding images to Firestore:", error);
  }
};

export const saveReceiptToFirestore = async (
  receiptNum,
  receipt,
  imageUrl,
  userEmail
) => {
  try {
    //cannot add user email to receipt object
    const receiptWithImageURLs = {
      ...receipt,
      imageURLs: [imageUrl],
      userEmail,
    };
    console.log(receiptWithImageURLs);
    console.log("Receipt with image URLs", receiptWithImageURLs);
    await setDoc(doc(db, "users", receiptNum), receiptWithImageURLs);
    console.log("Submitted to Firestore");
  } catch (error) {
    console.error("Error adding item to Firestore:", error);
  }
};

