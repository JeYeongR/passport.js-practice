const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { userDao } = require("../models");

const localStrategyConfig = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    const existingUser = await userDao.findUserByEmail(email);
    if (!existingUser) {
      const err = new Error("ACCOUNT_DOES_NOT_EXIST");
      err.status = 404;
      return done(err);
    }

    const isMatched = await bcrypt.compare(password, existingUser.password);
    if (!isMatched) {
      const err = new Error("PASSWORD_DOES_NOT_MATCH");
      err.status = 400;
      return done(err);
    }
    return done(null, existingUser);
  }
);

passport.use("local", localStrategyConfig);
