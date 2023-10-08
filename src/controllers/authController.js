const passport = require("passport");
const { keyCheck } = require("../utils/keyCheck");
const jwt = require("jsonwebtoken");

const localLogin = async (req, res, next) => {
  const { email, password } = req.body;

  keyCheck({
    email,
    password,
  });

  passport.authenticate("local", { session: false }, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(err.status).json({ message: err.message });
    }

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

    res.status(200).json({
      message: "LOGIN_SUCCESS",
      accessToken: token,
    });
  })({ body: { email, password } });
};

module.exports = {
  localLogin,
};
