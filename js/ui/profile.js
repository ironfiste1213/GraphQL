import { logout } from '../auth.js';
import { clearPreviousUI } from './clear.js';

export function renderProfile() {
    clearPreviousUI();
    const appdiv = document.getElementById("app")
    // Create nav bar
    const nav = document.createElement('nav');

    // Add profile title
    const title = document.createElement('h1');
    title.textContent = 'Profile';
    nav.appendChild(title);

    // Add logout button
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Logout';
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
        
    });
    nav.appendChild(logoutBtn);

    // Append nav to body
    appdiv.appendChild(nav);
}
