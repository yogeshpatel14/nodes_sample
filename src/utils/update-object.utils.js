const { validationResult } = require("express-validator");

const updateMongoDbObject = (data) => {
  delete data._id;
  delete data.__v;
  delete data.createdAt;
  delete data.updatedAt;
  return data;
};

const updateMongoDbObjectWithourRemoveId = (data) => {
  delete data.__v;
  delete data.createdAt;
  delete data.updatedAt;
  return data;
};

const ValidationResultMessage = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

module.exports = {
  updateMongoDbObject,
  ValidationResultMessage,
  updateMongoDbObjectWithourRemoveId,
};
