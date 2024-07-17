const express = require("express");
const { verifyJwtToken } = require("../../utils/token-verify");
const { ReminderController } = require("../../controller/reminder");

const route = express.Router();

route.get("/", [verifyJwtToken], ReminderController.getAllReminder);
route.post("/", [verifyJwtToken], ReminderController.postNewReminder);
route.put("/", [verifyJwtToken], ReminderController.putReminder);
route.delete("/:id", [verifyJwtToken], ReminderController.deleteReminder);

module.exports = route;
