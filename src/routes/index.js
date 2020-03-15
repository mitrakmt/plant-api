const express = require("express");
const plantRoutes = require("./plant");
const userRoutes = require("./user");
const userPlantsRoutes = require("./userPlants");
const router = express.Router();

router.use("/plants", plantRoutes);
router.use("/users", userRoutes);
router.use("/userplants", userPlantsRoutes);

module.exports = router;
