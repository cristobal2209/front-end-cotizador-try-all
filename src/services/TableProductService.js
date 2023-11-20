import { db } from "../firebaseConfig";
import { uuidv4 } from "@firebase/util";
import { storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
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
  removeIdField(productData.suppliers);
  productData.suppliers.forEach((supplier) => {
    removeIdField(supplier.extraData);
    removeIdField(supplier.prices);
    removeIdField(supplier.stock);
  });

  if (productData.priceFor !== "each")
    productData.priceFor += productData.priceForQuantity;
  delete productData.priceForQuantity;

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
    const response = await axios.get("/api/countProducts", category);
    return response.data;
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
