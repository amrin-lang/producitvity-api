const User = require("../models/User")
const crypto = require('crypto')

//This file interacts with Databse:
//this is where we do all sorts of CRUD operations.
module.exports = {

  post: (params) => {
    return new Promise((resolve, reject) => {

      //
      if(!params.password){
        const error = {message: "Password is required"};
        reject(error);
      }

      //encrypt your password
      params.password = crypto
      .createHash("sha256")
      .update(params.password)
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
      
      //
      User.findOne({ username: param1 }).then((data)=>{
        if(!data){
          const error = {

            // back tick ` - allows you to access variables within 
            message: `User with username ${param1} does not exist`
          }
          reject(error)
        }
      });

      //validate to check if password exists.
      if(!param2.password){
        const error = {message: "Password is required"};
        reject(error);
      }
    
      


      //encrypt the password using sha256
      param2.password = crypto
        .createHash("sha256")
        .update(param2.password)
        .digest("hex");
        
      //UpdateOne() - will find some and update anyone.
      //findOneAndUpdate()- find only one and update 

      User.findOneAndUpdate(
        { username: param1 },
        { $set: { password: param2.password } },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

}