let plantController = {};
const plantModel = require("../../models/plant");
const { sendEmail } = require("../../utils/email");

/**
 * Create the user if one doesn't exist. Sends an email with a link to activate their account.
 * @param req ExpressReq
 * @param res ExpressResp
 * @param next ExpressNext
 */

plantController.GET_PLANT = (req, res) => {
  let plantId = req.params.plantId;

  return plantModel
    .GET_PLANT(plantId)
    .then(response => res.status(200).send(response));
};

plantController.GET_PLANTS = (req, res) => {
  return plantModel
    .GET_PLANTS()
    .then(response => res.status(200).send(response));
};

plantController.CREATE_PLANT = (req, res) => {
  return plantModel.CREATE_PLANT(req.body).then(status => {
    res.status(200).send(status);
  });
};

plantController.UPDATE_PLANT = (req, res) => {
  const plantId = req.params.plantId;
  const plantDataToUpdate = req.body;

  return plantModel
    .UPDATE_PLANT(plantId, plantDataToUpdate)
    .then(response => res.status(200).send(response));
};

plantController.DELETE_PLANT = (req, res) => {
  return plantModel.DELETE_PLANT(plantId).then(() => res.sendStatus(200));
};

module.exports = plantController;
