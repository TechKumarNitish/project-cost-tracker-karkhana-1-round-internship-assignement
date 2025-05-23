import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { login, logout } from "./authSlice";

export const registerUser = (email, password, navigate, userData = {}) => async (dispatch) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), userData);
        dispatch(login(res.user));
        navigate("/");
        
    } catch (e) {
        console.error("Error registering user");
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
        
        dispatch(login(sanitizedUser));
        navigate("/");
    } catch (e) {
        console.log("Error logging out");
    }
};

export const logoutUser = (navigate) => async (dispatch) => {
    try {
        await signOut(auth);
        dispatch(logout());
        navigate("/login")
    } catch (e) {
        console.log("Error logging out");
    }
};
