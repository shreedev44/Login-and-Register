const togglePassword1 = document.querySelector("#togglePassword1");
const togglePassword2 = document.querySelector("#togglePassword2");

const password1 = document.querySelector("#password1");
const password2 = document.querySelector("#password2");

togglePassword1.addEventListener("click", function () {

    if (password1.getAttribute("type") === "password") {
        var type = "text";
    }
    else {
        var type = "password";
    }
    password1.setAttribute("type", type);

    this.classList.toggle("bi-eye");
});
togglePassword2.addEventListener("click", function () {

    if (password2.getAttribute("type") === "password") {
        var type = "text";
    }
    else {
        var type = "password";
    }
    password2.setAttribute("type", type);

    this.classList.toggle("bi-eye");
});
const toggle1 = document.querySelector("#togglePassword1");
toggle1.addEventListener('submit', (x) => {
    x.preventDefault();
});
const toggle2 = document.querySelector("#togglePassword2");
toggle2.addEventListener('submit', (x) => {
    x.preventDefault();
});


let PasswordForm = document.getElementById('ChangePasswordForm');
let samePasswordError = document.getElementById('same-password');
let invalidPasswordError = document.getElementById('invalid-password');

PasswordForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const OldPassword = PasswordForm.querySelector('input[name="OldPassword"]').value.trim();
    const NewPassword = PasswordForm.querySelector('input[name="NewPassword"]').value.trim();

    if (OldPassword == NewPassword) {
        samePasswordError.style.display = 'inline';
        invalidPasswordError.style.display = 'none';
    }
    else if (NewPassword.length < 8) {
        samePasswordError.style.display = 'none';
        invalidPasswordError.style.display = 'inline';
    }
    else {
        samePasswordError.style.display = 'none';
        invalidPasswordError.style.display = 'none';
        PasswordForm.submit();
    }
});