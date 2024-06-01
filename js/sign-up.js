import * as User from "./models/userModel.js"

User.init();

// criar conta ao preencher o form:
document.querySelector(".sign_form")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const signUpName = document.getElementById("signUpName").value;
    const signUpSurname = document.getElementById("signUpSurname").value;
    const signUpEmail = document.getElementById("signUpEmail").value;
    const signUpPassword = document.getElementById("signUpPassword").value;
    const signUpConfirmPassword = document.getElementById("signUpConfirmPassword").value;

    if (signUpPassword !== signUpConfirmPassword) {
        console.log(signUpPassword.value, signUpConfirmPassword.value);
        alert("Confirme a palavra-passe.")
    } else if (signUpPassword == signUpConfirmPassword) {
        User.add(signUpName, signUpSurname, signUpEmail, signUpPassword);
        localStorage.setItem("userPassword", signUpPassword);
        alert("Conta registada com sucesso!");
    }
})