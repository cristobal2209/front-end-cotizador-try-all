import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

export const createQuote = async (quoteData) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const activeQuoteExists = await checkActiveQuotesExists();
  if (activeQuoteExists) {
    quoteData.state = 2;
  } else {
    quoteData.state = 1;
  }
  quoteData.responsibleName = user.displayName;
  quoteData.responsibleUUID = user.uid;
  await addDoc(collection(db, "usersQuotes", user.uid, "quotes"), quoteData);
};

export const subscribeToActiveQuote = (callback) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const quotesRef = collection(db, "usersQuotes", user.uid, "quotes");

  const unsubscribe = onSnapshot(quotesRef, (snapshot) => {
    const activeQuoteDoc = snapshot.docs.find(
      (docRef) => docRef.data().state === 1
    );

    if (activeQuoteDoc) {
      const activeQuote = activeQuoteDoc.data();
      activeQuote.id = activeQuoteDoc.id;
      callback(activeQuote);
    } else {
      callback(null);
    }
  });
  return unsubscribe;
};

export const checkActiveQuotesExists = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    const quotesRef = collection(db, "usersQuotes", user.uid, "quotes");
    const q = query(quotesRef, where("state", "==", 1));
    const querySnapshot = await getDocs(q);

    //Si querySnapshot.empty == true, es porque no existen cotizaciones activas
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    throw new Error(error);
  }
};
