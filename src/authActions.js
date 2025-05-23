import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc, getDoc, setDoc, collection, addDoc, getDocs, deleteDoc, updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import {
  login, logout, setUserData, setUserItems,
  addUserItem, deleteUserItem, updateUserItem
} from "./authSlice";

// Login/Register: (unchanged) ...
export const loginUser = (email, password) => async (dispatch) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  dispatch(login(user));

  const docSnap = await getDoc(doc(db, "users", user.uid));
  dispatch(setUserData(docSnap.data()));

  const itemsSnap = await getDocs(collection(db, "users", user.uid, "items"));
  const items = itemsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  dispatch(setUserItems(items));
};

export const registerUser = (email, password, extra = {}) => async (dispatch) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  dispatch(login(user));

  const data = { uid: user.uid, email: user.email, ...extra };
  await setDoc(doc(db, "users", user.uid), data);
  dispatch(setUserData(data));
  dispatch(setUserItems([]));
};

export const logoutUser = () => async (dispatch) => {
  await signOut(auth);
  dispatch(logout());
};


export const addItemForUser = (name, cost) => async (dispatch, getState) => {
  const { user } = getState().auth;
  if (!user) return;
  const item = { name, cost };
  const docRef = await addDoc(collection(db, "users", user.uid, "items"), item);
  dispatch(addUserItem({ id: docRef.id, ...item }));
};

export const deleteItemForUser = (itemId) => async (dispatch, getState) => {
  const { user } = getState().auth;
  if (!user) return;
  await deleteDoc(doc(db, "users", user.uid, "items", itemId));
  dispatch(deleteUserItem(itemId));
};

export const updateItemForUser = (itemId, updatedFields) => async (dispatch, getState) => {
  const { user } = getState().auth;
  if (!user) return;
  await updateDoc(doc(db, "users", user.uid, "items", itemId), updatedFields);
  dispatch(updateUserItem({ id: itemId, ...updatedFields }));
};
