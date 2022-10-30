const User = require("../models/User");

exports.createUser = async (data) => {
  const user = await User.create(data);
  return user;
};
exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};
exports.findUserByToken = async (token) => {
  return await User.findOne({ confirmationToken: token });
};
exports.deleteUser = async (id) => {
  const deleteUser = await User.deleteOne({ _id: id });
};
