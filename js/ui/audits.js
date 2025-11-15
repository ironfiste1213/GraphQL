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

  const titleTopRow = document.createElement('div');
  titleTopRow.classList.add('title-top-row');

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('title-container');

  const title = document.createElement('h1');
  title.textContent = toTitleCase('audits');
  titleContainer.appendChild(title);

  const description = document.createElement('p');
  description.classList.add('page-description');
  description.textContent = "Audits: where strangers judge your code and you pretend you’re not stressed. Take feedback — it makes you sharper.";
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
  advice.textContent = " Talk clearly, listen fully, argue less.";
  titleCard.appendChild(advice);

  auditsView.appendChild(titleCard);

  // Import and call the styleGridByTime function
  import('./test.js').then(module => {
    module.styleGridByTime();
  });

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
