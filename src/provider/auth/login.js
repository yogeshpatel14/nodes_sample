const { LoginSchema } = require("../../model/auth/login");

async function saveDataToLoginSchema(userName, succCode) {
  let loginSch = new LoginSchema({
    userName,
    succCode,
  });
  await loginSch.save();
}

module.exports = {
  saveDataToLoginSchema,
};
