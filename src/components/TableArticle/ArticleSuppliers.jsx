import { useEffect, useState } from "react";

import {
  doc,
  deleteDoc,
  addDoc,
  collection,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function ArticleSuppliers({ articleData }) {
  const [supplierData, setSupplierData] = useState([]);

  useEffect(() => {
    getSuppliersCollection();
  }, []);

  const getSuppliersCollection = async () => {
    const querySnapshot = await getDocs(
      collection(db, "prueba-articulos", articleData.id, "suppliers")
    ); //recupera desde la coleccion "prueba-articulos"
    const newSupplierData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSupplierData(newSupplierData);
    // setTableRender((prevTableRender) => prevTableRender + 1);
  };

  const showData = () => {
    console.log(supplierData);
  };

  return (
    <>
      <button
        className="rounded-md bg-secondary p-3 text-white hover:bg-secondaryHover"
        onClick={showData}
      >
        Ver
      </button>
    </>
  );
}
