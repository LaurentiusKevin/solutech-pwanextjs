import { firebaseAuth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const register = async ({email, password}) => {
  return await createUserWithEmailAndPassword(firebaseAuth, email, password);
};
