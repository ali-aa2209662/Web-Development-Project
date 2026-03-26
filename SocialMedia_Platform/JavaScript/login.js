import { signup, login } from "./auth.js"

const loginForm = document.querySelector('#LoginForm');
const togglePasswordButton = document.querySelectorAll('.TogglePassword');
const PasswordInput = document.querySelector('#Password');
const errorMessage = document.querySelector("#error-message") || null;


// Toggle password visibility
togglePasswordButton.forEach(button => {
    const passwordInput = button.previousElementSibling;
    const icon = button.querySelector('i');

    button.addEventListener('click', () => {
        const isHidden = passwordInput.type === 'password';
        passwordInput.type = isHidden ? 'text' : 'password';

        icon.classList.toggle("fa-eye");
        icon.classList.toggle("fa-eye-slash");
    });
});

// loginForm submission
if (loginForm) {
    loginForm.addEventListener('submit', function(e){
        e.preventDefault();

        const usernameInput = document.querySelector("#Username") || document.querySelector("#username");
        const passwordInput = document.querySelector('#Password') || document.querySelector("#password");

        if (!usernameInput || !passwordInput) return;

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username || !password) {
            if (errorMessage) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Please fill in all fields.';
            }
            return;
        }

        if (errorMessage) {
            errorMessage.style.display = 'none';
        }

        login(username, password);
    });
}


// console.log(togglePasswordButton);
//SIGN-UP_____________________________________

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector("#signup-form");

    if (!signupForm) return;

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // console.log("AHHHHHHHHHHHHHHHH");

        const username = document.querySelector("#username").value;
        const email = document.querySelector("#email").value;
        const newpassword = document.querySelector("#Password").value;
        const cnfrmpassword = document.querySelector("#Confirm-password").value;

        if (newpassword === cnfrmpassword) {
            signup(username, email, newpassword);
            alert("New Account Created!");
            window.location.href = "login.html";
        }
    });
});