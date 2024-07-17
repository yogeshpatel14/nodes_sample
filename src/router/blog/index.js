const express = require("express");
const { LoginSchema } = require("../../model/auth/login");

const blogRouter = express.Router();

const auth = (req, res, next) => {
  if (req.query.password === "123") {
    next();
  } else {
    res.sendStatus(401);
  }
};

blogRouter.get("/", auth, async (req, res) => {
  let login = new LoginSchema();
  login.userName = "yogesh";
  login.password = "test1234";
  login
    .save()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = blogRouter;
