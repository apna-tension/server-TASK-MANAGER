const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ToDo',
  }],
});

module.exports = mongoose.model("User", UserSchema);
