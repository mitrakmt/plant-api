let Sequelize = require("sequelize");

module.exports = db => {
  const UserPlants = db.define(
    "UserPlants",
    {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      plantId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      size: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        default: ""
      },
      lastWateredDate: {
        type: Sequelize.DATE,
        required: true
      }
    },
    {
      freezeTableName: true
    }
  );

  return UserPlants;
};
