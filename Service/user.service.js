const User = require("../models/User");

exports.createUser = async (data) => {
  const user = await User.create(data);
  return user;
};
exports.findUserByEmail = async (email) => {
  console.log(email);
  return await User.findOne({ email });
};
exports.deleteUser = async (id) => {
  const deleteUser = await User.deleteOne({ _id: id });
};
