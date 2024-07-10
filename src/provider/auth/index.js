const jwt = require("jsonwebtoken");
const { jwtTokenSecretKey } = require("../../contants/jswt-token.constant");

const GenerateTokenWithData = (payload) => {
  const options = { expiresIn: "1h" };
  var token = jwt.sign(payload, jwtTokenSecretKey, options);
  return token;
};

module.exports = {
  GenerateTokenWithData,
};
