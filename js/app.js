import { initializeApp } from "./lunch.js";
console.log("App.js loaded");

window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    initializeApp();
});
