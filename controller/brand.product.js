const {
  getBrandsService,
  createBrand,
  getBrandsServiceById,

  BrandsServiceUpdateById,
} = require("../Service/brand.server");

exports.createNewBrand = async (req, res) => {
  try {
    const result = await createBrand(req.body);
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

exports.getBrands = async (req, res) => {
  try {
    const result = await getBrandsService();
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
exports.getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await getBrandsServiceById(id);
    if (!brand) {
      res.status(404).json({
        status: "fail",
        message: `couldn't get any data with this id ${id}`,
      });
    }
    res.status(200).json({
      status: "success",
      message: "getting data successfully",
      data: brand,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: err.message,
    });
  }
};
exports.updateBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BrandsServiceUpdateById(id, req.body);
    if (!result.nModified) {
      res.status(404).json({ status: "fail", message: "couldn't update data" });
    }
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
