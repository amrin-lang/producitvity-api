const User = require("../models/User")

//This file interacts with Databse:
//this is where we do all sorts of CRUD operations.
module.exports = {

  post: (params) => {
    return new Promise((resolve, reject) => {
      User.create(params)
      .then((data) => resolve(data))
      .catch((error) => reject(error))
    })
  }


}