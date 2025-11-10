export function clearPreviousUI() {
    const appDiv = document.getElementById('app');
    if (appDiv) {
        appDiv.innerHTML = '';
    }
}
