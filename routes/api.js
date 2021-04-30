const express = require("express")
const randomString = require("randomstring")
const nodemailer = require("nodemailer")
const userController = require("../controllers/userController")

//creating the router
const router = express.Router()

//set up routes for creating users
router.post("/users",(req,res)=>{
  console.log(req.body)
  userController.post(req.body)
  .then((data) => {
    res.json({
      confirmation: "success",
      data: data
    })
  })
  .catch((error) => {
    return res.status(400).json({
      confirmation: "fail",
      error: error.message
    })
  })
})

//update user -> update password
//users/amreen123
router.put("/users/:username",(req,res)=>{
  const username = req.params.username;
  //2 paramters for PUT 
  //param1 - username
  //param2 - new password
  userController.put(username,req.body)
  .then((data) => {
    res.json({
      confirmation: "success",
      data: data
    })
  })
  .catch((error) => {
    return res.status(400).json({
      confirmation: "fail",
      error: error.message
    })
  })

})



//authenticate 
router.post("/login", (req, res) => {
  userController
    .login(req.body)
    .then((data) => {
      res.status(200).json({
        confirmation: "success",
        data: data,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        confirmation: "fail",
        error: error.message,
      });
    });
});

router.post("/users/:user_id/tasks", (req,res)=>{
  TaskController
    .post(req.body)
    .then((data) => {
      res.status(200).json({
        confirmation: "success",
        data: data,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        confirmation: "fail",
        error: error.message,
      });
    });
})

//GET, POST, PUT, DELETE, PATCH
router.post('/', (req, res) => {
  console.log(req.body);
  const rule = req.body.rule

  switch(rule){

    //creates a new user
    case "create_user":
      const create_user_data = {
        email: req.body.email,
        password: req.body.password
      }
      
      

    break;


    // case "authenticate_user":
    //   const authenticate_user_data = {
    //     email: req.body.email,
    //     password: req.body.password
    //   }
    //   userController.authenticate_user(authenticate_user_data)
    //   .then((data) => {
    //     if(data.length == 0){
    //       res.json({
    //       confirmation: "fail",
    //       message: "User with the specified email and password does not exist"
    //       })
    //     }
    //     else{
    //       res.json({
    //       confirmation: "success",
    //       data: data
    //       })
    //     }
        
    //   })
    //   .catch((error) => {
    //     return res.status(400).json({
    //       confirmation: "fail",
    //       error: error.message
    //     })
    //   })

    // break;

    // case "generate_recover_code":
    //         const gen_recover_code={
    //             email: req.body.email
    //         }

    //         const recovery_code = {
    //           code: randomString.generate({
    //             length: 6,
    //             charset: 'numeric'
    //           })
    //         }

    //         userController.generate_recover_code(gen_recover_code, recovery_code)
    //         .then((data)=>{
    //             res.json({
    //                 confirmation: "success",
    //                 data: data
    //             })

    //             //send recovery code to email
                
                
    //         })
    //         .catch((error)=>{
    //             res.json({
    //                 confirmation: "fail",
    //                 error: error.message
    //             })
    //         })

    // break


    

  }

})

module.exports = {router}