const express = require("express");
const { userController } = require("../controllers/");
const { asyncWrap } = require("../utils/errorHandler");
const userRouter = express.Router();

userRouter.post("/", asyncWrap(userController.signup));

module.exports = userRouter;
