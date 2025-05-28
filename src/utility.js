export const extractErrorMessage = (error) => {
    let msg = null;
    switch (error.code) {
        case 'auth/network-request-failed':
            msg = "🚫 Network Error: Please check your internet connection.";
            break;
        case 'auth/invalid-credential':
            msg = "🔐 Credential Error: Invalid email or password.";
            break;
        case 'auth/email-already-in-use':
            msg = "This email is already registered. Try logging in or use a different email.";
            break;
        case 'auth/weak-password':
            msg = "Password is too weak. Please use at least 6 characters with a mix of letters, numbers, or symbols."
            break;
        case 'auth/invalid-email':
            msg = "Invalid email format. Please enter a valid email address.";
            break;
        default:
            msg = `❗ Unexpected Error [${error.code}]:`, error.message;
            
    }
    return msg
}