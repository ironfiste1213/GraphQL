console.log("JWT.js loaded");

export function savetoken(token) {
    console.log("Saving token to localStorage");
    localStorage.setItem('jwt_token', token);
    console.log("Token saved", token);
}

export function gettoken() {
    console.log("Getting token from localStorage");
    const token = localStorage.getItem('jwt_token');
    console.log("Token retrieved:", token ? "present" : "null");
    return token;
}

export function removetoken() {
    console.log("Removing token from localStorage");
    localStorage.removeItem('jwt_token');
    console.log("Token removed");
}

export function isValid(token) {
    console.log("Checking if token is valid:", token ? "provided" : "null");
    if (!token) {
        console.log("Token is null, returning false");
        return false;
    }
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isValid = payload.exp > Date.now() / 1000;
        console.log("Token validity checked, exp:", payload.exp, "current time:", Date.now() / 1000, "isValid:", isValid);
        return isValid;
    } catch {
        console.log("Error parsing token, returning false");
        return false;
    }
}


