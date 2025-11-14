import { userData } from "../api.js";

console.log("Projects.js loaded");

function toTitleCase(str) {
  return str
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function renderProjects(container) {
  const projectsView = document.createElement('div');
  projectsView.classList.add('projects-view');

  const titleCard = document.createElement('div');
  titleCard.classList.add('title-card');

  const title = document.createElement('h1');
  title.textContent = toTitleCase('projects');
  titleCard.appendChild(title);

  projectsView.appendChild(titleCard);

  if (userData.projects && userData.projects.length > 0) {
    const projectsGrid = document.createElement('div');
    projectsGrid.classList.add('projects-grid');

    // Sort projects from newest to oldest
    userData.projects.sort((a, b) => new Date(b.group.createdAt) - new Date(a.group.createdAt));

    userData.projects.forEach(project => {
      if (!project.group) return; // Skip if group is null
      const projectItem = document.createElement('div');
      projectItem.classList.add('project-item');

      const projectName = document.createElement('h3');
      const pathParts = project.group.path.split('/');
      const projectNameOnly = pathParts[pathParts.length - 1];
      projectName.textContent = toTitleCase(projectNameOnly);
      projectItem.appendChild(projectName);

      // XP Earned
      const xpEarned = document.createElement('p');
      xpEarned.classList.add('xp-earned');
      const xpEntry = userData.xp.find(xp => xp.path === project.group.path);
      const xpAmount = xpEntry ? xpEntry.amount : 0;
      const formattedXP = xpAmount >= 1000 ? `${(xpAmount / 1000).toFixed(0)}kb` : `${xpAmount}b`;
      xpEarned.textContent = `about ${formattedXP} xp earned from this project`;
      projectItem.appendChild(xpEarned);

      const dateContainer = document.createElement('div');
      dateContainer.classList.add('project-date');
      dateContainer.textContent = new Date(project.group.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      projectItem.appendChild(dateContainer);

      // Members section
      const membersContainer = document.createElement('div');
      membersContainer.classList.add('members-container');

      const membersTitle = document.createElement('h4');
      membersTitle.textContent = 'Members';
      membersContainer.appendChild(membersTitle);

      const membersList = document.createElement('div');
      membersList.classList.add('members-list');

      project.group.members.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member');

        const avatar = document.createElement('img');
        avatar.src = member.user.avatarUrl || 'default-avatar.png'; // Fallback if no avatar
        avatar.alt = `${member.userLogin} avatar`;
        avatar.classList.add('member-avatar');
        memberDiv.appendChild(avatar);

        const name = document.createElement('span');
        name.textContent = member.userLogin;
        name.classList.add('member-name');
        memberDiv.appendChild(name);

        membersList.appendChild(memberDiv);
      });

      membersContainer.appendChild(membersList);
      projectItem.appendChild(membersContainer);

      projectsGrid.appendChild(projectItem);
    });

    projectsView.appendChild(projectsGrid);
  } else {
    const noProjects = document.createElement('p');
    noProjects.textContent = 'No projects completed yet.';
    projectsView.appendChild(noProjects);
  }

  container.appendChild(projectsView);
}
