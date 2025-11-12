import { logout } from '../auth.js';
import { clearPreviousUI } from './clear.js';
import { userData } from '../api.js';

export async function renderProfile() {
    clearPreviousUI();
    console.log("DEBUG: renderProfile called");
    console.log("DEBUG: userData:", userData);
     console.log("DEBUG: userDataname:", userData.userName);

    const appdiv = document.getElementById("app");
    // Create nav bar
    const nav = document.createElement('nav');

    // Fetch login data


    // Add login data on left
    const loginDiv = document.createElement('div');
    console.log("DEBUG: Reading userData in profile:", userData);

    loginDiv.textContent = `WELCOME ${userData.userName} your auditration is : ${userData.auditRatio}`;

    loginDiv.classList.add('nav-left');
    nav.appendChild(loginDiv);

    // Add logout button on right
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Logout';
    logoutBtn.classList.add('nav-right');
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
    nav.appendChild(logoutBtn);

    // Append nav to body
    appdiv.appendChild(nav);
    console.log("DEBUG: Profile rendered successfully");
}
