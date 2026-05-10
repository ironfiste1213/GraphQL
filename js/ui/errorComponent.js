// Custom Error Component
console.log("errorComponent.js loaded");

export function createErrorDiv(id = "error-message") {
  const errorDiv = document.createElement("div");
  errorDiv.id = id;
  errorDiv.classList.add("error-container");
  errorDiv.style.display = "none";
  return errorDiv;
}

export function showError(errorDiv, message) {
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    errorDiv.classList.add("error-visible");
  }
}

export function hideError(errorDiv) {
  if (errorDiv) {
    errorDiv.textContent = "";
    errorDiv.style.display = "none";
    errorDiv.classList.remove("error-visible");
  }
}

export function clearError(errorDiv) {
  hideError(errorDiv);
}
