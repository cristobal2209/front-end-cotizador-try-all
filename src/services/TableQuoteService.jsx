import { auth, db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const filterUserQuotes = (userQuotes) => {
  const newUserQuotes = userQuotes.filter(
    (object) => !("initialized" in object)
  );
  return newUserQuotes;
};

export const fetchUserQuotes = async () => {
  let userQuotes = [];

  await new Promise((resolve) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const querySnapshot = await getDocs(
          collection(db, "usersQuotes", user.uid, "quotes")
        );

        querySnapshot.forEach((doc) => {
          userQuotes.push({ id: doc.id, ...doc.data() });
        });
        resolve();
      }
    });
  });

  return filterUserQuotes(userQuotes);
};
