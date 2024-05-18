// DROPDOWN MENU WHEN USER IS LOGGED
document.getElementById("nav_dropdown_icon").addEventListener("click", function(event) {
    event.preventDefault();
    openDropMenuModal();
  });
  
  function openDropMenuModal() {
    let dropMenuModal = document.getElementById('drop-menu-modal-div');
    dropMenuModal.style.display = 'block'; 
  
    fetch('/html/dropdownMenu.html') 
        .then(dropmenuPage => dropmenuPage.text()) 
        .then(content => {
            content = document.getElementById('nav-dropdown-menu').innerHTML
        })
  }
  