// import * as navbarView from "../views/navbarView.js"

// // let abc = document.getElementById("login-form-btn")

// // abc.addEventListener("click", (event) => {
// //   let input1 = document.getElementById("login-email")
// //   let input2 = document.getElementById("login-password")

// //   console.log(input1, input2);
// // })

// import * as User from "../models/userModel.js";
// document.addEventListener("DOMContentLoaded", () => {
//   let openLoginModalLink = document.getElementById("open-login-modal");
// console.log(openLoginModalLink);
//   openLoginModalLink.addEventListener("click", (event) => {
//     event.preventDefault(); //evita a ação do link querer abrir uma nova pagina
//     openLoginModal();
//   });

//   function openLoginModal() {
//     let loginModal = document.getElementById('login-modal-div');
//     loginModal.style.display = 'block'; //fazer aparecer

//     //upload do conteudo da modal que esta noutra pag, para a div loginModalContent
//     // fetch('./html/login.html') //obter a pagina
//     //     .then(loginPage => loginPage.text()) //obter o body em string
//     //     .then(content => {

//     //         document.getElementById("loginModalContent").innerHTML = content;
            

//             let btnCloseLogin = document.getElementById("close_modal_login_btn");
//             btnCloseLogin.addEventListener("click", function() {
//                 alert("Close button clicked");
//                 let loginModal = document.getElementById('login-modal-div');
//                 loginModal.style.display = 'none';
//             });
//         })
//   }

  
// })


// <3 isto funciona --v--
//upload do conteudo da modal que esta noutra pag, para a div loginModalContent que esta na navbar
// export function getLoginModalContent() {
//   let loginModalContent = document.getElementById("loginModalContent")
//   fetch('/html/login.html') //obter a pagina
//   .then(loginPage => loginPage.text()) //obter o body em string
//   .then(content => {
//     document.getElementById("loginModalContent").innerHTML = content;       
// })
// }

// getLoginModalContent()
