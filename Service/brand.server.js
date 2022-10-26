const Brand = require("../models/Brand");

exports.createBrand = async (data) => {
  const brand = await Brand.create(data);
  return brand;
};
exports.getBrandsService = async () => {
  const brand = await Brand.find({});
  return brand;
};
exports.getBrandsServiceById = async (id) => {
  const brand = await Brand.findOne({ _id: id });
  return brand;
};
exports.BrandsServiceUpdateById = async (id, data) => {
  const brand = await Brand.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return brand;
};
