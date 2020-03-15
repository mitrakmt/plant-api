const express = require("express");
const userPlantsCtrl = require("../controllers/userPlants");
const router = express.Router();

router
  .route("/")
  .get(userPlantsCtrl.GET_ALL_USER_PLANTS)
  .post(userPlantsCtrl.ADD_USER_PLANT);

router.route("/:userId").get(userPlantsCtrl.GET_USER_PLANTS);

router
  .route("/:plantId")
  .get(userPlantsCtrl.GET_USER_PLANT)
  .put(userPlantsCtrl.UPDATE_USER_PLANT)
  .delete(userPlantsCtrl.DELETE_USER_PLANT);

module.exports = router;
