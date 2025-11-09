import { renderLogin } from "./ui/auth.js";
import { Api } from "./api.js";
console.log("App.js loaded");

window.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired");
    renderLogin();
});
