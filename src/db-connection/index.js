const mongoose = require("mongoose");

const MonooseConfig = async () => {
  return mongoose.connect(process.env.MONGO_URL);
};

module.exports = MonooseConfig;
