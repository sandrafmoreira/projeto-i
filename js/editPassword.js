import * as User from "/js/models/userModel.js";


export function changePassword() {

    document.querySelector(".modal_password_form").addEventListener("submit", (event) => {
        event.preventDefault();
         
        const currentPassword = document.getElementById("currentPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmNewPassword = document.getElementById("confirmNewPassword").value;
    
        const savedPassword = localStorage.getItem("userPassword");


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
        if(loggedUser) {
            const userEmail = loggedUser.email;
            User.users.forEach(user => {
                if(user.email == userEmail) {
                    user.password = newPassword;
                    localStorage.setItem("users", JSON.stringify(User.users));
                }
            })
        }


    })
}
    


