// MODAL PARA EDITAR O PERFIL
document.addEventListener("DOMContentLoaded", () => {
  let editProfileLink = document.getElementById("editProfileLink");

  editProfileLink.addEventListener("click", (event) => {
    event.preventDefault();
    let editProfileModal = document.getElementById('edit-profile-modal-div');
    
    if (editProfileModal.style.display === 'none') {
      editProfileModal.style.display = 'block'; 
    } else if (editProfileModal.style.display = 'block'){
        editProfileModal.style.display = 'none'; 
    }

    fetch('/html/editProfile.html') 
      .then(editProfilePage => editProfilePage.text()) 
        .then(content => {
          document.getElementById('editProfileModalContent').innerHTML = content;
        })
  });
})


