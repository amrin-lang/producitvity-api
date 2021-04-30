const mongoose = require('mongoose')
//type, required, minlength, default, maxlength, enum
const userSchema = mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Username is required"],
  },

  password:{
    type: String,
    required: [true, "user password is required"],
  },

  recovery_code:{
    type: String 
  },


})

module.exports = mongoose.model("User", userSchema);
