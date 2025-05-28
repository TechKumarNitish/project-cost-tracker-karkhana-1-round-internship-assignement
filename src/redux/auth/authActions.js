import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { login, logout } from "./authSlice";
import { apiStatusConstants } from "../../apiStatusConstant";

export const registerUser = (email, password, updateStatus, userData = {}) => async (dispatch) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), userData);
        dispatch(login(res.user));
        updateStatus(apiStatusConstants.success, "Registration successful!");
    } catch (error) {
        let msg = null;
        switch (error.code) {
            case 'auth/network-request-failed':
                msg = "🚫 Network Error: Please check your internet connection.";
                break;
            case 'auth/email-already-in-use':
                msg = "This email is already registered. Try logging in or use a different email.";
                break;
            case 'auth/weak-password':
                msg="Password is too weak. Please use at least 6 characters with a mix of letters, numbers, or symbols."
                break;
            case 'auth/invalid-email':
                msg = "Invalid email format. Please enter a valid email address.";
                break;            
            default:
                msg = `❗ Unexpected Error [${error.code}]:`, error.message;
                break;
        }
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
        let msg = null;
        switch (error.code) {
            case 'auth/network-request-failed':
                msg = "🚫 Network Error: Please check your internet connection.";
                break;
            case 'auth/invalid-credential':
                msg = "🔐 Credential Error: Invalid email or password.";
                break;
            default:
                msg = `❗ Unexpected Error [${error.code}]:`, error.message;
                break;
        }
        console.error("Error logging in: ", error.code);
        updateStatus(apiStatusConstants.error, msg);
    }
};

export const logoutUser = (updateStatus) => async (dispatch) => {
    try {
        await signOut(auth);
        dispatch(logout());
        updateStatus(apiStatusConstants.success, "Logout successful!");
    } catch (e) {
        updateStatus(apiStatusConstants.error, "Something went wrong while logging out. Please try again later.");
    }
};
