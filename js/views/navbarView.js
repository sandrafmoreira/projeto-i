import * as User from "/js/models/userModel.js";
import { editProfile } from '/js/editProfile.js';
import { changePassword } from '/js/editPassword.js';

// alert(User.admin());


document.addEventListener("DOMContentLoaded", () => {
    function navbarView() {

        User.init();

        let result = `
                <div class="nav-width white-nav">
                    <ul>
                    <li><a href="/html/about.html">SOBRE NÓS</a></li>
                    <li><a href="https://www.esmad.ipp.pt/" target="_blank">ESMAD</a></li>
                    <li><a href="/html/course.html">CURSO</a></li>
                    <li><a href="/index.html" id="navLogo">
                        <img src="/assets/logo.png" alt="tsiw logo" class="nav-logo">
                    </a></li>
                    <li class="nav-esc">
                        <a href="/html/maze.html">MAZE</a>
                        <img src="/assets/index/Labyrinth.png" alt="tsiw logo" class="nav-maze">
                    </li>
                `;

        if (User.isLogged()) {

            if (User.admin()) {
                result += `<li><a href="/html/adminDashboard.html">DASHBOARD</a></li>`
                // alert(User.admin())
            } else if (!User.admin(), "navbar") {
                result += `<li><a href="/html/dashboard.html">DASHBOARD</a></li>`
                // alert(User.admin(), "navbar")

            }

            result += `
                    <div class="nav_orange_divider"></div>
                    <!-- <div class="nav_after_login"> -->
                        <li><img id="nav_profile_pic" src="/assets/navbar/default user pic.png" alt="profile pic on navbar"></li>
                            <a href="" id="nav_dropdown_icon">
                            <img id="nav_dropdown_icon" src="/assets/navbar/nav_dropdown_icon.png" alt="dropdown icon on navbar">
                            <div id="dropmenu-div" style="display: none;">
                                <div>
                                    <img src="/assets/navbar/dropdownMenu/editar.png" alt="icon editar perfil">
                                    <a id="editProfileLink" href="">Editar Perfil</a>
                                </div>
                                <div>
                                    <img src="/assets/navbar/dropdownMenu/pw.png" alt="icon editar password">
                                    <a id="editPasswordLink" href="">Editar Palavra-Passe</a>
                                </div>
                                <div>
                                    <img src="/assets/navbar/dropdownMenu/logout.png" alt="icon logout">
                                    <a id="logout-btn" href="">Terminar Sessão</a>
                                </div>
                            </div>
                        </a></li>
                    <!-- </div> -->
                `;
        } else {
            result += `
                    <li><a id="loginLink" href="" class="nav-login-btn">INICIAR SESSÃO</a></li>
                    <div class="nav-orange-divider"></div>
                    <li><a href="/html/sign-up.html">CRIAR CONTA</a></li>
                `;
        } 

        result += `</ul></div>`;


        let navbar = document.getElementById("navbar");
        navbar.innerHTML = result;

        if (!User.isLogged()) {
            // alert("WARNING YOU ARE NOT LOGGED WARNING WARNING WARNING");
        } else {
            alert("YOU ARE LOGGED YOU ARE LOGGED YOU ARE LOGGED");
        }

        modals();



    }


    // funcções para carregar conteúdo das modais que se encontram em ficheiros html para as modais
    function modals() {
        //clicar em "Iniciar Sessão" na navbar:
        let loginLink = document.getElementById("loginLink");
        if (loginLink) {
            loginLink.addEventListener("click", (event) => {
                event.preventDefault();
                let loginModal = document.getElementById('login-modal-div');
                fetch('/html/login.html')
                    .then(response => response.text())
                    .then(content => {
                        document.getElementById('loginModalContent').innerHTML = content;
                        loginForm();
                    });

                loginModal.style.display = loginModal.style.display === 'none' ? 'block' : 'none';
            });
        }

        //clicar em "Terminar Sessão" no dropdown menu:
        let logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", (event) => {
                event.preventDefault();
                User.logout();
                navbarView();
                window.location.href = "/index.html";
            });
        }

        //clicar no dropdown menu da navbar:
        let navDropdownIcon = document.getElementById("nav_dropdown_icon");
        if (navDropdownIcon) {
            navDropdownIcon.addEventListener("click", (event) => {
                event.preventDefault();
                let dropMenu = document.getElementById('dropmenu-div');
                dropMenu.style.display = dropMenu.style.display === 'none' ? 'block' : 'none';
            });
        }

        //clicar em editar o perfil no dropdown menu:
        let editProfileLink = document.getElementById("editProfileLink");
        if (editProfileLink) {
            editProfileLink.addEventListener("click", (event) => {
                event.preventDefault();
                let editProfileModal = document.getElementById('edit-profile-modal-div');
                // obter a modal
                fetch('/html/editProfile.html')
                    .then(response => response.text())
                    .then(content => {
                        document.getElementById('editProfileModalContent').innerHTML = content;
                        editProfile() // clicar para editar o avatar
                    });
                editProfileModal.style.display = editProfileModal.style.display === 'none' ? 'block' : 'none';

            });
        }
        // Local Storage: obter a src nova do avatar
        const newAvatarImageSrc = localStorage.getItem('avatarImageSrc');
        // mudar a src do avatar da navbar para a nova src
        const avatarProfile = document.getElementById("nav_profile_pic");
        if (newAvatarImageSrc) {
            avatarProfile.src = newAvatarImageSrc;
            avatarProfile.style.width = "40px";
        }



        //clicar em editar password no dropdown menu:
        let editPasswordLink = document.getElementById("editPasswordLink");
        if (editPasswordLink) {
            editPasswordLink.addEventListener("click", (event) => {
                event.preventDefault();
                let editPasswordModal = document.getElementById('edit-password-modal-div');
                fetch('/html/editPassword.html')
                    .then(response => response.text())
                    .then(content => {
                        document.getElementById('editPasswordModalContent').innerHTML = content;
                        const closePasswordModal = document.getElementById("closePasswordModal");
                        closePasswordModal.addEventListener("click", () => {
                            editPasswordModal.style.display = editPasswordModal.style.display === 'none' ? 'block' : 'none';
                        })
                        changePassword();
                    });
                // para aparecer a modal ao clicar no link do dropdown:
                editPasswordModal.style.display = editPasswordModal.style.display === 'none' ? 'block' : 'none';
            });
        }

    }

    //clicar no form do login para iniciar sessão:
    function loginForm() {
        let loginForm = document.getElementById("login-form-btn");
        if (loginForm) {
            loginForm.addEventListener("click", (event) => {
                event.preventDefault();
                let email = document.getElementById("login-email").value;
                let password = document.getElementById("login-password").value;
                console.log(email, password); //teste
                User.login(email, password); //Chamar a funcao do login
                
                if (User.isLogged()) {
                    if (User.admin() == true) {
                        window.location.href = "/html/adminDashboard.html";
                    } else if (User.admin() == false) {
                        window.location.href = "/html/dashboard.html";
                    }
                }
            });
        }
    }

    if (User.isLogged()) {
        User.admin();
    }
    navbarView();

});


document.addEventListener("DOMContentLoaded", () => {
    let phoneNavbar = document.querySelector(".white-nav");

    const burger = document.querySelector(".hamburger");

    burger.addEventListener("click", () => {

        if (phoneNavbar.classList.contains('hidden')) {
            phoneNavbar.classList.remove('hidden')
        }
        else {
            phoneNavbar.classList.add('hidden')
        }
    })

})