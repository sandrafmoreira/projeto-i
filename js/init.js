//load data from local storage
//inject data from testing

import * as User from "./models/userModel.js";

initdata();

function initdata() {
// Users
if (!localStorage.users) {
    const users = [];
    users.forEach((user) => {
      User.add(user.username, user.password);
    });
  }
}