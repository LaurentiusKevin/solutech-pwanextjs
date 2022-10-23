import { db } from "./firebase";
import { ref, set, get, child } from "firebase/database";

export const createData = async (userId, data) => {
  console.log(data);
  await set(ref(db, "users/" + userId), data);
};

export const getData = async (userId) => {
  const dbRef = ref(db);
  return await get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("no data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
