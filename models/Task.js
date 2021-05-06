const mongoose = require('mongoose')
//type, required, minlength, default, maxlength, enum
const taskSchema = mongoose.Schema({
  user_id: 
    //referencing the userID from user.js
    {type: mongoose.Schema.ObjectId, ref:"User"},
    
  

    

    title:{
      type: String,
      required: [true,"title of task required"]
    },

    description:{
      type: String
    },

    target_date:{
      type: Date,
      required: [true, "User need to enter target date"]      
    },

    reminder:{
      type: Date,
      //optional    
    },

    list_type:{
      type: String,
      enum: ["TO-DO", "IT'S-DONE"],
      default: "TO-DO"
    },

    timestamp_marked_complete:{
      type: Date
    }
  

})

module.exports = mongoose.model("Task", taskSchema)