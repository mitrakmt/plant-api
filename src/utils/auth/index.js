const jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

/**
 * Generates jwt accessToken and refreshToken
 * @param userId
 * @param roleId_
 * @param passwordHash - encrypted password
 * @returns {*}
 */

function generateTokens(user) {
  if (!user) {
    return reject(new Error("Missing required argument(s)"));
  }

  let token = jwt.sign(
    {
      user_id: user.id,
      role: user.role,
      username: user.username
    },
    process.env.JWT_SECRET
  );

  return token;
}

const isAuthenticated = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token)
    return res.status(400).send({
      error: true,
      message: "User is not logged in"
    });

  return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error)
      return res.status(400).send({
        error: true,
        message: "Malformed token"
      });
    if (decoded.role === "user" || decoded.role === "admin") {
      req.user = decoded;
      return next();
    }

    res.status(400).send({
      error: true,
      message: "User is not logged in"
    });
  });
};

const hashPassword = password => {
  return bcrypt.hash(password, 10).then(hash => {
    return hash;
  });
};

const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash).then(res => {
    return res;
  });
};

module.exports = {
  generateTokens,
  isAuthenticated,
  hashPassword,
  comparePasswords
};
