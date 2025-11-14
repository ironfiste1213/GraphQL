import { logout } from "../auth.js";
console.log("UI/Auth.js loaded");

const appDiv = document.getElementById("app");
console.log("App div retrieved:", appDiv ? "found" : "not found");

function clearPreviousUI() {
  if (appDiv) {
    appDiv.innerHTML = '';
  }
}

export function renderLogin() {
  clearPreviousUI();
  console.log("renderLogin function called");

  // Create login container
  const loginContainer = document.createElement("div");
  loginContainer.classList.add("login-container");

  // Add Zone 01 logo/title
  const logoContainer = document.createElement("div");
  logoContainer.classList.add("login-logo");
  const logoImg = document.createElement("img");
  logoImg.src = "logo.png";
  logoImg.alt = "Zone01Oujda Logo";
  logoImg.classList.add("login-logo-img");
  logoContainer.appendChild(logoImg);
  const title = document.createElement("h1");
  title.textContent = "Ici C'est Zone01Oujda";
  logoContainer.appendChild(title);
  loginContainer.appendChild(logoContainer);

  const loginForm = document.createElement("div");
  loginForm.classList.add("login-form");

  const loginTitle = document.createElement("h2");
  loginTitle.textContent = "Login";
  loginForm.appendChild(loginTitle);
  console.log("Title added to login form");

  const form = document.createElement("form");
  form.id = "login-form";
  loginForm.appendChild(form);
  console.log("Form added to login form");

  const emailInput = document.createElement("input");
  emailInput.type = "text";
  emailInput.placeholder = "Username or Email";
  emailInput.required = true;
  form.appendChild(emailInput);
  console.log("Email input added to form");

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.placeholder = "Password";
  passwordInput.required = true;
  form.appendChild(passwordInput);
  console.log("Password input added to form");

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Login";
  form.appendChild(submitButton);
  console.log("Submit button added to form");

  const errorDiv = document.createElement("div");
  errorDiv.id = "error-message";
  loginForm.appendChild(errorDiv);
  console.log("Error div added to login form");

  loginContainer.appendChild(loginForm);
  appDiv.appendChild(loginContainer);
}

export function renderLoggedIn() {
  clearPreviousUI();
  console.log("renderLoggedIn function called");
  const title = document.createElement("h2");
  title.textContent = "Logged In";
  appDiv.appendChild(title);
  console.log("Title added to app div");
  const logoutButton = document.createElement("button");
  logoutButton.type = "button";
  logoutButton.textContent = "Logout";
  logoutButton.addEventListener("click", logout);
  appDiv.appendChild(logoutButton);
  console.log("Logout button added to app div");
}
