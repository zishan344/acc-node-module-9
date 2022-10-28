const express = require("express");
const router = express.Router();
const suppliers = require("../../controller/supplier.product");
router.route("/").get(suppliers.getSuppliers).post(suppliers.createNewSupplier);
router
  .route("/:id")
  .get(suppliers.getSupplierById)
  .patch(suppliers.updateSupplierById)
  .delete(suppliers.deleteSupplier);
module.exports = router;
