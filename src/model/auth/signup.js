const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const Signup = new Schema(
  {
    userName: { type: String, unique: true },
    password: { type: String, require: true },
    createdAt: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

Signup.methods.setPassword = async function (password) {
  try {
    const hashPassword = await bcrypt.hashSync(password, 10);
    this.password = hashPassword;
  } catch (error) {}
};

Signup.methods.verifyPassword = async function (password, haspwd) {
  try {
    const hashPassword = await bcrypt.compareSync(password, haspwd);
    return hashPassword;
  } catch (error) {
    return false;
  }
};

const SignUpSchema = mongoose.model("Signup", Signup);

module.exports = {
  SignUpSchema,
};
