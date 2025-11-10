import { logout } from '../auth.js';
import { clearPreviousUI } from './clear.js';
import { fetchlogin } from '../query.js';

export async function renderProfile() {
    clearPreviousUI();
    const appdiv = document.getElementById("app");
    // Create nav bar
    const nav = document.createElement('nav');

    // Fetch login data
    const login = await fetchlogin();

    // Add login data on left
    const loginDiv = document.createElement('div');
    loginDiv.textContent = `WELCOME ${login}`;
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
}
