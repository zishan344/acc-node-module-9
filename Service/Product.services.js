const Product = require("../models/Product");
const Brand = require("../models/Brand");

exports.gettingAllProduct = async (filters, queries) => {
  const product = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fieldBy)
    .sort(queries.sortBy);
  return product;
};
exports.gettingSingleProduct = async (id) => {
  const product = await Product.findOne({ _id: id });
  return product;
};
exports.createProduct = async (data) => {
  const product = await Product.create(data);
  const { _id: productId, brand } = product;
  const updateBrand = await Brand.updateOne(
    { _id: brand.id },
    {
      $push: { products: productId },
    }
  );
  return product;
};
exports.updateProductById = async (productId, data) => {
  const product = await updateOne(
    { _id: productId },
    { $set: data },
    { runValidators: true }
  );
  return product;
};
exports.bulkUpdate = async (data) => {
  // const product = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });
  const products = [];
  console.log(data);
  data.ids.forEach((product) =>
    products.push(Product.updateOne({ _id: product.id }, product.data))
  );
  const result = await Promise.all(products);
  console.log(result);
  return products;
};
exports.deleteProduct = async (data) => {
  const product = await Product.deleteOne({ _id: data });
  return product;
};
exports.bulkDelete = async (ids) => {
  const product = await Product.deleteMany({ _id: ids });
  return product;
};
