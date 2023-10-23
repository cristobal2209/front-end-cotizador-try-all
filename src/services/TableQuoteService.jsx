import { auth, db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

//se busca que documento tiene el atributo "initialized" y se quita del arreglo
const filterUserQuotes = (userQuotes) => {
  const newUserQuotes = userQuotes.filter(
    (object) => !("initialized" in object)
  );
  return newUserQuotes;
};

export const getUserQuotes = async () => {
  let userQuotes = [];

  await new Promise((resolve) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const querySnapshot = await getDocs(
          collection(db, "usersQuotes", user.uid, "quotes")
        );

        //por cada documento que esta en "usersQuotes", se crea un objeto en
        //arreglo userQuotes
        querySnapshot.forEach((doc) => {
          userQuotes.push({ id: doc.id, ...doc.data() });
        });
        resolve();
      }
    });
  });

  //se saca el documento de cotizacion de inicializacion
  return filterUserQuotes(userQuotes);
};

export const changeQuoteStatus = async (quoteId, newStatus) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        reject("Usuario no autenticado");
        return;
      }

      //si el nuevo estado es 1 (activo), se buscara todas las cotizaciones que tengan ese estado y se cambiaran a 2 (en curso)
      if (newStatus == 1) {
        const quotesRef = collection(db, "usersQuotes", user.uid, "quotes");
        const q = query(quotesRef, where("state", "==", 1));
        const querySnapshot = await getDocs(q);

        for (const quote of querySnapshot.docs) {
          const docRef = doc(db, "usersQuotes", user.uid, "quotes", quote.id);
          await updateDoc(docRef, { state: 2 });
        }
      }
      //se actualiza el estado de la cotizacion
      const quoteRef = doc(db, "usersQuotes", user.uid, "quotes", quoteId);
      await updateDoc(quoteRef, { state: newStatus });

      resolve(newStatus);
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      reject(error);
    }
  });
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

    return querySnapshot.empty;
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
    callback(data);
  });
  return unsubscribe;
};
