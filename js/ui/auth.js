import { clearPreviousUI } from "./clear.js";
console.log("UI/Auth.js loaded");

const appDiv = document.getElementById('app');
console.log("App div retrieved:", appDiv ? "found" : "not found");

export function renderLogin() {
    clearPreviousUI();
    console.log("renderLogin function called");
    if (appDiv) {
        appDiv.innerHTML = ``
        console.log("App div cleared");
    }
    const title = document.createElement('h2');
    title.textContent = 'Login';
    appDiv.appendChild(title);
    console.log("Title added to app div");
    const form = document.createElement('form');
    form.id = 'login-form';
    appDiv.appendChild(form);
    console.log("Form added to app div");
    const emailInput = document.createElement('input');
    emailInput.type = 'text';
    emailInput.placeholder = 'Username or Email';
    emailInput.required = true;
    form.appendChild(emailInput);
    console.log("Email input added to form");
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.required = true;
    form.appendChild(passwordInput);
    console.log("Password input added to form");
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Login';
    form.appendChild(submitButton);
    console.log("Submit button added to form");
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    appDiv.appendChild(errorDiv);
    console.log("Error div added to app div");
}

