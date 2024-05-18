document.getElementById("open-login-modal").addEventListener("click", function(event) {
  event.preventDefault(); //evita a ação do link querer abrir uma nova pagina
  openLoginModal();
});

function openLoginModal() {
  let loginModal = document.getElementById('login-modal-div');
  loginModal.style.display = 'block'; //fazer aparecer

  //upload do conteudo da modal que esta noutra pag, para a div loginModalContent
  fetch('./html/login.html') //obter a pagina
      .then(loginPage => loginPage.text()) //obter o body em string
      .then(content => {
          document.getElementById("loginModalContent").innerHTML = content;
      })
}

document.querySelector(".close_modal_btn").addEventListener("click", function() {
  let loginModal = document.getElementById('login-modal');
  loginModal.style.display = 'none';
});



