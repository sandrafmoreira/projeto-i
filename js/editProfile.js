// clicar para editar o avatar:
export function editProfile() {
    const editProfileAvatar = document.getElementById("profileAvatar");
    const avatarProgramador = document.getElementById("avatarProgramador");
    const avatarSherlock = document.getElementById("avatarSherlock");
    const avatarCaloiro = document.getElementById("avatarCaloiro");
    const avatarFinalista = document.getElementById("avatarFinalista");
    const changeAvatarButton = document.getElementById("changeAvatarButton");

    let selectedAvatarSrc = "";

    avatarProgramador.addEventListener("click", () => {
        editProfileAvatar.src = "/img/Avatars/scrum.png";
        editProfileAvatar.style.width = "75px"
        selectedAvatarSrc = editProfileAvatar.src;
    }) 
    avatarSherlock.addEventListener("click", () => {
        editProfileAvatar.src = "/img/Avatars/expert.png";
        editProfileAvatar.style.width = "75px"
        selectedAvatarSrc = editProfileAvatar.src;
    }) 
    avatarCaloiro.addEventListener("click", () => {
        editProfileAvatar.src = "/img/Avatars/caloiro.png";
        editProfileAvatar.style.width = "75px"
        selectedAvatarSrc = editProfileAvatar.src;
    }) 
    

    changeAvatarButton.addEventListener("click", () => {
        if(selectedAvatarSrc) {
            localStorage.setItem("avatarImageSrc", selectedAvatarSrc);
            alert("Alterações guardadas.")
        }
    })

    
    
}



