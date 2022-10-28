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
    let filters = { ...req.query };
    // stock?sortBy=price=500name=chal&location=dhaka
    // sort, page,limit->exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);
    // gt,lt,gte,lte
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt\gte\lt\lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filterString);
    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fieldBy = req.query.fields.split(",").join(" ");
      queries.fieldBy = fieldBy;
    }
    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      // 50 product
      // page 1->1-10
      // page 2->2-20,
      //page 3-> 21-30  ->page 3 -> skip 1-20 ->3-1->2*10
      //page 4-> 21-30  ->page 4 -> skip 1-30 ->4-1->3*10
      //page 5 -> 41-50
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = limit;
    }
    const products = await gettingAllProduct(filters, queries);
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
