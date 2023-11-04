import {
  addDoc,
  collection,
  getDocs,
  query,
  or,
  and,
  where,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getProductsFromInput = async (productSearchParam, nextDocRef) => {
  if (nextDocRef) {
    let data = [];

    const qManufacturer = query(
      collection(db, "products"),
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
        where("manufacturer", "<=", productSearchParam.toLowerCase() + "\uf8ff")
      ),
      startAfter(nextDocRef),
      limit(25)
    );
    const [
      querySnapshotManufacturer,
      // querySnapshotDescription,
      // querySnapshotManufacturerPartNo,
    ] = await Promise.all([
      getDocs(qManufacturer),
      // getDocs(qDescription),
      // getDocs(qManufacturerPartNo),
    ]);

    querySnapshotManufacturer.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } else {
    let data = [];

    const qManufacturer = query(
      collection(db, "products"),
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
        where("manufacturer", "<=", productSearchParam.toLowerCase() + "\uf8ff")
      ),
      limit(25)
    );
    const [
      querySnapshotManufacturer,
      // querySnapshotDescription,
      // querySnapshotManufacturerPartNo,
    ] = await Promise.all([
      getDocs(qManufacturer),
      // getDocs(qDescription),
      // getDocs(qManufacturerPartNo),
    ]);

    querySnapshotManufacturer.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  }
};
