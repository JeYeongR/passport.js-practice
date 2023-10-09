const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userDao } = require("../models");

const localStrategyConfig = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    try {
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

      const token = jwt.sign({ id: existingUser.id }, process.env.SECRET_KEY);

      return done(null, token);
    } catch (err) {
      return done(err);
    }
  }
);

passport.use("local", localStrategyConfig);

const kakaoStrategyConfig = new KakaoStrategy(
  {
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: "/auth/kakao/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await userDao.findBySNS("KAKAO", profile.id);

      let id = existingUser?.id;

      if (!existingUser) {
        const result = await userDao.createUserBySNS(profile._json.kakao_account.email, "KAKAO", profile.id);
        id = result.insertId;
      }

      const token = jwt.sign({ id }, process.env.SECRET_KEY);

      return done(null, token);
    } catch (err) {
      return done(err);
    }
  }
);

passport.use("kakao", kakaoStrategyConfig);
