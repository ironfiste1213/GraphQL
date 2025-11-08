const appDiv = document.getElementById('app');
export function renderLogin() {
    if (appDiv) {
        appDiv.innerHTML = ``
    }
    const title = document.createElement('h2');
    title.textContent = 'Login';
    appDiv.appendChild(title);
    const form = document.createElement('form');
    form.id = 'login-form';
    appDiv.appendChild(form);
    const emailInput = document.createElement('input');
    emailInput.type = 'text';
    emailInput.placeholder = 'Username or Email';
    emailInput.required = true;
    form.appendChild(emailInput);
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.required = true;
    form.appendChild(passwordInput);
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Login';
    form.appendChild(submitButton);
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    appDiv.appendChild(errorDiv);
}

