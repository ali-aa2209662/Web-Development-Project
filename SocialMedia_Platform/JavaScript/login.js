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
loginForm.addEventListener('submit', function(e){
    e.preventDefault();

    const usernameInput = document.querySelector("#Username") || document.querySelector("#username");
    const passwordInput = document.querySelector('#Password') || document.querySelector("#password");

    if (!usernameInput || !passwordInput) return; // stop if elements not on this page

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        if (errorMessage) { // only if it exists
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Please fill in all fields.';
        }
        return;
    }

    if (errorMessage) {
        errorMessage.style.display = 'none';
    }

    login(username,password)

    // TODO: backend authentication
});


// console.log(togglePasswordButton);
//SIGN-UP_____________________________________

const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const newpassword = document.querySelector("#Password").value;
    const cnfrmpassword = document.querySelector("#Confirm-password").value;
    // check if the password is correct
    if (newpassword===cnfrmpassword) {
        const password = newpassword;
        signup(username, email, password);

        alert("New Account Created!")
        

        window.location.href = "login.html";
    }
    
    

    
});
