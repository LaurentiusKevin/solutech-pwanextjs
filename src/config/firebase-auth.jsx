import { firebaseAuth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

export const authRegister = async ({ email, password }) => {
  return createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const authSignIn = async ({ email, password }) => {
  return signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const authSignOut = async () => {
  return signOut(firebaseAuth);
}
