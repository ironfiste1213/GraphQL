import { logout } from "../auth.js";
import { clearPreviousUI } from "./clear.js";
import { userData } from "../api.js";

export async function renderProfile() {
  clearPreviousUI();
  console.log("DEBUG: renderProfile called");
  console.log("DEBUG: from profile.js userData:", userData);
  console.log("DEBUG: userDataname:", userData.userName);

  const appdiv = document.getElementById("app");
  // Create nav bar
  const nav = document.createElement("nav");

  // Add login data on left
  const loginDiv = document.createElement("div");
  console.log("DEBUG: Reading userData in profile:", userData);

  loginDiv.textContent = `WELCOME ${userData.userName} your auditration is : ${userData.auditRatio}`;

  loginDiv.classList.add("nav-left");
  nav.appendChild(loginDiv);

  // Add logout button on right
  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Logout";
  logoutBtn.classList.add("nav-right");
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
  nav.appendChild(logoutBtn);

  // Append nav to body
  appdiv.appendChild(nav);

  // Create info card below nav
  const infoCard = document.createElement("div");
  infoCard.classList.add("info-card");

  // Section 1: Total XP
  const xpSection = document.createElement("div");
  xpSection.classList.add("card-section");
  xpSection.innerHTML = `<strong>Total XP:</strong> ${userData.totalXP}`;
  infoCard.appendChild(xpSection);

  // Section 2: First Name
  const firstNameSection = document.createElement("div");
  firstNameSection.classList.add("card-section");
  firstNameSection.innerHTML = `<strong>First Name:</strong> ${userData.firstName}`;
  infoCard.appendChild(firstNameSection);

  // Section 3: Last Name
  const lastNameSection = document.createElement("div");
  lastNameSection.classList.add("card-section");
  lastNameSection.innerHTML = `<strong>Last Name:</strong> ${userData.lastName}`;
  infoCard.appendChild(lastNameSection);

  // Section 4: Audit Ratio
  const auditSection = document.createElement("div");
  auditSection.classList.add("card-section");
  auditSection.innerHTML = `<strong>Audit Ratio:</strong> ${userData.auditRatio}`;
  infoCard.appendChild(auditSection);

  appdiv.appendChild(infoCard);

  console.log("DEBUG: Profile rendered successfully");
}
