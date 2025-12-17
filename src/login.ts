import './style.css'
import { announce } from './accessibility';
import { showAlert } from './modal';

const loginForm = document.getElementById('login-form') as HTMLFormElement;
const passwordInput = document.getElementById('password-input') as HTMLInputElement;

// Auth Check - Redirect if already logged in
if (sessionStorage.getItem('isAdmin')) {
    window.location.href = '/admin/bookings/';
}

if (loginForm && passwordInput) {
    // Focus input on load
    passwordInput.focus();

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = passwordInput.value;

        if (password === 'alaa123') {
            announce('تم تسجيل الدخول بنجاح');
            sessionStorage.setItem('isAdmin', 'true');
            window.location.href = '/admin/bookings/';
        } else {
            const errorMsg = 'كلمة المرور غير صحيحة';
            showAlert(errorMsg, { title: 'خطأ', icon: 'error' });
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
}
