const User = require("../models/User");

exports.createUser = async (data) => {
  const user = await User.create(data);
  return user;
};
