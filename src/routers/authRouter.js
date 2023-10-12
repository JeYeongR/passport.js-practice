const express = require("express");
const passport = require("passport");
const { authController } = require("../controllers/");
const { asyncWrap } = require("../utils/errorHandler");
const authRouter = express.Router();

authRouter.post("/local", asyncWrap(authController.localLogin));
authRouter.get("/kakao", passport.authenticate("kakao"));
authRouter.get("/kakao/callback", passport.authenticate("kakao", { session: false }), authController.socialLogin);
authRouter.get("/google", passport.authenticate("google"));
authRouter.get("/google/callback", passport.authenticate("google", { session: false }), authController.socialLogin);
authRouter.get("/naver", passport.authenticate("naver"));
authRouter.get("/naver/callback", passport.authenticate("naver", { session: false }), authController.socialLogin);

module.exports = authRouter;
