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
  },

  login: (params) =>{
    return new Promise((resolve,reject)=>{

      //validate if the username is provided
      if(!params.username){
        const error = {message: "Username is required"};
        reject(error);
      }

      //validate to check if the passowrd exists | it DOESN'T check if it's right
      if(!params.password){
        const error = {message: "Password is required"};
        reject(error);
      }

      //encrypt your password
      params.password = crypto
      .createHash("sha256")
      .update(params.password)
      .digest("hex")

      //abcd, 1234

      //Check to see if user is given credentials exists in the database.
      User.findOne(params, {password: false})
      .then((data)=>{

        //check if you got anything back
        //select * from user where username = `user_username` AND password ='given password'
        if(!data){
          const error ={
            message: "User with given credentials does not exist"
          };
          reject(error);

        }

        //if you reach here, then it means you got something back
        resolve(data);
      }).catch((error)=> reject(error))

    })
  }

}