const express = require("express");
const plantCtrl = require("../controllers/plant");
const router = express.Router();

router
  .route("/")
  .get(plantCtrl.GET_PLANTS)
  .post(plantCtrl.CREATE_PLANT);

router
  .route("/:plantId")
  .get(plantCtrl.GET_PLANT)
  .put(plantCtrl.UPDATE_PLANT)
  .delete(plantCtrl.DELETE_PLANT);

module.exports = router;
