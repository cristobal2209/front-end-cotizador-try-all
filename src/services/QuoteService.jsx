import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

export const createQuote = async (quoteData) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const activeQuoteExists = await checkActiveQuotesExists();
  if (activeQuoteExists) {
    quoteData.status = 2;
  } else {
    quoteData.status = 1;
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
      (docRef) => docRef.data().status === 1
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
    const q = query(quotesRef, where("status", "==", 1));
    const querySnapshot = await getDocs(q);

    //Si querySnapshot.empty == true, es porque no existen cotizaciones activas
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error al recuperar cotizacion activa:", error);
    throw new Error(error);
  }
};

export const getQuote = async (quoteUID) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Usuario no autenticado");
    }
    const docRef = doc(db, "usersQuotes", user.uid, "quotes", quoteUID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No existe la cotizacion");
    }
  } catch (error) {
    console.error("Error al obtener la cotizacion:", error);
    throw new Error(error);
  }
};
