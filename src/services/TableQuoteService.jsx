import { auth, db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

//se busca que documento tiene el atributo "initialized" y se quita del arreglo

export const changeQuoteStatus = async (quoteId, newStatus) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    //si el nuevo estado es 1 (activo), se buscara todas las cotizaciones que tengan ese estado y se cambiaran a 2 (en curso)
    if (newStatus == 1) {
      const quotesRef = collection(db, "usersQuotes", user.uid, "quotes");
      const q = query(quotesRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);

      for (const quote of querySnapshot.docs) {
        const docRef = doc(db, "usersQuotes", user.uid, "quotes", quote.id);
        await updateDoc(docRef, { status: 2 });
      }
    }
    //se actualiza el estado de la cotizacion
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
