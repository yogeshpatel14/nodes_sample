const mongoose = require("mongoose");
const { Schema } = mongoose;

const profile = new Schema(
  {
    userId: { type: String, index: true, unique: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    emailId: { type: String, default: "" },
    userName: { type: String },
  },
  { timestamps: true }
);

const ProfileSchema = mongoose.model("Profile", profile);

module.exports = {
  ProfileSchema,
};
