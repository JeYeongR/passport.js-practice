const { userDao } = require("../models");
const bcrypt = require("bcrypt");
const { throwError } = require("../utils/throwError");

const signup = async (email, password) => {
  const saltRounds = 10;
  const hashedPw = await bcrypt.hash(password, saltRounds);

  await userDao.createUser(email, hashedPw);
};

module.exports = {
  signup,
};
