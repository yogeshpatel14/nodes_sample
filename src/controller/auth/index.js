const { ValidationResultMessage } = require("../../utils/update-object.utils");
const { SignUpSchema } = require("../../model/auth/signup");
const { GenerateTokenWithData } = require("../../provider/auth");
const saveSignupDataToDb = require("../../provider/auth/signup");
const { saveDataToLoginSchema } = require("../../provider/auth/login");

const loginController = async (req, res, next) => {
  const errors = ValidationResultMessage(req);
  if (!errors.isEmpty()) {
    res.status(422).send({ message: errors.array() });
    return;
  }
  SignUpSchema.findOne({
    userName: req.body.userName,
  })
    .then(async (response) => {
      if (response !== null) {
        const isCorrectPwd = await response.verifyPassword(
          req.body.password,
          response.password
        );
        if (isCorrectPwd) {
          await saveDataToLoginSchema(req.body.userName, 200);
          const payload = {
            id: response._id.toString(),
            userName: req.body.userName,
          };
          const token = GenerateTokenWithData(payload);
          res.status(200).send({ token });
        } else {
          await saveDataToLoginSchema(req.body.userName, 400);
          res.status(400).send({ message: "wrong userName and password" });
        }
        next();
      } else {
        await saveDataToLoginSchema(req.body.userName, 404);
        res.status(404).send({ message: "user not found!" });
        next();
      }
    })
    .catch(async (_error) => {
      await saveDataToLoginSchema(req.body.userName, 400);
      res.status(400).send({ message: "wrong userName and password" });
      next();
    });
};

const signupController = async (req, res, next) => {
  const errors = ValidationResultMessage(req);
  if (!errors.isEmpty()) {
    res.status(422).send({ message: errors.array()[0] });
    return;
  }
  saveSignupDataToDb(req, res, next);
};

module.exports.authController = {
  loginController,
  signupController,
};
