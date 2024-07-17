const { ReminderSchema } = require("../../model/reminder");
const ErrorCode = require("../../contants/mongoDB-error-code.json");
const mongoose = require("mongoose");
const {
  updateMongoDbObjectWithourRemoveId,
} = require("../../utils/update-object.utils");

const getAllReminder = async (userId) => {
  try {
    const reminderInfo = await ReminderSchema.find({
      userId: String(userId),
    }).select("title notes tags");

    if (reminderInfo !== null) {
      const newData = reminderInfo;
      return newData;
    } else {
      throw { statusCode: 406, message: "Data not found!" };
    }
  } catch (error) {
    throw { statusCode: 406, message: "Data not found!" };
  }
};

const addNewReminder = async (req, res, next, userId) => {
  const reminderInfo = new ReminderSchema({
    title: req.body.title,
    notes: req.body.note,
    tags: req.body.tags,
    userId,
  });

  reminderInfo
    .save()
    .then((_response) => {
      const newData = updateMongoDbObjectWithourRemoveId(_response.toObject());
      delete newData.userId;
      res.status(200).send(newData);
    })
    .catch((error) => {
      const message = `${ErrorCode[error.code]}: ${Object.keys(
        error.keyPattern
      ).join(",")}`;
      res.status(400).send({ message });
      next();
    });
};

const updateReminder = async (req, res, next, userid) => {
  try {
    let reqBody = { ...req.body };
    delete reqBody._id;
    const profileInfo = await ReminderSchema.findOneAndUpdate(
      {
        userId: String(userid),
        _id: req.body._id,
      },
      reqBody,
      {
        new: true,
      }
    ).select("title notes tags");
    if (profileInfo !== null) {
      res.status(200).send(profileInfo);
    } else {
      res.status(422).send({ message: "Sorry! data not updated" });
    }
  } catch (error) {
    console.log(error);
    res.status(422).send({ message: "Sorry! data not updated" });
  }
};

const removeReminderFromDB = async (req, res, next) => {
  try {
    const reminderInfo = await ReminderSchema.deleteOne({
      _id: new mongoose.mongo.ObjectId(req.params.id),
    });
    if (reminderInfo.deletedCount > 0) {
      res.status(200).send({ message: "data deleted successfully!" });
    } else {
      res.status(422).send({ message: "Sorry! data not found" });
    }
  } catch (error) {
    res.status(422).send({ message: "Sorry! data not deleted:" });
  }
};

module.exports.ReminderProvider = {
  getAllReminder,
  addNewReminder,
  updateReminder,
  removeReminderFromDB,
};
