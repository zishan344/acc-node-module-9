const {
  getSuppliersService,
  createSupplier,
  getSuppliersServiceById,
  SuppliersServiceUpdateById,
  deleteSupplierById,
} = require("../Service/supplier.service");

exports.createNewSupplier = async (req, res) => {
  try {
    const result = await createSupplier(req.body);
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

exports.getSuppliers = async (req, res) => {
  try {
    const result = await getSuppliersService();
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
exports.getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const Supplier = await getSuppliersServiceById(id);
    if (!Supplier) {
      res.status(404).json({
        status: "fail",
        message: `couldn't get any data with this id ${id}`,
      });
    }
    res.status(200).json({
      status: "success",
      message: "getting data successfully",
      data: Supplier,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: err.message,
    });
  }
};
exports.updateSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SuppliersServiceUpdateById(id, req.body);
    if (!result.nModified) {
      return res
        .status(404)
        .json({ status: "fail", message: "couldn't update data" });
    }

    res.status(200).json({
      status: "success",
      message: " update data successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "can't update the data",
      error: err.message,
    });
  }
};
exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteSupplierById(id);
    if (!result.deletedCount) {
      return res
        .status(404)
        .json({ status: "fail", message: "couldn't delete data" });
    }
    res.status(200).json({
      status: "success",
      message: " delete data successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "can't delete the data",
      error: err.message,
    });
  }
};
