import { signup, login } from "./auth.js"

const loginForm = document.querySelector('#LoginForm');
const togglePasswordButton = document.querySelectorAll('.TogglePassword');
const PasswordInput = document.querySelector('#Password');



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
        const errorMessage = document.getElementById("error-message");

        if (!usernameInput || !passwordInput) return;

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username || !password) {
            errorMessage.textContent = "Please enter both username and password.";
            errorMessage.style.display = "block";
            return;
        }

        if (login(username, password)) {
            alert("Login successful!");
            window.location.href = "home.html";
        } else {
            errorMessage.textContent = "Invalid username or password.";
            errorMessage.style.display = "block";
            errorMessage.style.color = "red";
            
            

        }} );
}


    



// console.log(togglePasswordButton);
//SIGN-UP_____________________________________

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector("#signup-form");

    if (!signupForm) return;

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // console.log("AHHHHHHHHHHHHHHHH");

        const username = document.querySelector("#username").value.trimEnd();
        const email = document.querySelector("#email").value.trimEnd();
        const newpassword = document.querySelector("#Password").value.trimEnd();
        const cnfrmpassword = document.querySelector("#Confirm-password").value.trimEnd();

        if (newpassword === cnfrmpassword) {
            signup(username, email, newpassword);
            alert("New Account Created!");
            window.location.href = "login.html";
        }
        else {
            const errorMessage = document.querySelector(".field-error-password");
            errorMessage.textContent = "Passwords do not match.";
            errorMessage.style.display = "block";
            errorMessage.style.color = "red";
        }
    });
    function toggleInfo() {
    const infoText = document.getElementById("password-info");
    infoText.classList.toggle("hidden");}

    document.querySelector(".info-icon").addEventListener("click", toggleInfo);


});
