const express = require("express");
const { ProfileController } = require("../../controller/profile");
const { verifyJwtToken } = require("../../utils/token-verify");

const route = express.Router();

// route.all("/", verifyJwtToken, (req, res, next) => {
//   console.log("====", req.header("Content-Type"));
//   if (req.header("Content-Type") !== "application/json") {
//     res.status(400).send("content type required");
//     return;
//   }
//   next();
// });

route.get("/", verifyJwtToken, ProfileController.getProfileData);

route.put("/", verifyJwtToken, ProfileController.updateProfileInfo);

module.exports = route;
