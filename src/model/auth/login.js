const mongoose = require("mongoose");
const { Schema } = mongoose;

const login = new Schema(
  {
    userName: { type: String, index: false, unique: false, require: false },
    succCode: Number,
    loginDate: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

const LoginSchema = mongoose.model("LoginLogs", login);

module.exports = {
  LoginSchema,
};
