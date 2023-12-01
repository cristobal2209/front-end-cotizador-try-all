import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  getDocs,
  query,
  where,
  getDoc,
  limit,
  updateDoc,
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
  await addDoc(collection(db, "usersQuotes", user.uid, "quotes"), quoteData)
    .then()
    .catch((error) => { });
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
    const q = query(quotesRef, where("status", "==", 1), limit(1));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  } catch (error) {
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
    throw new Error(error);
  }
};

export const getActiveQuote = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    const quotesRef = collection(db, "usersQuotes", user.uid, "quotes");
    const q = query(quotesRef, where("status", "==", 1), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No existe cotizacion activa");
    }
    for (const doc of querySnapshot.docs) {
      return { id: doc.id, ...doc.data() };
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const addProductToActiveQuote = async (product, supplier) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Usuario no autenticado");
    }
    delete product.suppliers;

    // Encontrar el objeto con quantity igual a "1+" y extraer el precio
    const priceObject = supplier.prices.find(item => parseInt(item.quantity.replace(/\D/g, ''), 10) === 1);

    // Limpiar el precio y convertirlo a número float
    const newPrice = parseFloat(priceObject.price.replace(/[^\d.]/g, ''));

    let activeQuote = await getActiveQuote();
    activeQuote.products?.push({
      product,
      supplier,
      price: newPrice,
      quantity: 1,
    });
    const activeQuoteRef = doc(
      db,
      "usersQuotes",
      user.uid,
      "quotes",
      activeQuote.id
    );
    await updateDoc(activeQuoteRef, activeQuote)
      .then()
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    throw new Error(e);
  }
};

export const updateQuoteProducts = async (quoteID, newProducts, total) => {
  const currentDate = new Date();
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Usuario no autenticado");
    }
    const quoteRef = doc(db, "usersQuotes", user.uid, "quotes", quoteID);
    if (newProducts) {
      await updateDoc(quoteRef, {
        products: newProducts,
        lastUpdateDate: currentDate.toDateString(),
        total: total,
      })
        .then()
        .catch((e) => { });
    }
  } catch (e) {
    throw new Error(e);
  }
};
