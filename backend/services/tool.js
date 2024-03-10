var UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//create admin
var createadmin = () => {
  bcrypt
    .hash("admin", saltRounds)
    .then((hash) => {
      var tempdata = new UserModel({
        name: "admin",
        password: hash,
        emailId: "admin@gmail.com",
        contact: "+8801924252248",
        type: "ADMIN",
      });
      tempdata
        .save()
        .then(() => {
          console.log("user created");
        })
        .catch((err) => {
          console.log("err1", err);
        });
    })
    .catch((err) => {
      console.log("err2", err);
    });
};

// createadmin();

var hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(password, saltRounds)
      .then(function (hash) {
        resolve(hash);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = { createadmin, hashPassword };
