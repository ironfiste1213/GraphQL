import { userData } from "../api.js";
import { logout } from "../auth.js";
import { router } from "../router.js";

console.log("Sidebar.js loaded");

export function renderSidebar() {
  const sidebar = document.createElement('aside');
  sidebar.classList.add('sidebar');

  // Top Section: User Info
  const userInfo = document.createElement('div');
  userInfo.classList.add('sidebar-user-info');

  const zoneLogo = document.createElement('img');
  zoneLogo.src = 'logo.png';
  zoneLogo.alt = 'Zone01Oujda Logo';
  zoneLogo.classList.add('sidebar-zone-logo');
  userInfo.appendChild(zoneLogo);

  const avatar = document.createElement('img');
  avatar.src = userData.avatarUrl;
  avatar.alt = 'Profile Picture';
  avatar.classList.add('sidebar-avatar');
  userInfo.appendChild(avatar);

  const userName = document.createElement('div');
  userName.classList.add('sidebar-username');
  userName.innerHTML = `${userData.userName.charAt(0).toUpperCase() + userData.userName.slice(1)}<br>Talent`;
  userInfo.appendChild(userName);

  sidebar.appendChild(userInfo);

  // Navigation Links
  const nav = document.createElement('nav');
  nav.classList.add('sidebar-nav');

  const navList = document.createElement('ul');
  navList.classList.add('sidebar-nav-list');

  const links = [
    { name: 'Dashboard', path: 'dashboard', icon: '🏠' },
    { name: 'Projects', path: 'projects', icon: '📁' },
    { name: 'Audits', path: 'audits', icon: '🔍' },
    { name: 'Profile', path: 'profile', icon: '👤' },
  ];

  links.forEach(link => {
    const li = document.createElement('li');
    li.classList.add('sidebar-nav-item');

    const a = document.createElement('a');
    a.href = `#${link.path}`;
    a.classList.add('sidebar-nav-link');
    // Check if current hash matches the link path
    const currentHash = window.location.hash.slice(1) || 'dashboard';
    if (currentHash === link.path) {
      a.classList.add('active');
    }

    const icon = document.createElement('span');
    icon.classList.add('sidebar-nav-icon');
    icon.textContent = link.icon;
    a.appendChild(icon);

    const text = document.createElement('span');
    text.classList.add('sidebar-nav-text');
    text.textContent = link.name;
    a.appendChild(text);

    a.addEventListener('click', (e) => {
      e.preventDefault();
      router.navigate(link.path);
      // Update active class
      document.querySelectorAll('.sidebar-nav-link').forEach(link => link.classList.remove('active'));
      a.classList.add('active');
    });

    li.appendChild(a);
    navList.appendChild(li);
  });

  nav.appendChild(navList);
  sidebar.appendChild(nav);

  // Logout Button at the bottom of the sidebar
  const logoutBtn = document.createElement('button');
  logoutBtn.classList.add('sidebar-logout-btn');
  logoutBtn.textContent = 'Logout';
  logoutBtn.addEventListener('click', logout);
  sidebar.appendChild(logoutBtn);

  return sidebar;
}
