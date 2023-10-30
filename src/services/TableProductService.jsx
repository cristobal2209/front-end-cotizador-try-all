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

export const subscribeToCollection = (callback) => {
  const productsRef = collection(db, "products");
  const unsubscribe = onSnapshot(productsRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // const newData = data.filter(
    //   (object) => !Object.prototype.hasOwnProperty.call(object, "initialized")
    // );
    callback(data);
  });
  return unsubscribe;
};
