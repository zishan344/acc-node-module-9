const {
  gettingAllStock,
  createStock,
  updateStockById: updateStock,
  bulkUpdate,
  deleteStock,
  bulkDelete,
  gettingSingleStock,
} = require("../Service/stock.service");
module.exports.getStock = async (req, res) => {
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
      // 50 Stock
      // page 1->1-10
      // page 2->2-20,
      //page 3-> 21-30  ->page 3 -> skip 1-20 ->3-1->2*10
      //page 4-> 21-30  ->page 4 -> skip 1-30 ->4-1->3*10
      //page 5 -> 41-50
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = limit;
    }
    const stocks = await gettingAllStock(filters, queries);
    res.status(200).json({
      status: "success",
      message: "getting Data Successfully",
      result: stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Can't get the data",
      error: error.message,
    });
  }
};
module.exports.getStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stocks = await gettingSingleStock(id);
    if (!stocks) {
      return res
        .status(404)
        .json({ status: "success", message: "data not available" });
    }
    res.status(200).json({
      status: "success",
      message: "getting Data Successfully",
      result: stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Can't get the data",
      error: error.message,
    });
  }
};
module.exports.createStocks = async (req, res) => {
  try {
    // const Stock = new Stock(req.body);
    // const result = await Stock.create(req.body);
    // const result = await Stock.save();
    const result = await createStock(req.body);

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
exports.updateStockById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await updateStock(id, req.body);
    res.status(200).json({
      status: "Success",
      message: "Stock update successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't update Stock",
      error: error.message,
    });
  }
};
exports.bulkUpdateStock = async (req, res) => {
  try {
    const result = await bulkUpdate(req.body);
    res.status(200).json({
      status: "Success",
      message: "Stock update successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't update Stock",
      error: error.message,
    });
  }
};
exports.bulkUpdateStock = async (req, res) => {
  try {
    const result = await bulkUpdate(req.body);
    res.status(200).json({
      status: "Success",
      message: "Stock update successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't update Stock",
      error: error.message,
    });
  }
};
exports.deleteStockBydId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteStock(id);
    if (!result.deletedCount) {
      return res
        .status(404)
        .json({ status: "failed", message: "Couldn't delete Stock Stock" });
    }
    res.status(200).json({
      status: "Success",
      message: "Stock delete  successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't delete Stock ",
      error: error.message,
    });
  }
};

exports.bulkDeleteStock = async (req, res) => {
  try {
    const result = await bulkDelete(req.body.ids);
    res.status(200).json({
      status: "Success",
      message: "Stock delete successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't delete Stock Stock",
      error: error.message,
    });
  }
};
