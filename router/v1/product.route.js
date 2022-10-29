const express = require("express");
const multer = require("multer");
const router = express.Router();
const productController = require("../../controller/product.controller");
const authorization = require("../../middleware/authorization");
const uploader = require("../../middleware/uploader");
const verifyToken = require("../../middleware/verifyToken");
router.post(
  "/file-upload",
  uploader.array("image"),
  productController.fileUpload
);
//
router.route("/bulk_update").patch(productController.bulkUpdateProduct);
router.route("/bulk_delete").delete(productController.bulkDeleteProduct);

//
router
  .route("/")
  .get(productController.getProduct)
  .post(
    verifyToken,
    authorization("admin", "store-manager"),
    productController.createProducts
  );

//
router
  .route("/:id")
  .patch(productController.updateProductById)
  .delete(productController.deleteProductBydId)
  .get(productController.getProductById);

module.exports = router;
