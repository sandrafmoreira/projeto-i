/**
 * CLASSE QUE MODELA UM UTILIZADOR NA APLICAÇÃO
 */
export class User {

    constructor(name, surname, email, password) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
    }

}
export let users = [];
// let admin1 = new User("Sandra", "Moreira", "sandra@123", "123");
let admin2 = new User("Nuno", "Nogueira", "nuno@123", "123");
let admin3 = new User("Ken", "Lukau", "ken@123", "123");
users.push( admin2, admin3);
console.log(users);

// descarregar utilizadores da local storage:
export function init() {
    if(localStorage.users) {
        const tempUsers = JSON.parse(localStorage.users);
        for(let user of tempUsers) {
            users.push(new User(user.name, user.surname, user.email, user.password))
        }
    }
}

// descarregar user que esta a fazer login da local storage:
export function login(email, password) {
    const user = users.find(user =>
        user.email == email && user.password == password
    ); 
    if (user) {
        sessionStorage.setItem("loggedUser", JSON.stringify(user));
    } 
}

// verificar se o user existe:
export function isLogged() {
    return sessionStorage.getItem("loggedUser") ? true : false;
  }

// logout:
export function logout() {
    sessionStorage.removeItem("loggedUser");
}

// adicionar conta:
export function add(name, surname, email, password) {
    if(users.some(user => user.email === email)) {
        alert("Já existe uma conta com esse email.")
        throw Error(`Já existe uma conta com esse email.`);
    } else {
        users.push(
            new User(name, surname, email, password)
        )
        // atualizar a local storage:
        localStorage.setItem("users", JSON.stringify(users));
    }
    console.log(users);
}

