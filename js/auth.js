import { Api } from "./api.js";
import { renderLogin } from "./ui/auth.js";
import { clearPreviousUI } from "./ui/clear.js";
import { renderProfile } from "./ui/profile.js";
console.log("Auth.js loaded");

export let Token = null;
console.log("Token initialized as null");

export async function handellogin(a, b) {
    console.log("handellogin called with username:", a, "and password length:", b.length);
    // check for valid value !!!!

    const credentials = btoa(`${a}:${b}`);
    console.log("Credentials encoded");
     try {
        console.log("Fetching login API:", Api.login);
        const response = await fetch(Api.login, {
            method: "POST" ,
            headers: {Authorization: `Basic ${credentials}`}
        });
        console.log("Response received, status:", response.status);

        if (!response.ok) throw new Error("Invalid credentials");
        Token = await response.json();
        console.log("Token received and set:", Token);
        clearPreviousUI();
        renderProfile();

     } catch (error) {
        console.error("Login failed:", error);
        throw error;
     }
}


export function logout() {
   Token = null;
   clearPreviousUI()
   renderLogin();
}