const {
  createStore,
  getStore,
  gettingStoreWithId,
  updatingStoreWithId,
  deleteStoreById,
} = require("../Service/store.service");

exports.createNewStore = async (req, res) => {
  try {
    const result = await createStore(req.body);
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
exports.getAllStore = async (req, res) => {
  try {
    const result = await getStore();
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
exports.getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await gettingStoreWithId(id);
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
exports.updateStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updatingStoreWithId(id, req.body);
    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        message: "can't update the Store data",
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
exports.deleteStore = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteStoreById(id);
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
