import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const createQuote = (UUID, QuoteData) => {
  addDoc(collection(db, "usersQuotes", UUID, "quotes"), QuoteData);
};
