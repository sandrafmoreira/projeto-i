import * as User from "/js/models/userModel.js"

document.addEventListener("DOMContentLoaded", () => {
    function navbarView() {
        User.init()

        let result = `
            <div class="nav-width white-nav">
                <a href="./html/about.html">SOBRE NÓS</a>
                <a href="https://www.esmad.ipp.pt/" target="_blank">ESMAD</a>
                <a href="./html/course.html">CURSO</a>
                <a href="#">
                    <img src="/assets/logo.png" alt="tsiw logo" class="nav-logo">
                </a>
                <div class="nav-esc">
                    <a href="./html/game.html">MAZE</a>
                    <img src="/assets/index/Labyrinth.png" alt="tsiw logo" class="nav-maze">
                </div>
        `
    
        if(User.isLogged()) {
            result += `
                <a href="./html/dashboard.html">DASHBOARD</a>
                <div class="nav_orange_divider"></div>
                <div class="nav_after_login">
                    <img id="nav_profile_pic" src="/assets/navbar/default user pic.png" alt="profile pic on navbar">
                    <a href="" id="nav_dropdown_icon">
                        <img id="nav_dropdown_icon" src="/assets/navbar/nav_dropdown_icon.png" alt="dropwdown icon on navbar">
                        <div id="dropmenu-div">
                            <div>
                                <img src="/assets/navbar/dropdownMenu/editar.png" alt="icon editar perfil">
                                <a id="editProfileLink" href="">Editar Perfil</a>
                            </div>
                            
                            <div>
                                <img src="/assets/navbar/dropdownMenu/pw.png" alt="icon editar password">
                                <a href="">Editar Palavra-Passe</a>
                            </div>
                            <div>
                                <img src="/assets/navbar/dropdownMenu/ajuda.png" alt="icon ajuda">
                                <a href="">Ajuda</a>
                            </div>
                            <div>
                                <img src="/assets/navbar/dropdownMenu/logout.png" alt="icon logout">
                                <a id="logout-btn" href="">Terminar Sessão</a>
                            </div>
                        </div>
                    </a>
                </div>
            `
        } else {
            result += `
                <a href="/html/login.html" class="nav-login-btn">INICIAR SESSÃO</a>
                <div class="nav-orange-divider"></div>
                <a href="./html/sign-up.html">CRIAR CONTA</a>
            `
        }
    
        result += `</div>`;
        

        // obter a navbar e mudar o seu conteúdo
        let navbar = document.getElementById("navbar");
        navbar.innerHTML = result;

        //teste
        if(!User.isLogged()) {
            alert("WARNING YOU ARE NOT LOGGED WARNING YOU ARE NOT LOGGED WARNING YOU ARE NOT LOGGED WARNING WARNING WARNING WARNING")
        } else {
            alert("YOU ARE LOGGED. YOU ARE LOGGED. YOU ARE LOGGED.")
        }
    
        // clicar no Button de "Iniciar Sessão"
        document.querySelector(".login_form")?.addEventListener("submit", (event) => {
            event.preventDefault();
            User.login(
                document.getElementById("login-email").value,
                document.getElementById("login-password").value
            );
            window.location.href = "/html/dashboard.html"; //redirecionar para a dashboard
        });
          
          // clicar no Button de "Terminar Sessão"
          document.querySelector("#logout-btn")?.addEventListener("click", () => {
            alert("HEHEHEHEH")
            User.logout();
            navbarView();
          });
      
        // Function to add event listener to login form button after content is loaded
        function addLoginFormEventListener() {
            let loginFormBtn = document.getElementById("login-form-btn");
            if (loginFormBtn) {
                loginFormBtn.addEventListener("click", () => {
                    window.history.back();
                });
            } else {
                console.error("Element with ID 'login-form-btn' not found after content load");
            }
        }

    
    }   
    
    navbarView();


     // clicar no dropdownmenu button
    let navDropdownIcon = document.getElementById("nav_dropdown_icon")
    navDropdownIcon.addEventListener("click", (event) => {
        event.preventDefault();
        let dropMenu = document.getElementById('dropmenu-div');
        
        if (dropMenu.style.display === 'none') {
        dropMenu.style.display = 'block'; 
        } else if (dropMenu.style.display = 'block'){
            dropMenu.style.display = 'none'; 
        }
    });


    // clicar no button para Editar o Perfil 
    let editProfileLink = document.getElementById("editProfileLink");
    editProfileLink.addEventListener("click", (event) => {
        event.preventDefault();
        let editProfileModal = document.getElementById('edit-profile-modal-div');
        
        fetch('/html/editProfile.html') 
        .then(editProfilePage => editProfilePage.text()) 
        .then(content => {
            document.getElementById('editProfileModalContent').innerHTML = content;
        })

        if (editProfileModal.style.display === 'none') {
        editProfileModal.style.display = 'block'; 
        } else if (editProfileModal.style.display = 'block'){
            editProfileModal.style.display = 'none'; 
        }
    
        
    });
})



