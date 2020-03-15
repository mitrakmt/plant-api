const UserPlants = require("../../models/userPlants");
const Plant = require("../../models/Plant");
const User = require("../../models/User");
const { sendEmail } = require("../../utils/email");
const moment = require("moment");

const startRequestInterval = () => {
  // Every 24 hours, query users and check timetables to see if we should send an email or not
  setInterval(() => {
    UserPlants.GET_ALL_USER_PLANTS().then(plants => {
      // ForEach through users, check plant timetable
      plants.forEach(userPlant => {
        // Check if plant water date is more than three days ago to optimize calls
        if (moment().diff(userPlant.lastWateredDate, "days") >= 3) {
          // TODO: could cache plants here to optimize and not make useless DB queries
          // Get specific plant type information
          Plant.GET_PLANT(userPlant.plantId).then(plant => {
            // if lastWateredDate is over waterTimeline from moment();
            if (
              moment().diff(userPlant.lastWateredDate, "days") >=
              plant.waterInterval
            ) {
              User.GET_USER(userPlant.userId).then(user => {
                sendEmail({
                  email: user.email,
                  text: `Hi there! Your ${plant.name} needs watered. :)`,
                  subject: "Please water me! Love, your " + plant.name
                });
                // Update lastWateredTime to new date
                UserPlants.UPDATE_USER_PLANT(userPlant.id, {
                  lastWateredDate: moment()
                }).then(status => {
                  return status;
                });
              });
            }
          });
        }
      });
    });
  }, 86400000);
};

module.exports = { startRequestInterval };
