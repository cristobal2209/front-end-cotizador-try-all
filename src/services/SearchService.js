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
import {client} from "../services/typesense.js"

// export const getProductsFromInput = async (productSearchParam, docRef) => {
//   try {
//     let data = [];
//     const productsCollection = collection(db, "products");
//     const queryOptions = docRef
//       ? query(
//           productsCollection,
//           or(
//             where("manufacturer", ">=", productSearchParam),
//             where("manufacturer", "<=", productSearchParam + "\uf8ff"),
//             where(
//               "manufacturer",
//               ">=",
//               productSearchParam.charAt(0).toUpperCase() +
//                 productSearchParam.slice(1)
//             ),
//             where(
//               "manufacturer",
//               "<=",
//               productSearchParam.charAt(0).toUpperCase() +
//                 productSearchParam.slice(1) +
//                 "\uf8ff"
//             ),
//             where("manufacturer", ">=", productSearchParam.toLowerCase()),
//             where(
//               "manufacturer",
//               "<=",
//               productSearchParam.toLowerCase() + "\uf8ff"
//             )
//           ),
//           startAfter(docRef),
//           limit(12)
//         )
//       : query(
//           productsCollection,
//           or(
//             where("manufacturer", ">=", productSearchParam),
//             where("manufacturer", "<=", productSearchParam + "\uf8ff"),
//             where(
//               "manufacturer",
//               ">=",
//               productSearchParam.charAt(0).toUpperCase() +
//                 productSearchParam.slice(1)
//             ),
//             where(
//               "manufacturer",
//               "<=",
//               productSearchParam.charAt(0).toUpperCase() +
//                 productSearchParam.slice(1) +
//                 "\uf8ff"
//             ),
//             where("manufacturer", ">=", productSearchParam.toLowerCase()),
//             where(
//               "manufacturer",
//               "<=",
//               productSearchParam.toLowerCase() + "\uf8ff"
//             )
//           ),
//           limit(12)
//         );
//     const documentSnapshots = await getDocs(queryOptions);

//    // Get the last visible document
//     const lastVisible =
//       documentSnapshots.docs[documentSnapshots.docs.length - 1];

//     const firstVisible = documentSnapshots.docs[documentSnapshots.docs[0]];

//     documentSnapshots.forEach((doc) => {
//       data.push({ id: doc.id, ...doc.data() });
//     });

//     return { data, firstVisible, lastVisible };
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw new Error(error);
//   }
// };

// export const getProductsFromInput = async (productSearchParam) => {
//   try {

//     const searchParams = {
//       q:'*',
//       queryBy: `production.description` === productSearchParam,
//     };

//     const result = await client.collections("products").documents().search(searchParams);

//     const productos = result.hits.map((document) => document.document);

//     return productos;
//   } catch (error) {
//     console.error('Error al recuperar la colección:', error);
//     throw error; // Re-throw the error for the calling code to handle if necessary
//   }
// };







export const getProductsFromInput = async (productSearchParam) => {
  try {
    //productSearchParam = productSearchParam.tolowercase();
    const searchParams = {
      q :productSearchParam,
      query_by : 'description',
      infix: 'always',
      
    };

    const result = await client.collections("products").documents().search(searchParams);

    const productos = result.hits.map((document) => document.document);

    return productos;
  } catch (error) {
    console.error('Error al realizar la búsqueda:', error);
    throw error;
  }
};