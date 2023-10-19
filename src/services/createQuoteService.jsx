import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

export const createQuote = async (quoteData) => {
  await new Promise((resolve) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        quoteData.responsibleName = user.displayName;
        quoteData.responsibleUUID = user.uid;
        await addDoc(
          collection(db, "usersQuotes", user.uid, "quotes"),
          quoteData
        );
        resolve();
      }
    });
  });
};
