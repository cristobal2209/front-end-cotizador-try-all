import {
  collection,
  getDocs,
  query,
  or,
  where,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getProductsFromInput = async (productSearchParam, docRef) => {
  try {
    let data = [];
    const productsCollection = collection(db, "products");
    const queryOptions = docRef
      ? query(
          productsCollection,
          or(
            where("manufacturer", ">=", productSearchParam),
            where("manufacturer", "<=", productSearchParam + "\uf8ff"),
            where(
              "manufacturer",
              ">=",
              productSearchParam.charAt(0).toUpperCase() +
                productSearchParam.slice(1)
            ),
            where(
              "manufacturer",
              "<=",
              productSearchParam.charAt(0).toUpperCase() +
                productSearchParam.slice(1) +
                "\uf8ff"
            ),
            where("manufacturer", ">=", productSearchParam.toLowerCase()),
            where(
              "manufacturer",
              "<=",
              productSearchParam.toLowerCase() + "\uf8ff"
            )
          ),
          startAfter(docRef),
          limit(12)
        )
      : query(
          productsCollection,
          or(
            where("manufacturer", ">=", productSearchParam),
            where("manufacturer", "<=", productSearchParam + "\uf8ff"),
            where(
              "manufacturer",
              ">=",
              productSearchParam.charAt(0).toUpperCase() +
                productSearchParam.slice(1)
            ),
            where(
              "manufacturer",
              "<=",
              productSearchParam.charAt(0).toUpperCase() +
                productSearchParam.slice(1) +
                "\uf8ff"
            ),
            where("manufacturer", ">=", productSearchParam.toLowerCase()),
            where(
              "manufacturer",
              "<=",
              productSearchParam.toLowerCase() + "\uf8ff"
            )
          ),
          limit(12)
        );
    const documentSnapshots = await getDocs(queryOptions);

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const firstVisible = documentSnapshots.docs[documentSnapshots.docs[0]];

    documentSnapshots.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return { data, firstVisible, lastVisible };
  } catch (error) {
    throw new Error(error);
  }
};
