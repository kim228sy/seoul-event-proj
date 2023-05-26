const express = require("express");
const logger = require("../lib/logger");
const boardRouter = require("./board");
const eventRouter = require("./event");
const userRouter = require("./user");
const authRouter = require("./auth");
const postRouter = require("./post");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/log-test", (req, res, next) => {
  logger.error("This message is error");
  logger.warn("This message is warn");
  logger.info("This message is info");
  logger.verbose("This message is verbose");
  logger.debug("This message is debug");
  logger.silly("This message is silly");

  res.send("log test");
});

router.use("/board", boardRouter);
router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auths", authRouter);
router.use("/posts", postRouter);

module.exports = router;
