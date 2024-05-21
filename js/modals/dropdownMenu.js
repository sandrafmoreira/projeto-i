// DROPDOWN MENU WHEN USER IS LOGGED
document.addEventListener("DOMContentLoaded", () => {
  let navDropdownIcon = document.getElementById("nav_dropdown_icon");

  navDropdownIcon.addEventListener("click", (event) => {
    event.preventDefault();
    let dropMenuModal = document.getElementById('drop-menu-modal-div');
    
    if (dropMenuModal.style.display === 'none') {
      dropMenuModal.style.display = 'block'; 
  } else if (dropMenuModal.style.display = 'block'){
      dropMenuModal.style.display = 'none'; 
  }
    
    fetch('/html/dropdownMenu.html') 
      .then(dropmenuPage => dropmenuPage.text()) 
        .then(content => {
          document.getElementById('dropMenuModalContent').innerHTML = content;
        })
  });
})



  