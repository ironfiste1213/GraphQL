import { userData } from "../api.js";
import { renderSidebar } from "./sidebar.js";
import { router } from "../router.js";
import { renderDashboard as renderDashboardView } from "./dashboard.js";
import { renderProjects } from "./projects.js";
import { renderAudits } from "./audits.js";
import { renderProfile } from "./profile.js";

function toTitleCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

console.log("Dashboard.js loaded");

export function renderDashboardLayout() {
  const appDiv = document.getElementById('app');
  appDiv.innerHTML = ''; // Clear previous content

  // Create layout container
  const layout = document.createElement('div');
  layout.classList.add('dashboard-layout');

  // Sidebar
  const sidebar = renderSidebar();
  layout.appendChild(sidebar);

  // Main content area
  const main = document.createElement('main');
  main.classList.add('main-content');
  main.id = 'main-content';
  layout.appendChild(main);

  appDiv.appendChild(layout);

  // Set up router
  router.setMainContent(main);
  router.addRoute('dashboard', renderDashboardView);
  router.addRoute('projects', renderProjects);
  router.addRoute('audits', renderAudits);
  router.addRoute('profile', renderProfile);
  router.init();

  // Update sidebar active state after router init
  router.updateSidebarActiveState();
}

export function renderDashboard(container) {
  const dashboard = document.createElement('div');
  dashboard.classList.add('dashboard-view');

  const titleCard = document.createElement('div');
  titleCard.classList.add('title-card');

  const title = document.createElement('h1');
  title.textContent = toTitleCase('dashboard');
  titleCard.appendChild(title);

  dashboard.appendChild(titleCard);

  const welcome = document.createElement('p');
  welcome.textContent = `Welcome back, ${userData.firstName}! Here's an overview of your progress.`;
  dashboard.appendChild(welcome);

  // Info cards
  const infoCards = document.createElement('div');
  infoCards.classList.add('info-cards');

  const totalXP = document.createElement('div');
  totalXP.classList.add('info-card');
  totalXP.innerHTML = `
    <h3>Total XP</h3>
    <p>${(userData.totalXP / 1000).toFixed(0)} kb</p>
  `;
  infoCards.appendChild(totalXP);

  const auditRatio = document.createElement('div');
  auditRatio.classList.add('info-card');
  auditRatio.innerHTML = `
    <h3>Audit Ratio</h3>
    <p>${userData.auditRatio}</p>
  `;
  infoCards.appendChild(auditRatio);

  const projects = document.createElement('div');
  projects.classList.add('info-card');
  projects.innerHTML = `
    <h3>Projects Completed</h3>
    <p>${userData.projectCount}</p>
  `;
  infoCards.appendChild(projects);

  dashboard.appendChild(infoCards);

  // Charts container
  const chartsContainer = document.createElement('div');
  chartsContainer.classList.add('charts-container');

  // XP Over Time Line Chart
  const xpChartContainer = document.createElement('div');
  xpChartContainer.classList.add('chart-container', 'xp-chart-container');
  xpChartContainer.innerHTML = '<h2>XP Over Time</h2>';
  const xpSvg = createXPLineChart();
  xpChartContainer.appendChild(xpSvg);
  chartsContainer.appendChild(xpChartContainer);

  // Audit Ratio Donut Chart
  const auditChartContainer = document.createElement('div');
  auditChartContainer.classList.add('chart-container', 'audit-chart-container');
  auditChartContainer.innerHTML = '<h2>Audit Ratio</h2>';
  const auditSvg = createAuditRatioChart();
  auditChartContainer.appendChild(auditSvg);
  chartsContainer.appendChild(auditChartContainer);

  dashboard.appendChild(chartsContainer);

  container.appendChild(dashboard);
}

function createXPLineChart() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '800');
  svg.setAttribute('height', '400');
  svg.setAttribute('viewBox', '0 0 800 400');
  svg.classList.add('xp-chart-svg');

  if (!userData.xp || userData.xp.length === 0) {
    const noData = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    noData.setAttribute('x', '400');
    noData.setAttribute('y', '200');
    noData.setAttribute('text-anchor', 'middle');
    noData.setAttribute('fill', '#cccccc');
    noData.textContent = 'No XP data available';
    svg.appendChild(noData);
    return svg;
  }

  // Sort XP data by createdAt
  const sortedXP = userData.xp.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // Calculate cumulative XP
  let cumulativeXP = 0;
  const cumulativeData = sortedXP.map(item => {
    cumulativeXP += item.amount;
    return {
      date: new Date(item.createdAt),
      xp: cumulativeXP,
      path: item.path
    };
  });

  // Find min/max values
  const minXP = 0;
  const maxXP = Math.max(...cumulativeData.map(d => d.xp));
  const minDate = cumulativeData[0].date;
  const maxDate = cumulativeData[cumulativeData.length - 1].date;

  // Scale functions
  const scaleX = (date) => 50 + ((date - minDate) / (maxDate - minDate)) * 700;
  const scaleY = (xp) => 350 - ((xp - minXP) / (maxXP - minXP)) * 300;

  // Draw axes
  const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  xAxis.setAttribute('x1', '50');
  xAxis.setAttribute('y1', '350');
  xAxis.setAttribute('x2', '750');
  xAxis.setAttribute('y2', '350');
  xAxis.setAttribute('stroke', '#404040');
  svg.appendChild(xAxis);

  const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  yAxis.setAttribute('x1', '50');
  yAxis.setAttribute('y1', '50');
  yAxis.setAttribute('x2', '50');
  yAxis.setAttribute('y2', '350');
  yAxis.setAttribute('stroke', '#404040');
  svg.appendChild(yAxis);

  // Add Y-axis labels (XP values)
  for (let i = 0; i <= 5; i++) {
    const yValue = (maxXP / 5) * i;
    const yPos = 350 - (i / 5) * 300;
    const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    tick.setAttribute('x1', '45');
    tick.setAttribute('y1', yPos);
    tick.setAttribute('x2', '55');
    tick.setAttribute('y2', yPos);
    tick.setAttribute('stroke', '#404040');
    svg.appendChild(tick);

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', '35');
    label.setAttribute('y', yPos + 5);
    label.setAttribute('text-anchor', 'end');
    label.setAttribute('fill', '#cccccc');
    label.setAttribute('font-size', '12');
    label.textContent = Math.round(yValue / 1000) + 'k';
    svg.appendChild(label);
  }

  // Add X-axis labels (dates)
  const numLabels = Math.min(5, cumulativeData.length);
  for (let i = 0; i < numLabels; i++) {
    const index = Math.floor((cumulativeData.length - 1) / (numLabels - 1)) * i;
    const dataPoint = cumulativeData[index];
    const xPos = scaleX(dataPoint.date);
    const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    tick.setAttribute('x1', xPos);
    tick.setAttribute('y1', '345');
    tick.setAttribute('x2', xPos);
    tick.setAttribute('y2', '355');
    tick.setAttribute('stroke', '#404040');
    svg.appendChild(tick);

    const daysSinceStart = Math.floor((dataPoint.date - minDate) / (1000 * 60 * 60 * 24)) + 1;
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', xPos);
    label.setAttribute('y', '370');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('fill', '#cccccc');
    label.setAttribute('font-size', '12');
    label.textContent = `Day ${daysSinceStart}`;
    svg.appendChild(label);
  }

  // Create path for line
  const pathData = cumulativeData.map((d, i) => {
    const x = scaleX(d.date);
    const y = scaleY(d.xp);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathData);
  path.setAttribute('stroke', '#00d4ff');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('fill', 'none');
  svg.appendChild(path);

  // Add points
  cumulativeData.forEach(d => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', scaleX(d.date));
    circle.setAttribute('cy', scaleY(d.xp));
    circle.setAttribute('r', '4');
    circle.setAttribute('fill', '#00d4ff');
    circle.setAttribute('stroke', '#ffffff');
    circle.setAttribute('stroke-width', '1');
    svg.appendChild(circle);
  });

  return svg;
}

function createAuditRatioChart() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '400');
  svg.setAttribute('height', '400');
  svg.setAttribute('viewBox', '0 0 400 400');
  svg.classList.add('audit-chart-svg');

  const centerX = 200;
  const centerY = 200;
  const radius = 100;

  // Background circle
  const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  bgCircle.setAttribute('cx', centerX);
  bgCircle.setAttribute('cy', centerY);
  bgCircle.setAttribute('r', radius);
  bgCircle.setAttribute('fill', 'none');
  bgCircle.setAttribute('stroke', '#404040');
  bgCircle.setAttribute('stroke-width', '20');
  svg.appendChild(bgCircle);

  // Foreground circle (progress)
  const ratio = parseFloat(userData.auditRatio) || 0;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(ratio, 2); // Cap at 2 for visual purposes
  const strokeDasharray = (progress / 2) * circumference;
  const strokeDashoffset = circumference - strokeDasharray;

  const fgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  fgCircle.setAttribute('cx', centerX);
  fgCircle.setAttribute('cy', centerY);
  fgCircle.setAttribute('r', radius);
  fgCircle.setAttribute('fill', 'none');
  fgCircle.setAttribute('stroke', ratio >= 1 ? '#28a745' : '#dc3545');
  fgCircle.setAttribute('stroke-width', '20');
  fgCircle.setAttribute('stroke-dasharray', `${strokeDasharray} ${circumference - strokeDasharray}`);
  fgCircle.setAttribute('stroke-dashoffset', strokeDashoffset);
  fgCircle.setAttribute('transform', `rotate(-90 ${centerX} ${centerY})`);
  svg.appendChild(fgCircle);

  // Center text
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', centerX);
  text.setAttribute('y', centerY - 10);
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('fill', '#ffffff');
  text.setAttribute('font-size', '32');
  text.setAttribute('font-weight', 'bold');
  text.textContent = ratio.toFixed(1);
  svg.appendChild(text);

  const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  label.setAttribute('x', centerX);
  label.setAttribute('y', centerY + 20);
  label.setAttribute('text-anchor', 'middle');
  label.setAttribute('fill', '#cccccc');
  label.setAttribute('font-size', '18');
  label.textContent = 'Audit Ratio';
  svg.appendChild(label);

  return svg;
}
