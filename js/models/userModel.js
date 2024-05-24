/**
 * CLASSE QUE MODELA UM UTILIZADOR NA APLICAÇÃO
 */
export default class User {
    email = "";
    password = "";
    
    constructor(email, password) {
        this.email = email;
        this.password = password;
        
    }
}

let users = [];
let admin1 = new User("sandra@123", "123");
users.push(admin1);
console.log(users);

// Adicionar à local storage
localStorage.setItem("users", JSON.stringify(users));

// Descarregar utilizadores da Localstorage - function init()
export function init() {
    if(localStorage.users) {
        const tempUsers = JSON.parse(localStorage.users);
        for(let user of tempUsers) {
            users.push(new User(user.email, user.password))
        }
        console.log("users loaded:", users);
    } else {
        users = [];
        console.log("no users in local storage");
    }
}

// Descarregar user que esta a fazer login da local storage
export function login(email, password) {
    console.log("trying to log in with email:", email, "and password:", password);
    const user = users.find((user) =>
        user.email == email && user.password == password
    ); 
    console.log("user:", user);
    if (user) {
        sessionStorage.setItem("loggedUser", JSON.stringify(user));
        console.log("User logged in.");
        return true;
    } else {
        console.log("Login failed. User not found or credentials mismatch.");
    }
}

// USER logout
export function logout() {
    sessionStorage.removeItem("loggedUser");
}

// verificar se o user existe
export function isLogged() {
    return sessionStorage.getItem("loggedUser") ? true : false;
  }
  
  

