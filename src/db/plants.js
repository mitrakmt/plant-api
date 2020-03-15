let Sequelize = require("sequelize");

module.exports = db => {
  const Plants = db.define(
    "Plants",
    {
      name: {
        type: Sequelize.STRING,
        required: true
      },
      waterInterval: {
        type: Sequelize.INTEGER,
        required: true
      },
      waterAmount: {
        type: Sequelize.DECIMAL(10, 1),
        required: true
      },
      lightAmount: {
        type: Sequelize.DECIMAL(10, 1),
        required: true
      },
      temperature: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        required: true
      },
      notes: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      }
    },
    {
      freezeTableName: true
    }
  );

  Plants.associate = models => {
    Plants.belongsToMany(models.Users, {
      through: "PlantUsers",
      as: "users",
      foreignKey: "plantId"
    });
  };

  return Plants;
};
