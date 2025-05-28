import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { login, logout } from "./authSlice";
import { setItems } from "../items/itemSlice";
import { setOtherCosts } from "../otherCosts/otherCostSlice";
import { apiStatusConstants } from "../../apiStatusConstant";
import { extractErrorMessage } from "../../utility";

export const registerUser = (email, password, updateStatus, userData = {}) => async (dispatch) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), userData);
        dispatch(login(res.user));
        updateStatus(apiStatusConstants.success, "Registration successful!");
    } catch (error) {
        let msg = extractErrorMessage(error);
        console.error("Error in registering user: ", error.code);
        updateStatus(apiStatusConstants.error, msg);
    }
};

export const loginUser = (email, password, updateStatus) => async (dispatch) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const sanitizedUser = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL,
        };

        dispatch(login(sanitizedUser));
        updateStatus(apiStatusConstants.success, "Login successful!");
    } catch (error) {
        let msg = extractErrorMessage(error);
        console.error("Error logging in: ", error.code);
        updateStatus(apiStatusConstants.error, msg);
    }
};

export const logoutUser = (updateStatus) => async (dispatch) => {
    try {
        await signOut(auth);
        dispatch(logout());
        dispatch(setItems([]));
        dispatch(setOtherCosts([]));
        updateStatus(apiStatusConstants.success, "Logout successful!");
    } catch (e) {
        updateStatus(apiStatusConstants.error, "Something went wrong while logging out. Please try again later.");
    }
};
