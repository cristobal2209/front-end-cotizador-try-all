import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useNavigate } from "react-router-dom";

export const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  }

