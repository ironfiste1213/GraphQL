import { gettoken, isValid } from "./jwt.js";

console.log("Router.js loaded");

// Hash-based router for SPA navigation without server-side rewrites
class Router {
  constructor() {
    this.routes = {};
    this.currentView = null;
    this.mainContent = null;
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  getCurrentPath() {
    const hash = window.location.hash;
    if (!hash || hash === '#') return '/dashboard';
    return hash.startsWith('#') ? hash.slice(1) : hash;
  }

  updateSidebarActiveState() {
    const currentPath = this.getCurrentPath();
    document.querySelectorAll('.sidebar-nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentPath}`) {
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
    const targetHash = `#${path}`;
    if (window.location.hash === targetHash) {
      this.handleRoute();
      return;
    }
    window.location.hash = targetHash;
  }

  handleLocation(path) {
    const token = gettoken();
    if (!isValid(token)) {
      // If an unauthenticated user tries to access a routed view, force login URL.
      window.location.hash = "/login";
      window.location.reload();
      return null;
    }

    if (!this.routes[path]) {
      return '/dashboard';
    }

    return path;
  }

  handleRoute() {
    const requestedPath = this.getCurrentPath();
    const resolvedPath = this.handleLocation(requestedPath);
    if (!this.mainContent) return;
    if (!resolvedPath) return;

    if (resolvedPath !== requestedPath) {
      this.navigate(resolvedPath);
      return;
    }

    const viewFunction = this.routes[resolvedPath];
    // Clear previous content
    this.mainContent.innerHTML = '';
    // Render new view
    viewFunction(this.mainContent);
    this.currentView = resolvedPath;
    // Update sidebar active state
    this.updateSidebarActiveState();
  }

  init() {
    this.handleRoute();
  }
}

export const router = new Router();
