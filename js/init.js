//load data from local storage
//inject data from testing

import * as User from "./models/userModel.js";

initdata();

function initdata() {
// Users
if (!localStorage.users) {
    const users = [
      {
        id: 1,
        email: "sandra@123",
        password: "123",
      },
      {
        id: 2,
        email: "nuno@123",
        password: "123",
      },
      {
        id: 3,
        email: "ken@123",
        password: "123",
      },
    ];
    users.forEach((user) => {
      User.add(user.username, user.password);
    });
  }
}