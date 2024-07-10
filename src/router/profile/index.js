const express = require("express");
const { ProfileController } = require("../../controller/profile");
const { verifyJwtToken } = require("../../utils/token-verify");

const route = express.Router();

route.get("/", verifyJwtToken, ProfileController.getProfileData);

route.put("/", verifyJwtToken, ProfileController.updateProfileInfo);

module.exports = route;
