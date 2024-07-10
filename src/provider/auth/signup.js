const { createProfile } = require("../../controller/profile");
const { SignUpSchema } = require("../../model/auth/signup");

const saveSignupDataToDb = async (req, res, next) => {
  let signup = new SignUpSchema({
    userName: req.body.userName,
    password: req.body.password,
  });

  await signup.setPassword(req.body.password);

  signup
    .save()
    .then(async (_response) => {
      console.log(_response);
      await createProfile({
        userId: _response._id.toString(),
        userName: req.body.username,
      });
      res.status(200).send({ message: "Congrats! Signup successfully" });
      next();
    })
    .catch((error) => {
      let message = "";
      if (ErrorCode[error.code] === "DuplicateKey") {
        message =
          "Sorry!..Already someone has this user name. Please try other user name";
      } else {
        message = `${ErrorCode[error.code]}: ${Object.keys(
          error.keyPattern
        ).join(",")}`;
      }
      res.status(400).send({ message });
      next();
    });
};

module.exports = saveSignupDataToDb;
