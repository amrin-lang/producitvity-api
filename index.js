//imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

//
const {router} = require('./routes/api');

//prepare our process variables
dotenv.config();

//connect to the database
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(function(){
  console.log("connected to DB")
})
.catch(function(error){
  console.log("failed to connect, error: " + error.message)
})

//create an instance of the express server
const app = express();

//setup middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(router);



//start listening on the port
const port = process.env.PORT
app.listen(port,()=>{
  console.log("I'm listening to port", port)
})
