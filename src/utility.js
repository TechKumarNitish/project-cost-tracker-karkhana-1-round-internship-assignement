export const extractErrorMessage = (error) => {
    let msg=null;
    switch (error.code) {
        case 'auth/network-request-failed':
            msg = "🚫 Network Error: Please check your internet connection.";
            break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-email':
            msg = "🔐 Credential Error: Invalid email or password.";
            break;
        default:
            msg = `❗ Unexpected Error [${error.code}]:`, error.message;
            break;
    }
    return msg;
}