import { db } from "../firebaseConfig";
import { uuidv4 } from "@firebase/util";
import { storage } from "../firebaseConfig";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  addDoc,
} from "firebase/firestore";

const uploadImage = async (imageUpload) => {
  if (imageUpload == null) return;
  const imageRef = ref(
    storage,
    `ProductsImages/${imageUpload.name + uuidv4()}`
  );
  return await uploadBytes(imageRef, imageUpload)
    .then(async (snapshot) => {
      return await getDownloadURL(snapshot.ref).then((url) => {
        return url;
      });
    })
    .catch((e) => {
      return e;
    });
};

const writeExtraDataToSupplier = (supplier) => {
  supplier.extraData.forEach((data) => {
    supplier[data.extraDataName] = data.extraDataValue;
  });
  delete supplier.extraData;
};

const removeIdField = (objArr) => {
  objArr.forEach((obj) => {
    if (Object.prototype.hasOwnProperty.call(obj, "id")) {
      delete obj["id"];
    }
  });
};

export const createProduct = async (productData) => {
  //removiendo campos "id" de los arreglos
  removeIdField(productData.suppliers);
  productData.suppliers.forEach((supplier) => {
    removeIdField(supplier.extraData);
    removeIdField(supplier.prices);
    removeIdField(supplier.stock);
  });

  //uniendo priceFor con priceForQuantity para que quede guardado en priceFor
  if (productData.priceFor !== "each")
    productData.priceFor += productData.priceForQuantity;
  //se elimina el campo priceForQuantity
  delete productData.priceForQuantity;

  //escribiendo la data extra al proveedor
  productData.suppliers.forEach((supplier) => {
    writeExtraDataToSupplier(supplier);
  });

  console.log(productData);

  return await uploadImage(productData.imgSrc)
    .then(async (imgUrl) => {
      productData.imgSrc = imgUrl;
      return await addDoc(collection(db, "products"), productData)
        .then(() => {
          return `Producto ${productData.description} creado correctamente.`;
        })
        .catch((error) => {
          return error;
        });
    })
    .catch((e) => {
      return e;
    });
};

export const countProducts = async (category) => {
  try {
    // const response = await axios.get("/api/countProducts", category);
    // return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getNextProductsCollection = async (docRef) => {
  try {
    let data = [];
    const productsCollection = collection(db, "products");
    const queryOptions = docRef
      ? query(productsCollection, startAfter(docRef), limit(10))
      : query(productsCollection, limit(10));

    const documentSnapshots = await getDocs(queryOptions);

    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const firstVisible = documentSnapshots.docs[documentSnapshots.docs[0]];

    documentSnapshots.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return { data, firstVisible, lastVisible };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(error);
  }
};
