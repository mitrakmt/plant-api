let userPlantsController = {};
const moment = require("moment");
const userPlantsModel = require("../../models/userPlants");

/**
 * Create the user if one doesn't exist. Sends an email with a link to activate their account.
 * @param req ExpressReq
 * @param res ExpressResp
 * @param next ExpressNext
 */

userPlantsController.GET_USER_PLANT = (req, res) => {
  let plantId = req.params.plantId;

  return userPlantsModel
    .GET_USER_PLANT(plantId)
    .then(response => res.status(200).send(response));
};

userPlantsController.GET_USER_PLANTS = (req, res) => {
  let userId = req.params.userId;

  return userPlantsModel
    .GET_USER_PLANTS(userId)
    .then(response => res.status(200).send(response));
};

userPlantsController.GET_ALL_USER_PLANTS = (req, res) => {
  return userPlantsModel
    .GET_ALL_USER_PLANTS()
    .then(response => res.status(200).send(response));
};

userPlantsController.ADD_USER_PLANT = (req, res) => {
  return userPlantsModel
    .ADD_USER_PLANT({
      ...req.body,
      ...{ lastWateredDate: moment() }
    })
    .then(status => {
      res.status(200).send(status);
    });
};

userPlantsController.UPDATE_USER_PLANT = (req, res) => {
  const plantId = req.params.plantId;
  const plantDataToUpdate = req.body;

  return userPlantsModel
    .UPDATE_USER_PLANT(plantId, plantDataToUpdate)
    .then(response => res.status(200).send(response));
};

userPlantsController.DELETE_USER_PLANT = (req, res) => {
  const plantId = req.params.plantId;

  return userPlantsModel
    .DELETE_USER_PLANT(plantId)
    .then(() => res.sendStatus(200));
};

module.exports = userPlantsController;
