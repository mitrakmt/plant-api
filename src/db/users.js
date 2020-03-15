let Sequelize = require("sequelize");

module.exports = db => {
  const Users = db.define(
    "Users",
    {
      email: {
        type: Sequelize.STRING,
        required: true
      },
      password: {
        type: Sequelize.STRING,
        required: true
      },
      emails: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        default: []
      }
    },
    {
      freezeTableName: true
    }
  );

  Users.associate = models => {
    Users.belongsToMany(models.Plants, {
      through: "PlantUsers",
      as: "plants",
      foreignKey: "userId"
    });
  };

  return Users;
};
