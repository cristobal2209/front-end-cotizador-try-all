import { auth, db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchUserQuotes = () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      let userUID = user.uid;
      console.log(userUID);
      const querySnapshot = await getDocs(
        collection(db, "userQuotes", userUID, "quotes")
      );

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    }
  });
};
