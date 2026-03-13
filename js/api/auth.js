import { Api } from "../api.js";
import { removetoken } from "../jwt.js";
import { initializeApp } from "../lunch.js";
console.log("Auth.js loaded");

console.log("Token initialized as null");

export async function handellogin(a, b) {
  // check for valid value !!!!
  const credentials = btoa(`${a}:${b}`);
  try {
    const response = await fetch(Api.login, {
      method: "POST",
      headers: { Authorization: `Basic ${credentials}` },
    });
    if (!response.ok) throw new Error("Invalid credentials");
    const token = await response.json();
    return token;
    //   clearPreviousUI();
    //   await renderProfile();
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export function logout() {
  removetoken();
  initializeApp();
}
