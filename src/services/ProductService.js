import { db, auth } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const getProductData = async (productId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    const productRef = doc(db, "products", productId);
    const docSnap = await getDoc(productRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No existe el producto");
    }
  } catch (e) {
    throw new Error(e);
  }
};
