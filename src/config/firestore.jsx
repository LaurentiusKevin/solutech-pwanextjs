import {setDoc, doc, collection, getDoc} from "firebase/firestore"
import {firestore} from "./firebase"

export const createData = async (id, data) => {
  try {
    const userRef = collection(firestore, "user")
    return await setDoc(doc(userRef, id), data)
  } catch (e) {
    console.log("failed to add data: ", e)
  }
}

export const getData = async (id) => {
  try {
    const userRef = doc(firestore, "user", id)
    return (await getDoc(userRef)).data()
  } catch (e) {
    console.log("failed to get data: ", e)
  }
}
