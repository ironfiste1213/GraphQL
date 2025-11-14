import { renderLogin } from "./ui/auth.js";
import { renderDashboardLayout } from "./ui/dashboard.js";
import { handellogin } from "./auth.js";
import { fetchlogin } from "./query.js";
import { gettoken, savetoken, isValid } from "./jwt.js";

export async function initializeApp() {
  console.log("Initializing application...");
  const token = gettoken();
  if (isValid(token)) {
    console.log("Valid token found, proceeding to dashboard rendering.");
    // Token is valid, fetch user data and render dashboard
    await fetchlogin();
    renderDashboardLayout();
  } else {
    console.log("No valid token found, rendering login.");
    renderLogin();
    const form = document.getElementById("login-form");
    console.log("Login form retrieved:", form ? "found" : "not found");
    form.addEventListener("submit", async (e) => {
      console.log("Form submit event triggered in lunch.js");
      e.preventDefault();
      const emailInput = form.querySelector('input[type="text"]');
      const passwordInput = form.querySelector('input[type="password"]');
      try {
        console.log("Calling handellogin from lunch.js with values");
        const tokenResponse = await handellogin(
          emailInput.value,
          passwordInput.value
        );
        savetoken(tokenResponse);
        console.log("Login successful, token saved.", tokenResponse);
        // Fetch user data and render dashboard
        await fetchlogin();
        renderDashboardLayout();
      } catch (error) {
        console.error("Login failed in lunch.js:", error);
        alert("Login failed: " + error.message);
      }
    });
  }
}
