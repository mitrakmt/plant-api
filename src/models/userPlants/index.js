let userPlantsModel = {};
let UserPlants = require("../../db").UserPlants;
let Plants = require("../../db").Plants;

userPlantsModel.GET_ALL_USER_PLANTS = () => {
  return UserPlants.findAll({}).then(plants => {
    return plants;
  });
};

userPlantsModel.GET_USER_PLANTS = userId => {
  return UserPlants.findAll({
    where: {
      userId
    }
  }).then(plants => plants);
};

userPlantsModel.GET_USER_PLANT = id => {
  return UserPlants.findOne({
    where: {
      id
    },
    attributes: { exclude: ["updatedAt", "createdAt"] }
  }).then(plant => plant);
};

userPlantsModel.ADD_USER_PLANT = ({
  userId,
  plantId,
  size,
  image,
  lastWateredDate
}) => {
  return UserPlants.create({
    userId,
    plantId,
    size,
    image,
    lastWateredDate
  }).then((plant, error) => {
    if (error) {
      return {
        success: false,
        message: "Failed to add user plant."
      };
    }

    return {
      success: true,
      plant
    };
  });
};

userPlantsModel.UPDATE_USER_PLANT = (id, plantToUpdate) => {
  return UserPlants.update(plantToUpdate, {
    returning: true,
    where: { id },
    attributes: { exclude: ["id", "updatedAt", "createdAt"] }
  }).then(plant => plant);
};

userPlantsModel.DELETE_USER_PLANT = id => {
  return UserPlants.destroy({
    where: {
      id
    }
  }).then(plant => plant);
};

module.exports = userPlantsModel;
