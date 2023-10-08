const { userService } = require("../services");
const { keyCheck } = require("../utils/keyCheck");

const signup = async (req, res) => {
  const { email, password } = req.body;

  keyCheck({
    email,
    password,
  });

  await userService.signup(email, password);

  res.status(201).json({
    message: "SIGNUP_SUCCESS",
  });
};

module.exports = {
  signup,
};
