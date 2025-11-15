import { userData } from "../api.js";

function toTitleCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

console.log("Profile.js loaded");

export function renderProfile(container) {
  const profileView = document.createElement('div');
  profileView.classList.add('profile-view');

  const titleCard = document.createElement('div');
  titleCard.classList.add('title-card');

  const titleTopRow = document.createElement('div');
  titleTopRow.classList.add('title-top-row');

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('title-container');

  const title = document.createElement('h1');
  title.textContent = toTitleCase('profile');
  titleContainer.appendChild(title);

  const description = document.createElement('p');
  description.classList.add('page-description');
  description.textContent = "Your profile looks cool, but real skill isn't on the screen — it’s in what you actually build.";
  titleContainer.appendChild(description);

  titleTopRow.appendChild(titleContainer);

  // Panel Grid next to title
  const panelGrid = document.createElement('div');
  panelGrid.classList.add('title-panel-grid');
  panelGrid.id = 'title-panel-grid';

  // Create 90 cells
  for (let i = 0; i < 90; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.style.backgroundColor = 'black';
    panelGrid.appendChild(cell);
  }

  titleTopRow.appendChild(panelGrid);

  titleCard.appendChild(titleTopRow);

  const advice = document.createElement('div');
  advice.classList.add('page-advice');
  advice.textContent = " Focus on becoming good, not looking good.";
  titleCard.appendChild(advice);

  profileView.appendChild(titleCard);

  // Import and call the styleGridByTime function
  import('./test.js').then(module => {
    module.styleGridByTime();
  });

  const profileCard = document.createElement('div');
  profileCard.classList.add('profile-card');

  const avatar = document.createElement('img');
  avatar.src = userData.avatarUrl;
  avatar.alt = 'Profile Picture';
  avatar.classList.add('profile-card-avatar');
  profileCard.appendChild(avatar);

  const infoBlock = document.createElement('div');
  infoBlock.classList.add('profile-info-block');

  // Format user information like a .txt file with aligned colons
  const infoLines = [
    `Login       ${userData.login || userData.userName}`,
    `First Name  ${userData.firstName}`,
    `Last Name   ${userData.lastName}`,
    `Email       ${userData.email}`,
    `Talent      melgamous`,
    `Audit Ratio ${userData.auditRatio}`,
    `Total XP    ${(userData.totalXP / 1000).toFixed(0)} kb`,
    `Total Up    ${userData.totalUp || 'N/A'}`,
    `Total Down  ${userData.totalDown || 'N/A'}`
  ];

  infoLines.forEach(line => {
    const lineDiv = document.createElement('div');
    lineDiv.classList.add('profile-info-line');
    lineDiv.textContent = line;
    infoBlock.appendChild(lineDiv);
  });

  profileCard.appendChild(infoBlock);
  profileView.appendChild(profileCard);

  // Add XP progress chart
  const xpChart = document.createElement('div');
  xpChart.classList.add('xp-chart');
  xpChart.innerHTML = `
    <h2>XP Progress</h2>
    <div class="xp-progress">
      <div class="xp-bar" style="width: ${Math.min((userData.totalXP / 100000) * 100, 100)}%;"></div>
      <span class="xp-text">${(userData.totalXP / 1000).toFixed(0)} kb / 100 kb</span>
    </div>
  `;
  profileView.appendChild(xpChart);

  // Add recent audits
  if (userData.audits && userData.audits.length > 0) {
    const auditsSection = document.createElement('div');
    auditsSection.classList.add('recent-audits');
    auditsSection.innerHTML = '<h2>Recent Audits</h2>';
    const auditsList = document.createElement('ul');
    auditsList.classList.add('audits-list');

    userData.audits.slice(0, 5).forEach(audit => {
      const auditItem = document.createElement('li');
      auditItem.classList.add('audit-item');
      auditItem.innerHTML = `
        <h3>Audit for ${audit.group.path.split('/').pop()}</h3>
        <p><strong>Grade:</strong> ${audit.grade}</p>
        <p><strong>Date:</strong> ${new Date(audit.createdAt).toLocaleDateString()}</p>
      `;
      auditsList.appendChild(auditItem);
    });

    auditsSection.appendChild(auditsList);
    profileView.appendChild(auditsSection);
  }

  container.appendChild(profileView);
}
