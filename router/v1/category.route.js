const express = require("express");
const router = express.Router();
const category = require("../../controller/category.product");
router.route("/").get(category.getAllCategory).post(category.createNewCategory);
router
  .route("/:id")
  .get(category.getCategoryById)
  .patch(category.updateCategoryById)
  .delete(category.deleteCategory);
module.exports = router;
