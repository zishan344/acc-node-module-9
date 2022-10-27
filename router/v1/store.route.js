const express = require("express");
const router = express.Router();
const store = require("../../controller/store.product");
router.route("/").get(store.getAllStore).post(store.createNewStore);
router
  .route("/:id")
  .get(store.getStoreById)
  .patch(store.updateStoreById)
  .delete(store.deleteStore);
module.exports = router;
