import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
//la data entra como parametro la data de una cotizacion
export const createQuote = async (quoteData) => {
  //espera que se resuelva la promesa
  await new Promise((resolve) => {
    //conseguir el usuario desde auth
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        quoteData.responsibleName = user.displayName;
        quoteData.responsibleUUID = user.uid;
        
        await addDoc(
          collection(db, "usersQuotes", user.uid, "quotes"),
          quoteData
        );
        resolve();
      }
    });
  });
};
