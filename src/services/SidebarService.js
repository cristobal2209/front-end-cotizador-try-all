import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export async function logOut() {
  await signOut(auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
}
