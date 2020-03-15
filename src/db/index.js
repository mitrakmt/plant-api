let db = require("./db.config");

// Set table schema
let Plants = require("./plants")(db);
let Users = require("./users")(db);
let UserPlants = require("./userPlants")(db);

db.sync().then(() => {
  console.log("Tables have been Created");
});

// HELPER TO DROP ALL TABLES
// db.sync({ force: true }).then(() => {
//   console.log("Tables have been dropped");
// });

// Users.hasMany(Plants);
// Plants.hasMany(Users);

module.exports = {
  db: db,
  Plants,
  Users,
  UserPlants
};
