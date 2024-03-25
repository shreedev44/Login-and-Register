const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function () {

    if (password.getAttribute("type") === "password") {
        var type = "text";
    }
    else {
        var type = "password";
    }
    password.setAttribute("type", type);

    this.classList.toggle("bi-eye");
});
const toggle = document.querySelector("#togglePassword");
toggle.addEventListener('submit', function (x) {
    x.preventDefault();
});

//Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-Z]+$/;


// Login validation
let LoginForm = document.getElementById('LoginForm');
let nameError = document.getElementById('invalid-name');
let emailError = document.getElementById('invalid-email');
let passwordError = document.getElementById('invalid-password');

LoginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = LoginForm.querySelector('input[name="email"]').value.trim();
    const password = LoginForm.querySelector('input[name="password"]').value.trim();

    if (!emailRegex.test(email) && password.length < 8) {
        emailError.style.display = 'inline';
        passwordError.style.display = 'inline';
    }
    else if (!emailRegex.test(email)) {
        emailError.style.display = 'inline';
        passwordError.style.display = 'none';
    }
    else if (password.length < 8) {
        passwordError.style.display = 'inline';
        emailError.style.display = 'none';
    }
    else {
        passwordError.style.display = 'none';
        emailError.style.display = 'none';
        LoginForm.submit();
    }
});




