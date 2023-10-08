const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
require("dotenv").config();
const { errorHandler } = require("./src/utils/errorHandler");
const routers = require("./src/routers");

const app = express();

app.use(passport.initialize());
require("./src/config/passport");
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(routers);
app.use(errorHandler);

app.get("/ping", async (req, res) => {
  try {
    return res.status(200).json({
      message: "pong",
    });
  } catch (error) {
    console.log(error);
  }
});

const start = async () => {
  try {
    const port = process.env.SERVER_PORT;
    app.listen(port, () => console.log(`server is listening in PORT ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
