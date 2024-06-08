import * as User from "/js/models/userModel.js";

console.log(User.users);

export function changePassword() {

    document.querySelector(".modal_password_form").addEventListener("submit", (event) => {
        event.preventDefault();
         
        const currentPassword = document.getElementById("currentPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmNewPassword = document.getElementById("confirmNewPassword").value;
    
        const savedPassword = localStorage.getItem("userPassword");

        console.log(currentPassword, newPassword, confirmNewPassword, savedPassword);

        if(currentPassword == newPassword) {
            alert("Insere uma nova palavra-passe.")
            return
        }
    
        if(newPassword !== confirmNewPassword) {
            alert("Confirma a palavra-passe.")
            return
        }

        
        // obter o user através do email para guardar na localstorage a newPassword
        const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
        console.log(loggedUser);
        if(loggedUser) {
            const userEmail = loggedUser.email;
            console.log(userEmail);
            User.users.forEach(user => {
                if(user.email == userEmail) {
                    user.password = newPassword;
                    console.log(user.password);
                    localStorage.setItem("users", JSON.stringify(User.users));
                    console.log(User.users);
                }
            })
        }


    })
}
    


