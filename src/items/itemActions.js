import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { setItems, addItem, deleteItem, updateItem } from "./itemSlice";

export const fetchItems = (uid) => async (dispatch) => {
  const snap = await getDocs(collection(db, "users", uid, "items"));
  const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  dispatch(setItems(items));
};

export const addItemForUser = (uid, name, cost) => async (dispatch) => {
  const item = { name, cost };
  const docRef = await addDoc(collection(db, "users", uid, "items"), item);
  dispatch(addItem({ id: docRef.id, ...item }));
};

export const deleteItemForUser = (uid, id) => async (dispatch) => {
  await deleteDoc(doc(db, "users", uid, "items", id));
  dispatch(deleteItem(id));
};

export const updateItemForUser = (uid, id, data, setOpen) => async (dispatch) => {
  await updateDoc(doc(db, "users", uid, "items", id), data);
  dispatch(updateItem({ id, ...data }));
  setOpen(false);
};
