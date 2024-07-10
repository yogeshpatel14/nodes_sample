require("dotenv").config();

// import package
const Express = require("express");
const Morgan = require("morgan");
var cors = require("cors");
const helmet = require("helmet");
var session = require("express-session");
var compression = require("compression");
const actuator = require("express-actuator");

// route
const BlogRouter = require("./src/router/blog");
const AuthRouter = require("./src/router/auth");
const ProfileRoute = require("./src/router/profile");
// mongoose config
const MongooseConfig = require("./src/db-connection");
const { CustomValidation } = require("express-validator/lib/context-items");

// declare server
const server = Express();
const morgan = Morgan("combined");

// server.use((req, res, next) => {
//   next();
// });

// middleware
server.use(
  cors({
    origin: ["http://localhost:8080"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
server.use(helmet());
server.use(morgan);
server.use(Express.json());
server.disable("x-powered-by");
var sess = {
  secret: "keyboard cat",
  cookie: {},
  saveUninitialized: true,
  resave: true,
};

if (process.env.ENV_NODE === "production") {
  server.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
  sess.cookie.maxAge = 60000;
}

server.use(session(sess));
server.use(compression());
server.use(actuator());

// Router
server.use("/blog", BlogRouter);
server.use("/", AuthRouter);
server.use("/profile", ProfileRoute);

server.get("/", (req, res, next) => {
  res.send("start server");
  next();
});

const port = 8080;

const start = async () => {
  try {
    await MongooseConfig();
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("error =>", error);
  }
};

start();
