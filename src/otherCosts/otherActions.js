import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import {
  setOtherCosts, addOtherCost, deleteOtherCost, updateOtherCost
} from "./otherCostSlice";

export const fetchOtherCosts = (uid) => async (dispatch) => {
  const snap = await getDocs(collection(db, "users", uid, "otherCosts"));
  const costs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  dispatch(setOtherCosts(costs));
};

export const addOtherCostForUser = (uid, description, amount) => async (dispatch) => {
  const cost = { description, amount };
  const docRef = await addDoc(collection(db, "users", uid, "otherCosts"), cost);
  dispatch(addOtherCost({ id: docRef.id, ...cost }));
};

export const deleteOtherCostForUser = (uid, id) => async (dispatch) => {
  await deleteDoc(doc(db, "users", uid, "otherCosts", id));
  dispatch(deleteOtherCost(id));
};

export const updateOtherCostForUser = (uid, id, data) => async (dispatch) => {
  await updateDoc(doc(db, "users", uid, "otherCosts", id), data);
  dispatch(updateOtherCost({ id, ...data }));
};
