const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userDao } = require("../models");
const { throwError } = require("../utils/throwError");

const localStrategyConfig = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    try {
      const existingUser = await userDao.findUserByEmail(email);
      if (!existingUser) throwError(404, "ACCOUNT_DOES_NOT_EXIST");

      const isMatched = await bcrypt.compare(password, existingUser.password);
      if (!isMatched) throwError(400, "PASSWORD_DOES_NOT_MATCH");

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
      console.log(profile);
      const existingUser = await userDao.findBySNS("KAKAO", profile.id);

      let id = existingUser?.id;

      const email = profile._json.kakao_account.email;
      const snsType = "KAKAO";
      const snsId = profile.id;
      if (!existingUser) {
        const result = await userDao.createUserBySNS(email, snsType, snsId);
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

const googleStrategyConfig = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["email", "profile"],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await userDao.findBySNS("KAKAO", profile.id);

      let id = existingUser?.id;

      const email = profile.emails[0].value;
      const snsType = "GOOGLE";
      const snsId = profile.id;
      if (!existingUser) {
        const result = await userDao.createUserBySNS(email, snsType, snsId);
        id = result.insertId;
      }

      const token = jwt.sign({ id }, process.env.SECRET_KEY);

      return done(null, token);
    } catch (error) {
      return done(err);
    }
  }
);

passport.use("google", googleStrategyConfig);
