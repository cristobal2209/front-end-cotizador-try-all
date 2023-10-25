import {
  addDoc,
  collection,
  getDocs,
  query,
  or,
  and,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getProductsFromInput = async (productSearchParam) => {
  const categoryRef = collection(db, "products");
  let data = [];
  const q = query(
    categoryRef,
    // or(
    //   where("manufacturer", "==", productSearchParam),
    //   where("manufacturerPartNo", "==", productSearchParam)
    // )

    or(
      // query as-is:
      and(
        where("manufacturer", ">=", productSearchParam),
        where("manufacturer", "<=", productSearchParam + "\uf8ff")
      ),
      // capitalize first letter:
      and(
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
        )
      ),
      // lowercase:
      and(
        where("manufacturer", ">=", productSearchParam.toLowerCase()),
        where("manufacturer", "<=", productSearchParam.toLowerCase() + "\uf8ff")
      )
    ),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};
