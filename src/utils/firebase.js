import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import {
  getStorage,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { getHours, getMinutes } from "date-fns";

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

const generateTransactionNo = () => {
  const currentDate = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const currentHrs = getHours(new Date());
  const currentMins = getMinutes(new Date());
  return `T-${currentDate}${currentHrs}${currentMins}-${crypto
    .getRandomValues(new Uint32Array(3))
    .join("-")}`;
};

export const uploadImageToFirestore = async (localImage) => {
  const transactionNumber = generateTransactionNo();
  try {
    const imageRef = storageRef(
      storage,
      `transactions/${transactionNumber}/${localImage.name}`
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
  receiptNo,
  receiptData,
  imageUrl,
  budgetID
) => {
  try {
    const receiptWithImageURLs = {
      ...receiptData,
      imageURLs: [imageUrl],
    };
    console.log(receiptWithImageURLs);
    console.log("Receipt with image URLs", receiptWithImageURLs);
    await setDoc(doc(db, "transactions", receiptNo), receiptWithImageURLs);
    const receiptRef = doc(db, `budgets/${budgetID}/transactions/${receiptNo}`);
    await setDoc(receiptRef, receiptWithImageURLs);
    console.log("Submitted to Firestore");
    alert("Receipt saved successfully!");
  } catch (error) {
    console.error("Error adding item to Firestore:", error);
  }
};

export const saveBudgetToFireDB = async (
  budgetTitle,
  budgetAmount,
  budgetStartDate,
  budgetEndtDate
) => {
  if (
    budgetTitle === "" ||
    budgetAmount === "" ||
    budgetStartDate === "" ||
    budgetEndtDate === ""
  ) {
    alert("Please enter all the fields");
    return;
  }
  try {
    const userBudget = {
      Title: budgetTitle,
      Amount: budgetAmount,
      StartDate: budgetStartDate,
      EndDate: budgetEndtDate,
    };
    console.log(userBudget);
    console.log("saveBudgetToFireDB: userBudget", userBudget);
    await setDoc(doc(db, "userBudgetInfo", budgetTitle), userBudget);
    console.log("Submitted to FireDB");
    alert("Budget saved successfully!");
  } catch (error) {
    console.error("Error adding userBudget to FireDB:", error);
  }
};
