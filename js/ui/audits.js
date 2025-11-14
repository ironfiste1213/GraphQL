import { userData } from "../api.js";

console.log("Audits.js loaded");

function toTitleCase(str) {
  return str
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function renderAudits(container) {
  const auditsView = document.createElement('div');
  auditsView.classList.add('audits-view');

  const titleCard = document.createElement('div');
  titleCard.classList.add('title-card');

  const title = document.createElement('h1');
  title.textContent = toTitleCase('audits');
  titleCard.appendChild(title);

  auditsView.appendChild(titleCard);

  if (userData.audits && userData.audits.length > 0) {
    const auditsGrid = document.createElement('div');
    auditsGrid.classList.add('audits-grid');

    userData.audits.forEach(audit => {
      const auditCard = document.createElement('div');
      auditCard.classList.add('audit-card');

      const projectName = toTitleCase(audit.group.path.split('/').pop());

      auditCard.innerHTML = `
        <h3>${projectName}</h3>
        <p class="audit-date">${new Date(audit.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
      `;

      auditsGrid.appendChild(auditCard);
    });

    auditsView.appendChild(auditsGrid);
  } else {
    const noAudits = document.createElement('p');
    noAudits.textContent = 'No audits available.';
    auditsView.appendChild(noAudits);
  }

  container.appendChild(auditsView);
}
