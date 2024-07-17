const BlogRouter = require("./src/router/blog");
const AuthRouter = require("./src/router/auth");
const ProfileRoute = require("./src/router/profile");
const ReminderRoute = require("./src/router/reminder");

const apiVersion = "/api/V1";

const rootRouter = (app) => {
  app.get("/", (req, res, next) => {
    res.send("start server");
    next();
  });

  app.use(`/blog`, BlogRouter);
  app.use(`${apiVersion}/`, AuthRouter);
  app.use(`${apiVersion}/profile`, ProfileRoute);
  app.use(`${apiVersion}/reminder`, ReminderRoute);
};

module.exports = rootRouter;
