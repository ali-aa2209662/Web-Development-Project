const loginForm = document.querySelector('#LoginForm');
const togglePasswordButton = document.querySelector('#TogglePassword');
const PasswordInput = document.querySelector('#Password');
const errorMessage = document.querySelector("error-message")

togglePasswordButton.addEventListener('click',function(){
    const isHidden = PasswordInput.type==='password'
    if (isHidden) {
        PasswordInput.type = 'text'
        togglePasswordButton.textContent = 'Show' 
    }
    else {
        PasswordInput.type = 'password'
        togglePasswordButton.textContent = 'Hide'
     }

})

loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    // Handle login logic here
    const username = document.querySelector("#Username").value
    const password = PasswordInput.value

    if (!username || !password) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Please fill in all fields.';
                return;
            }
 
            errorMessage.style.display = 'none';
            // TODO: connect to your backend authentication here
        });











