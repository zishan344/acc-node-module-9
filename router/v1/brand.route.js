const express = require("express");
const router = express.Router();
const brands = require("../../controller/brand.product");
router.route("/").get(brands.getBrands).post(brands.createNewBrand);
router
  .route("/:id")
  .get(brands.getBrandById)
  .patch(brands.updateBrandById)
  .delete(brands.deleteBrand);
module.exports = router;
