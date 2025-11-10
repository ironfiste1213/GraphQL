import { Api } from "./api.js";
import { renderLogin } from "./ui/auth.js";
import { clearPreviousUI } from "./ui/clear.js";
import { renderProfile } from "./ui/profile.js";
import { fetchlogin } from "./query.js";
console.log("Auth.js loaded");

console.log("Token initialized as null");

export async function handellogin(a, b) {
   console.log("handellogin called with username:", a, "and password length:", b.length);
   // check for valid value !!!!

   const credentials = btoa(`${a}:${b}`);
   console.log("Credentials encoded");
   try {
      console.log("Fetching login API:", Api.login);
      const response = await fetch(Api.login, {
         method: "POST",
         headers: { Authorization: `Basic ${credentials}` }
      });
      console.log("Response received, status:", response.status);
²
      if (!response.ok) throw new Error("Invalid credentials");
      const token = await response.json();
      console.log("Token received and set:", token);
      return token
      //   clearPreviousUI();
      //   await renderProfile();

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