const express = require("express");
const router = express.Router();
const stockController = require("../../controller/stock.controller");

//
// router.route("/bulk_update").patch(productController.bulkUpdateProduct);
// router.route("/bulk_delete").delete(productController.bulkDeleteProduct);

//
router
  .route("/")
  .get(stockController.getStock)
  .post(stockController.createStocks);

//
router
  .route("/:id")
  .patch(stockController.updateStockById)
  .delete(stockController.deleteStockBydId)
  .get(stockController.getStockById);

module.exports = router;
