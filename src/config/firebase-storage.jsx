import { ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "./firebase";

export const uploadImage = async (file) => {
  const storageRef = ref(firebaseStorage, "profile-picture");

  return await uploadBytes(storageRef, file);
};
