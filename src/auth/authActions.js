import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { login, logout, setUserData } from "./authSlice";

export const registerUser = (email, password, navigate, userData = {}) => async (dispatch) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), userData);
        dispatch(login(res.user));
        // dispatch(setUserData(userData));
        navigate("/");
        console.log("User registered and data saved:", req.user);
    } catch (e) {
        console.error("Error registering user:", e);
    }
};

export const loginUser = (email, password, navigate) => async (dispatch) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const sanitizedUser = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL,
        };
        console.log("sanitized user: ", sanitizedUser);
        dispatch(login(sanitizedUser));
        navigate("/");
    } catch (e) {
        console.log("Error logging out:", e);
    }
};

export const logoutUser = (navigate) => async (dispatch) => {
    try {
        await signOut(auth);
        dispatch(logout());
        navigate("/login")
    } catch (e) {
        console.log("Error logging out:", e);
    }
};
