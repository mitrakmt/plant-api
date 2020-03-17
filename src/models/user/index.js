const bcrypt = require("bcryptjs");
const { comparePasswords } = require("../../utils/auth");
const User = require("../../db").Users;
const { sendEmail } = require("../../utils/email");
let userModel = {};

userModel.SIGN_UP = (email, password) => {
  return hashPassword(password).then(hash => {
    return User.create({
      email,
      password: hash
    }).then((user, error) => {
      if (error) {
        return {
          success: false,
          message: "Failed to register user. Please try a different username."
        };
      }

      sendEmail({
        email: user.email,
        text: `Thanks for signing up!`,
        subject: "You are now living a PlantLyfe!"
      });

      return {
        success: true,
        user
      };
    });
  });
};

userModel.LOGIN = (email, password) => {
  return User.findOne({
    where: {
      email
    }
  }).then(user => {
    if (!user) {
      return {
        success: false,
        message: "Incorrect email or password"
      };
    }

    return comparePasswords(password, user.password).then(result => {
      if (result) {
        return {
          success: true,
          user
        };
      }

      return {
        success: false,
        message: "Incorrect email or password"
      };
    });
  });
};

userModel.CHECK_USER_EMAIL_EXISTS = email => {
  return User.findOne({
    where: {
      email
    }
  }).then(user => {
    if (user) {
      return {
        user_exists: true,
        message: "That email is already taken."
      };
    }
    return {
      user_exists: false
    };
  });
};

userModel.GET_USER = id => {
  return User.findOne({
    where: {
      id
    },
    attributes: { exclude: ["password", "updatedAt"] }
  }).then(user => user);
};

userModel.GET_USERS = () => {
  return User.findAll({
    attributes: { exclude: ["password"] }
  }).then(users => users);
};

userModel.UPDATE_USER = (id, userDataToUpdate) => {
  return User.update(userDataToUpdate, {
    returning: true,
    where: { id },
    attributes: { exclude: ["password", "id", "updatedAt", "createdAt"] }
  }).then(user => user);
};

userModel.DELETE_USER = id => {
  return User.destroy({
    where: {
      id
    }
  }).then(user => user);
};

const hashPassword = password => {
  return bcrypt.hash(password, 10).then(hash => {
    return hash;
  });
};

module.exports = userModel;
