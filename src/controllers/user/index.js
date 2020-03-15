const { generateTokens } = require("../../utils/auth");
const userModel = require("../../models/user");
let userController = {};

/**
 * Create the user if one doesn't exist. Sends an email with a link to activate their account.
 * @param req ExpressReq
 * @param res ExpressResp
 * @param next ExpressNext
 */
userController.CREATE_USER = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const otherEmails = req.body.otherEmails;

  return userModel.CHECK_USER_EMAIL_EXISTS(email).then(response => {
    if (response.user_exists) {
      res.status(400).send({
        error: true,
        message: response.message
      });

      return;
    }

    userModel.SIGN_UP(email, password, otherEmails).then(response => {
      const token = generateTokens(response.user);
      res.status(200).send({ token });
    });
  });
};

userController.GET_USER = (req, res) => {
  let user_id = req.params.userId;

  return userModel
    .GET_USER(user_id)
    .then(response => res.status(200).send(response));
};

userController.GET_USERS = (req, res) => {
  return userModel.GET_USERS().then(response => res.status(200).send(response));
};

userController.UPDATE_USER = (req, res) => {
  const userId = req.params.userId;
  const userDataToUpdate = req.body;

  return userModel
    .UPDATE_USER(userId, userDataToUpdate)
    .then(response => res.status(200).send(response));
};

userController.DELETE_USER = (req, res) => {
  let user_id = req.user.user_id;
  return userModel.DELETE_USER(user_id).then(() => res.sendStatus(200));
};

module.exports = userController;
