const Category = require("../models/Category");

exports.createCategory = async (data) => {
  const category = await Category.create(data);
  return category;
};
exports.getCategory = async () => {
  const category = await Category.find({});
  return category;
};
exports.gettingCategoryWithId = async (id) => {
  const category = await Category.findOne({ _id: id });
  return category;
};
exports.updatingCategoryWithId = async (id, data) => {
  const category = await Category.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return category;
};
exports.deleteCategoryById = async (id) => {
  const category = await Category.deleteOne({ _id: id });
  return category;
};
