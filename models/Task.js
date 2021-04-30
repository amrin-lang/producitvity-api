const mongoose = require('mongoose')
//type, required, minlength, default, maxlength, enum
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true
  },

  tasks:[{
    task_id:{
      type: String,
      required:[true,"task id needed"]
    },

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
      required:[true, "user needs to enter reminder time"]      
    },

    list_type:{
      type: String,
      enum: ["TO-DO", "IT'S-DONE"],
      default: "TO-DO"
    },

    timestamp_marked_complete:{
      type: Date
    }
  }]

})

module.exports = mongoose.model("Task", taskSchema)