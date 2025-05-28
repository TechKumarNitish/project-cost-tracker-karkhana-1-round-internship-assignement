import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  setOtherCosts, addOtherCost, deleteOtherCost, updateOtherCost
} from "./otherCostSlice";
import { apiStatusConstants } from "../../apiStatusConstant";

export const fetchOtherCosts = (uid) => async (dispatch) => {
  const snap = await getDocs(collection(db, "users", uid, "otherCosts"));
  const costs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  dispatch(setOtherCosts(costs));
};

export const addOtherCostForUser = (uid, description, amount, updateStatus) => async (dispatch) => {
  try {
    const cost = { description, amount };
    const docRef = await addDoc(collection(db, "users", uid, "otherCosts"), cost);
    dispatch(addOtherCost({ id: docRef.id, ...cost }));
    updateStatus(apiStatusConstants.success, "Added successfully!")
  } catch (e) {
    updateStatus(apiStatusConstants.error, "Something went wrong! Try again later!")
  }
};

export const deleteOtherCostForUser = (uid, id, updateStatus) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "users", uid, "otherCosts", id));
    dispatch(deleteOtherCost(id));
    updateStatus(apiStatusConstants.success, "Deleted successfully!")
  } catch (e) {
    updateStatus(apiStatusConstants.error, "Something went wrong! Try again later!")
  }
}
  ;

export const updateOtherCostForUser = (uid, id, data, setOpen, updateStatus) => async (dispatch) => {
  try {
    await updateDoc(doc(db, "users", uid, "otherCosts", id), data);
    dispatch(updateOtherCost({ id, ...data }));
    setOpen(false);
    updateStatus(apiStatusConstants.success, "updated successfully!")
  } catch (e) {
    updateStatus(apiStatusConstants.error, "Something went wrong! Try again later!")
  }
};
