console.log("Router.js loaded");

// Simple hash-based router for SPA navigation
class Router {
  constructor() {
    this.routes = {};
    this.currentView = null;
    this.mainContent = null;
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  updateSidebarActiveState() {
    const currentHash = window.location.hash.slice(1) || 'dashboard';
    document.querySelectorAll('.sidebar-nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentHash}`) {
        link.classList.add('active');
      }
    });
  }

  addRoute(path, viewFunction) {
    this.routes[path] = viewFunction;
  }

  setMainContent(element) {
    this.mainContent = element;
  }

  navigate(path) {
    window.location.hash = path;
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    const viewFunction = this.routes[hash];
    if (viewFunction && this.mainContent) {
      // Clear previous content
      this.mainContent.innerHTML = '';
      // Render new view
      viewFunction(this.mainContent);
      this.currentView = hash;
      // Update sidebar active state
      this.updateSidebarActiveState();
    }
  }

  init() {
    this.handleRoute();
  }
}

export const router = new Router();
