const Supplier = require("../models/Supplier");

exports.createSupplier = async (data) => {
  const supplier = await Supplier.create(data);
  return supplier;
};
exports.getSuppliersService = async () => {
  const supplier = await Supplier.find({});
  return supplier;
};
exports.getSuppliersServiceById = async (id) => {
  const supplier = await Supplier.findOne({ _id: id });
  return supplier;
};
exports.suppliersServiceUpdateById = async (id, data) => {
  const supplier = await Supplier.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return supplier;
};
exports.deleteSupplierById = async (id) => {
  const supplier = await Supplier.deleteOne({ _id: id });
  return supplier;
};
