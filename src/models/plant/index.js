let plantModel = {};
let Plant = require("../../db").Plants;

plantModel.GET_PLANTS = () => {
  return Plant.findAll({}).then(plants => plants);
};

plantModel.GET_PLANT = id => {
  return Plant.findOne({
    where: {
      id
    },
    attributes: { exclude: ["updatedAt", "createdAt"] }
  }).then(plant => plant);
};

plantModel.CREATE_PLANT = ({
  name,
  waterInterval,
  waterAmount,
  lightAmount,
  temperature,
  notes
}) => {
  return Plant.create({
    name,
    waterInterval,
    waterAmount,
    lightAmount,
    temperature,
    notes
  }).then((plant, error) => {
    if (error) {
      return {
        success: false,
        message: "Failed to create plant."
      };
    }

    return {
      success: true,
      plant
    };
  });
};

plantModel.UPDATE_PLANT = (id, plantToUpdate) => {
  return Plant.update(plantToUpdate, {
    returning: true,
    where: { id },
    attributes: { exclude: ["id", "updatedAt", "createdAt"] }
  }).then(plant => plant);
};

plantModel.DELETE_PLANT = id => {
  return Plant.destroy({
    where: {
      id
    }
  }).then(plant => plant);
};

module.exports = plantModel;
