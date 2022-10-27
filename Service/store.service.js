const Store = require("../models/Store");

exports.createStore = async (data) => {
  const store = await Store.create(data);
  return store;
};
exports.getStore = async () => {
  const store = await Store.find({});
  return store;
};
exports.gettingStoreWithId = async (id) => {
  const store = await Store.findOne({ _id: id });
  return store;
};
exports.updatingStoreWithId = async (id, data) => {
  const store = await Store.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return store;
};
exports.deleteStoreById = async (id) => {
  const store = await Store.deleteOne({ _id: id });
  return store;
};
