const { ReminderProvider } = require("../../provider/reminder");
const { getUserIdFromToken } = require("../../utils/token-verify");

const getAllReminder = async (req, res, next) => {
  try {
    const tokenInfo = await getUserIdFromToken(req, res, next);
    const reminderInfo = await ReminderProvider.getAllReminder(tokenInfo.id);
    res.status(200).send(reminderInfo);
  } catch (error) {
    res.status(error.statusCode).send({ message: error.message });
  }
};

const postNewReminder = async (req, res, next) => {
  const tokenInfo = await getUserIdFromToken(req, res, next);
  ReminderProvider.addNewReminder(req, res, next, tokenInfo.id);
};

const putReminder = async (req, res, next) => {
  const tokenInfo = await getUserIdFromToken(req, res, next);
  ReminderProvider.updateReminder(req, res, next, tokenInfo.id);
};

const deleteReminder = async (req, res, next) => {
  const tokenInfo = await getUserIdFromToken(req, res, next);
  ReminderProvider.removeReminderFromDB(req, res, next, tokenInfo.id);
};

module.exports.ReminderController = {
  getAllReminder,
  postNewReminder,
  putReminder,
  deleteReminder,
};
