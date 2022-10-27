import { firebaseAuth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const authRegister = async ({ email, password }) => {
  return await createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const authSignIn = async ({ email, password }) => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};
