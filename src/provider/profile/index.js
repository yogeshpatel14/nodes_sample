const { ProfileSchema } = require("../../model/profile");
const { updateMongoDbObject } = require("../../utils/update-object.utils");

const createProfile = async (payload) => {
  let profile = new ProfileSchema(payload);
  await profile.save();
};

const getprofileData = async (userid) => {
  try {
    const profileInfo = await ProfileSchema.findOne({
      userId: String(userid),
    });

    if (profileInfo !== null) {
      const newData = updateMongoDbObject(profileInfo.toObject());
      return newData;
    } else {
      throw { statusCode: 406, message: "User not found!" };
    }
  } catch (error) {
    throw { statusCode: 406, message: "User not found!" };
  }
};

const updateProfileData = async (userid, newData) => {
  try {
    const profileInfo = await ProfileSchema.findOneAndUpdate(
      {
        userId: String(userid),
      },
      newData,
      {
        new: true,
      }
    );

    if (profileInfo !== null) {
      const newData = updateMongoDbObject(profileInfo.toObject());
      return newData;
    } else {
      throw { statusCode: 422, message: "Sorry! data not updated" };
    }
  } catch (error) {
    throw { statusCode: 422, message: "Sorry! data not updated" };
  }
};

module.exports = {
  createProfile,
  getprofileData,
  updateProfileData,
};
