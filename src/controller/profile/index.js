const { getprofileData, updateProfileData } = require("../../provider/profile");
const { getUserIdFromToken } = require("../../utils/token-verify");

const getProfileData = async (req, res, next) => {
  try {
    const tokenInfo = await getUserIdFromToken(req, res, next);
    const profileInfo = await getprofileData(tokenInfo.id);
    res.status(200).send(profileInfo);
  } catch (error) {
    res.status(error.statusCode).send({ message: error.message });
  }
};

const updateProfileInfo = async (req, res, next) => {
  try {
    const tokenInfo = await getUserIdFromToken(req, res, next);
    const profileInfo = await updateProfileData(tokenInfo.id, req.body);
    res.status(200).send(profileInfo);
  } catch (error) {
    res.status(error.statusCode).send({ message: error.message });
  }
};

module.exports.ProfileController = {
  getProfileData,
  updateProfileInfo,
};
