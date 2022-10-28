// const { mountpath } = require("../app");
const {
  gettingAllProduct,
  createProduct,
  updateProductById: updateProduct,
  bulkUpdate,
  deleteProduct,
  bulkDelete,
} = require("../Service/Product.services");
module.exports.getProduct = async (req, res) => {
  try {
    /* const products = await Product.find({
        $or: [{ _id: "6332c62ae9b5e1434c05387c" }, { name: "bolboli" }],
      }); */
    // const products = await Product.find({ status: { $ne: "out-of-stock" } });
    // const products = await Product.find({ quantity: { $gte: 100 } });
    // const products = await Product.find({ name: { $in: ["rice", "dal"] } });
    // const products = await Product.find({}, "name quantity");
    // const products = await Product.find({}, "-name -quantity");
    // const products = await Product.find({}, "-name -quantity").limit(1);
    /*    const products = await Product.where("name")
        .equals(/\w/)
        .where("quantity")
        .gt(100) 
        .lt(600)
        .limit(2)
        .sort({ quantity: -1 }); */
    // const products = await Product.findById("6332c9b8c20ca91ef380b832");
    // const products = await Product.find({});
    const products = await gettingAllProduct();
    res.status(200).json({
      status: "success",
      message: "getting Data Successfully",
      result: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Can't get the data",
      error: error.message,
    });
  }
};
module.exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await gettingSingleProduct(id);
    res.status(200).json({
      status: "success",
      message: "getting Data Successfully",
      result: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Can't get the data",
      error: error.message,
    });
  }
};
module.exports.createProducts = async (req, res) => {
  try {
    // const product = new Product(req.body);
    // const result = await Product.create(req.body);
    // const result = await product.save();
    const result = await createProduct(req.body);

    res.status(200).json({
      status: "success",
      message: "Data Inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data is not  inserted",
      error: error.message,
    });
  }
};
exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await updateProduct(id, req.body);
    res.status(200).json({
      status: "Success",
      message: "Product update successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't update product",
      error: error.message,
    });
  }
};
exports.bulkUpdateProduct = async (req, res) => {
  try {
    const result = await bulkUpdate(req.body);
    res.status(200).json({
      status: "Success",
      message: "Product update successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't update product",
      error: error.message,
    });
  }
};
exports.bulkUpdateProduct = async (req, res) => {
  try {
    const result = await bulkUpdate(req.body);
    res.status(200).json({
      status: "Success",
      message: "Product update successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't update product",
      error: error.message,
    });
  }
};
exports.deleteProductBydId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProduct(id);
    if (!result.deletedCount) {
      return res
        .status(404)
        .json({ status: "failed", message: "Couldn't delete product product" });
    }
    res.status(200).json({
      status: "Success",
      message: "Product delete  successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't delete product product",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res) => {
  try {
    const result = await bulkDelete(req.body.ids);
    res.status(200).json({
      status: "Success",
      message: "Product delete successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't delete product product",
      error: error.message,
    });
  }
};
exports.fileUpload = async (req, res) => {
  try {
    res.status(200).json(req.files);
  } catch (err) {
    res.status(404).json({ status: "fail", error: err.message });
  }
};
