const {
  createCategory,
  getCategory,
  gettingCategoryWithId,
  updatingCategoryWithId,
  deleteCategoryById,
} = require("../Service/category.service");

exports.createNewCategory = async (req, res) => {
  try {
    const result = await createCategory(req.body);
    res.status(200).json({
      status: "success",
      message: "Creating data successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "can't create the data",
      error: err.message,
    });
  }
};
exports.getAllCategory = async (req, res) => {
  try {
    const result = await getCategory();
    res.status(200).json({
      status: "success",
      message: "getting data successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: err.message,
    });
  }
};
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await gettingCategoryWithId(id);
    res.status(200).json({
      status: "success",
      message: "getting data successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: err.message,
    });
  }
};
exports.updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updatingCategoryWithId(id, req.body);
    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "can't update the category data",
      });
    }
    res.status(200).json({
      status: "success",
      message: "updating data successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: err.message,
    });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteCategoryById(id);
    if (!result.deletedCount) {
      return res
        .status(404)
        .json({ status: "fail", message: "couldn't delete data" });
    }
    res.status(200).json({
      status: "success",
      message: " data delete successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: err.message,
    });
  }
};
