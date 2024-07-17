const mongoose = require("mongoose");
const { Schema } = mongoose;

const reminder = new Schema(
  {
    title: { type: String, default: "" },
    notes: { type: String, default: "" },
    tags: { type: Array, default: [] },
    userId: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const ReminderSchema = mongoose.model("Reminders", reminder);

module.exports = {
  ReminderSchema,
};
