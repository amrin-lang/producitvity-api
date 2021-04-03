const User = require("../models/User")
const crypto = require('crypto')

//This file interacts with Databse:
//this is where we do all sorts of CRUD operations.
module.exports = {

  post: (params) => {
    return new Promise((resolve, reject) => {
      //encrypt your password
      params.password_hash = crypto
      .createHash("sha256")
      .update(params.password_hash)
      .digest("hex")

      //then create your user
      User.create(params)
      .then((data) => resolve(data))
      .catch((error) => reject(error))
    })
  },

  //update param2 WHERE id is param1
  //param1 is username
  //param2 is new password 
  put: (param1, param2) => {
    return new Promise((resolve, reject) => {
      //encrypt the password using sha256
      param2.password_hash = crypto
        .createHash("sha256")
        .update(param2.password_hash)
        .digest("hex");
      User.findOneAndUpdate(
        { username: param1 },
        { $set: { password_hash: param2.password_hash } },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

}