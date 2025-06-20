import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { setItems, addItem, deleteItem, updateItem } from "./itemSlice";
import { apiStatusConstants } from "../../apiStatusConstant";

export const fetchItems = (uid) => async (dispatch) => {
  const snap = await getDocs(collection(db, "users", uid, "items"));
  const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  dispatch(setItems(items));
};

export const addItemForUser = (uid, name, cost, updateStatus) => async (dispatch) => {
  try {
    const item = { name, cost };
    const docRef = await addDoc(collection(db, "users", uid, "items"), item);
    dispatch(addItem({ id: docRef.id, ...item }));
    updateStatus(apiStatusConstants.success, "Added successfully!")
  } catch (e) {
    updateStatus(apiStatusConstants.error, "Something went wrong! Try again later!")
  }
};

export const deleteItemForUser = (uid, id, updateStatus) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "users", uid, "items", id));
    dispatch(deleteItem(id));
    updateStatus(apiStatusConstants.success, "Deleted successfully!")
  } catch (e) {
    updateStatus(apiStatusConstants.error, "Something went wrong! Try again later!")
  }
};

export const updateItemForUser = (uid, id, data, setOpen, updateStatus) => async (dispatch) => {
  try {
    await updateDoc(doc(db, "users", uid, "items", id), data);
    dispatch(updateItem({ id, ...data }));
    setOpen(false);
    updateStatus(apiStatusConstants.success, "updated successfully!")
  } catch (e) {
    updateStatus(apiStatusConstants.error, "Something went wrong! Try again later!")
  }
};
