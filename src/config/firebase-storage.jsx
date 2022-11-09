import { ref, uploadBytes, uploadString, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "./firebase";

export const uploadImage = async (filename, file) => {
  const storageRef = ref(firebaseStorage, filename);

  return await uploadString(storageRef, file, "data_url");
};

export const getImage = async (filename) => {
  const storageRef = ref(firebaseStorage, filename);

  return await getDownloadURL(storageRef);
}
