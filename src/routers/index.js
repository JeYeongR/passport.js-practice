const express = require("express");
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);

module.exports = router;
