const togglePassword = document.querySelector("#togglePassword");
let password = document.querySelector("#password");

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


// Register Validation
let SignupForm = document.querySelector('#SignupForm');
let nameError = document.getElementById('invalid-name');
let emailError = document.getElementById('invalid-email');
let passwordError = document.getElementById('invalid-pass');

SignupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let email = SignupForm.querySelector('#email').value.trim();
    let password = SignupForm.querySelector('#password').value.trim();
    let Fname = SignupForm.querySelector('#Fname').value.trim();
    let Lname = SignupForm.querySelector('#Lname').value.trim();

    if (!nameRegex.test(Fname) || !nameRegex.test(Lname)) {
        nameError.style.display = 'inline';
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
    }
    else if (!emailRegex.test(email)) {
        emailError.style.display = 'inline';
        nameError.style.display = 'none';
        passwordError.style.display = 'none';
    }
    else if (password.length < 8) {
        passwordError.style.display = 'inline';
        nameError.style.display = 'none';
        emailError.style.display = 'none';
    }
    else {
        passwordError.style.display = 'none';
        nameError.style.display = 'none';
        passwordError.style.display = 'none';
        SignupForm.submit();
    }
})