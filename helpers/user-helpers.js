const db = require("../config/connection");
const collections = require("../config/collections");
const bcrypt = require("bcrypt");

module.exports = {
  doSignUp: (user) => {
    return new Promise(async (resolve, rejection) => {
      user.password = await bcrypt.hash(user.password, 10);
      db
        .get()
        .collection(collections.USER_COLLECTION)
        .insertOne(user)
        .then((data) => {
          db.get()
            .collection(collections.USER_COLLECTION)
            .findOne({ _id: data.insertedId })
            .then((user) => {
              resolve(user);
            });
        });
    });
  },
  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let user = await db
        .get()
        .collection(collections.USER_COLLECTION)
        .findOne({ email_id: userData.email_id });
      if (user) {
        bcrypt.compare(userData.password, user.password).then((status) => {
          if (status) {
            response.status = true;
            response.user = user;
            response.messsage = "Login Success";
            resolve(response);
          } else {
            resolve({ status: false, messsage: "Incorrect Password" });
          }
        });
      } else {
        resolve({ status: false, messsage: "User not Found" });
      }
    });
  },
};
