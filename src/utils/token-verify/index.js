const jwt = require("jsonwebtoken");
const { jwtTokenSecretKey } = require("../../contants/jswt-token.constant");

const commonErrorObject = (err) => {
  return err.name === "JsonWebTokenError"
    ? { statusCode: 400, message: "Invalide token" }
    : err.name === "TokenExpiredError"
    ? { statusCode: 401, message: "Token expire" }
    : { statusCode: 400, message: "something went wrong" };
};

const verifyJwtToken = (req, res, next) => {
  jwt.verify(req.header("authorization"), jwtTokenSecretKey, function (err, _) {
    if (err) {
      const dict = commonErrorObject(err);
      res.status(dict.statusCode).send({ message: dict.message });
      return;
    } else {
      return next();
    }
  });
};

const getUserIdFromToken = (req, res, next) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      req.header("authorization"),
      jwtTokenSecretKey,
      function (err, decoded) {
        if (err) {
          const dict = commonErrorObject(err);
          reject(dict);
        } else {
          resolve(decoded);
        }
      }
    );
  });
};

module.exports = {
  verifyJwtToken,
  getUserIdFromToken,
};
