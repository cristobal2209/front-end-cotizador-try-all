import { auth, db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

//se busca que documento tiene el atributo "initialized" y se quita del arreglo
const filterUserQuotes = (userQuotes) => {
  const newUserQuotes = userQuotes.filter(
    (object) => !("initialized" in object)
  );
  return newUserQuotes;
};

export const getUserQuotes = async () => {
  let userQuotes = [];

  await new Promise((resolve) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const querySnapshot = await getDocs(
          collection(db, "usersQuotes", user.uid, "quotes")
        );

        //por cada documento que esta en "usersQuotes", se crea un objeto en
        //arreglo userQuotes
        querySnapshot.forEach((doc) => {
          userQuotes.push({ id: doc.id, ...doc.data() });
        });
        resolve();
      }
    });
  });

  //se saca el documento de cotizacion de inicializacion
  return filterUserQuotes(userQuotes);
};
