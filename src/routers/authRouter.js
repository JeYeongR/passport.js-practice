const express = require("express");
const { authController } = require("../controllers/");
const { asyncWrap } = require("../utils/errorHandler");
const authRouter = express.Router();

authRouter.post("/local", asyncWrap(authController.localLogin));

module.exports = authRouter;
