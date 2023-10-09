const passport = require("passport");
const { keyCheck } = require("../utils/keyCheck");

const localLogin = async (req, res) => {
  const { email, password } = req.body;

  keyCheck({
    email,
    password,
  });

  passport.authenticate("local", { session: false }, (err, token) => {
    if (err) {
      console.error(err);
      return res.status(err.status).json({ message: err.message });
    }

    if (!token) {
      return res.status(401).json({ message: "AUTHENTICATION_FAILED" });
    }

    res.status(200).json({
      message: "LOGIN_SUCCESS",
      accessToken: token,
    });
  })({ body: { email, password } });
};

const kakaoLogin = async (req, res) => {
  const token = req.user;

  res.json({ token });
};

module.exports = {
  localLogin,
  kakaoLogin,
};
