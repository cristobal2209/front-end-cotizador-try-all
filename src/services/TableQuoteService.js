import { auth, db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

export const changeQuoteStatus = async (quoteId, newStatus) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    if (newStatus == 1) {
      const quotesRef = collection(db, "usersQuotes", user.uid, "quotes");
      const q = query(quotesRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);

      for (const quote of querySnapshot.docs) {
        const docRef = doc(db, "usersQuotes", user.uid, "quotes", quote.id);
        await updateDoc(docRef, { status: 2 });
      }
    }
    const quoteRef = doc(db, "usersQuotes", user.uid, "quotes", quoteId);
    await updateDoc(quoteRef, { status: newStatus });

    return newStatus;
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    throw new Error(error);
  }
};

export const subscribeToCollection = (collectionName, callback) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const quotesRef = collection(db, "usersQuotes", user.uid, collectionName);
  const unsubscribe = onSnapshot(quotesRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const newData = data.filter(
      (object) => !Object.prototype.hasOwnProperty.call(object, "initialized")
    );
    callback(newData);
  });
  return unsubscribe;
};

export const deleteQuote = async (quoteUID) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuario no autenticado");
  }
  return await deleteDoc(doc(db, "usersQuotes", user.uid, "quotes", quoteUID))
    .then(() => {
      return "Cotización " + quoteUID + " eliminada.";
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};
