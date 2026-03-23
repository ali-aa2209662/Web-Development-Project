const loginForm = document.querySelector('#LoginForm');
const togglePasswordButton = document.querySelectorAll('.TogglePassword');
const PasswordInput = document.querySelector('#Password');
const errorMessage = document.querySelector("#error-message") || null;

// Toggle password visibility
togglePasswordButton.forEach(button => {
    const passwordInput = button.previousElementSibling; // find the input right before the button

    button.addEventListener('click', function() {
        const isHidden = passwordInput.type === 'password';
        passwordInput.type = isHidden ? 'text' : 'password';
        button.textContent = isHidden ? 'Hide' : 'Show';
    });
});

// Form submission
if (loginForm) { // only attach if form exists
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

        // TODO: backend authentication
    });
}

console.log(togglePasswordButton);
