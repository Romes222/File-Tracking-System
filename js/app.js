
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const adminDashboard = document.getElementById('admin-dashboard');
    const userDashboard = document.getElementById('user-dashboard');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        if (username === 'admin') {
            loginForm.parentElement.classList.add('d-none');
            adminDashboard.classList.remove('d-none');
        } else {
            loginForm.parentElement.classList.add('d-none');
            userDashboard.classList.remove('d-none');
        }
    });
});
    