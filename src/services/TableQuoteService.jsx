import { auth, db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
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

export const changeQuoteStatus = async (quoteUID, newStatus) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        reject("Usuario no autenticado");
        return;
      }

      const quoteRef = doc(db, "usersQuotes", user.uid, "quotes", quoteUID);
      await updateDoc(quoteRef, { state: newStatus });

      resolve(newStatus);
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      reject(error);
    }
  });
};

export const checkActiveQuotesExists = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        reject("Usuario no autenticado");
        return;
      }

      const quotesRef = collection(db, "usersQuotes", user.uid, "quotes");
      const q = query(quotesRef, where("state", "==", 1));
      const querySnapshot = await getDocs(q);

      resolve(querySnapshot.empty);
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      reject(error);
    }
  });
};
